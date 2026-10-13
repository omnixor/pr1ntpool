import { Link, useNavigate } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { homeFor, roleOf, supabase } from "@/lib/supabase";

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await supabase?.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[1184px] items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-accent text-foreground">
            <Printer className="h-4 w-4" />
          </span>
          Pr1ntpool
        </Link>
        {user ? (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to={homeFor(roleOf(user))}>
                {roleOf(user) === "shop" ? "Shop" : "Dashboard"}
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="rounded-full" onClick={logout}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
