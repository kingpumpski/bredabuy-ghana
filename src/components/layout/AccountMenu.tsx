import {
  User,
  LogIn,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/features/auth/store/auth.store";

const AccountMenu = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  if (!user) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <Link to="/auth/login">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
        </Button>

        <Button
          size="sm"
          asChild
        >
          <Link to="/auth/register">
            <UserPlus className="mr-2 h-4 w-4" />
            Sign up
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
    >
      <Link to="/account">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            className="mr-2 h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <User className="mr-2 h-5 w-5" />
        )}

        <span className="hidden lg:inline">
          {user.firstName || "Account"}
        </span>
      </Link>
    </Button>
  );
};

export default AccountMenu;
