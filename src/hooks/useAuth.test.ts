import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import * as supabaseModule from "@/integrations/supabase/client";
import { ReactNode } from "react";

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

  it("should update user when authenticated", async () => {
    const mockSession = {
      user: {
        id: "test-user-id",
        email: "test@example.com",
      },
    };

    const unsubscribeMock = vi.fn();
    const onAuthStateChangeMock = vi.fn((callback) => {
      // Simulate auth state change
      setTimeout(() => {
        callback("INITIAL_SESSION", mockSession);
      }, 0);
      return {
        data: {
          subscription: {
            unsubscribe: unsubscribeMock,
          },
        },
      };
    });

    mockSupabase.auth.onAuthStateChange.mockImplementation(
      onAuthStateChangeMock as any
    );

    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    } as any);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("test@example.com");
    });
  });

  it("should provide signOut function", async () => {
    const signOutMock = vi.fn().mockResolvedValue({ error: null });
    const unsubscribeMock = vi.fn();

    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: {
        subscription: {
          unsubscribe: unsubscribeMock,
        },
      },
    } as any);

    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    } as any);

    mockSupabase.auth.signOut.mockImplementation(signOutMock);

    const SignOutTestComponent = () => {
      const { signOut } = useAuth();
      return (
        <button onClick={() => signOut()} data-testid="signout-btn">
          Sign Out
        </button>
      );
    };

    render(
      <AuthProvider>
        <SignOutTestComponent />
      </AuthProvider>
    );

    const signOutButton = screen.getByTestId("signout-btn");
    signOutButton.click();

    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalled();
    });
  });
});
