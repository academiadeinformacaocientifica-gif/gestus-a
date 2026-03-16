import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import * as supabaseModule from "@/integrations/supabase/client";

vi.mock("@/integrations/supabase/client");

const mockSupabase = vi.mocked(supabaseModule.supabase);

// Test component that uses useAuth hook
const TestComponent = () => {
  const { user, loading, session } = useAuth();
  return (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      {user && <div data-testid="user">{user.email}</div>}
      {!user && !loading && <div data-testid="no-user">No user</div>}
      {session && <div data-testid="session">Session active</div>}
    </div>
  );
};

describe("useAuth Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading state initially", () => {
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: {
        subscription: {
          unsubscribe: vi.fn(),
        },
      },
    } as any);

    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    } as any);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
