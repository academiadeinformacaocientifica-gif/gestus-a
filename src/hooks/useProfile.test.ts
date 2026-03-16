import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import * as supabaseModule from "@/integrations/supabase/client";
import { ReactNode } from "react";

vi.mock("@/integrations/supabase/client");
vi.mock("@/hooks/useAuth");

const mockSupabase = vi.mocked(supabaseModule.supabase);
const mockUseAuth = vi.mocked(useAuth);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("useProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null when user is not authenticated", () => {
    mockUseAuth.mockReturnValue({
      session: null,
      user: null,
      loading: false,
      signOut: vi.fn(),
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
  });

  it("should fetch profile data when user is authenticated", async () => {
    const mockUser = { id: "test-user-id", email: "test@example.com" };
    const mockProfile = {
      user_id: "test-user-id",
      nome: "Test User",
      nome_negocio: "Test Business",
    };

    mockUseAuth.mockReturnValue({
      session: {} as any,
      user: mockUser as any,
      loading: false,
      signOut: vi.fn(),
    });

    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi
            .fn()
            .mockResolvedValue({ data: mockProfile, error: null }),
        }),
      }),
    } as any);

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockProfile);
    });
  });

  it("should handle errors gracefully", async () => {
    const mockUser = { id: "test-user-id", email: "test@example.com" };
    const mockError = new Error("Database error");

    mockUseAuth.mockReturnValue({
      session: {} as any,
      user: mockUser as any,
      loading: false,
      signOut: vi.fn(),
    });

    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi
            .fn()
            .mockRejectedValue(mockError),
        }),
      }),
    } as any);

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
