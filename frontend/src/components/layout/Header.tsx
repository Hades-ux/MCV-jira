import {
  PanelLeftClose,
  Users,
  Plus,
  Bell,
  CircleQuestionMark,
  Settings,
} from "lucide-react";
import { useCurrentUser } from "../../hook/auth/useCurrentUser";
import { useSidebar } from "../../context/SideBarContext";

type CurrentUser = {
  avatar?: {
    url?: string;
  };
  firstName: string;
  lastName: string;
};

const Header = () => {
  const user = useCurrentUser() as CurrentUser | null | undefined;
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex items-center justify-between p-2 border rounded-md mx-1 mt-1 bg-[#1C2128] border-b border-[#30363D]">
      {/* first block */}
      <div className="flex gap-3">
        <button type="button" className="btn btn-soft h-8" onClick={toggleSidebar}>
          <PanelLeftClose size={20} />
        </button>
        <button type="button" className="btn btn-soft h-8">
          <Users size={20} /> Teams{" "}
        </button>
      </div>

      {/* serch Block */}
      <div className="flex items-center gap-3">
        <input
          className="input input-bordered w-2xl focus:outline-none
          focus:border-gray-300 duration-300 shadow-none h-8 "
          type="search"
          placeholder="Search"
          autoComplete="on"
        />
        <button type="button" className="btn btn-primary shadow-none h-8">
          <Plus size={20} /> Create{" "}
        </button>
      </div>

      {/* 3rd block */}
      <div className=" flex gap-3">
        {/* Notification */}
        <button type="button">
          <Bell size={20} />
        </button>

        {/* Help */}
        <button type="button">
          <CircleQuestionMark size={20} />
        </button>
        {/* Settings */}
        <button type="button">
          <Settings size={20} />
        </button>

        {/* User Avatar or initiall */}
        <button type="button">
          {user?.avatar?.url ? (
            <img
              src={user?.avatar?.url}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border-2"
            />
          ) : (
            <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center bg-gray-200 text-gray-700 font-semibold">
              {`${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
                "?"}
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
