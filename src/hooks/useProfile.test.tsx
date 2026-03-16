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

describe("useProfile Hook", () => {
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
});
