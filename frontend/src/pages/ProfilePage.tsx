import { useCurrentUser } from "../hook/auth/useCurrentUser";
import { CircleUser, Users, User, Heart, Target, Rocket } from "lucide-react";

interface CurrentUser {
  firstName?: string;
}

const ProfilePage = () => {
  const user = useCurrentUser() as CurrentUser | null | undefined;

  return (
    <div className="min-h-screen bg-base-100 grid grid-rows-[50px_1fr]">
      <header className="border-b bg-amber-300">
        <h1>Search Bar</h1>
      </header>

      <main className=" grid grid-cols-[250px_1fr] bg-blue-600">
        {/* NavBar */}
        <nav className="navbar border-r flex flex-col gap-2">
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
        </nav>

        {/* area */}
        <section className="bg-accent">
          <h1 className="">
            {" "}
            {user?.firstName?.toUpperCase() || "First name"}
          </h1>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
