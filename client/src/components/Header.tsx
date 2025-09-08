import { Link } from "react-router-dom";
import { ShoppingBag, Heart, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "../components/UserMenu";

interface HeaderProps {
  onCartClick: () => void;
}

const Header = ({ onCartClick }: HeaderProps) => {
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">
              Essentials
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/shirts"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Shirts
            </Link>
            <Link
              to="/pants"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pants
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-1.5 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
