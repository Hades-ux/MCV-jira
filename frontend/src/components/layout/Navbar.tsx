import { CircleUser, Users, User, Heart, Target, Rocket } from "lucide-react";
import { useSidebar } from "../../context/SideBarContext";

const Navbar = () => {
  const { isOpen } = useSidebar();
  return (
    <aside
      className={`overflow-hidden flex flex-col gap-2
              transition-all duration-300 ease-in-out
              ${isOpen ? "w-0" : "w-45 border-r"}`}
    >
      <button className=" btn btn-ghost">
        <CircleUser size={20} /> For you
      </button>
      <button className="btn btn-ghost">
        <Users size={20} />
        Teams
      </button>
      <button className="btn btn-ghost">
        <User size={20} />
        People
      </button>
      <button className="btn btn-ghost">
        <Heart size={20} />
        kudos
      </button>
      <br />
      <button className="btn btn-ghost">
        <Target size={20} />
        Goals
      </button>
      <button className="btn btn-ghost">
        <Rocket size={20} />
        Projects
      </button>
    </aside>
  );
};

export default Navbar;
