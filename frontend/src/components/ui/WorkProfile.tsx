interface UserData {
  avatar: {
    url: string;
  };

  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  workEmail: string;
  team: string;
  officeLocation: string;
}

const user: UserData = {
  avatar: {
    url: "/test/BuriBuriZaemon.jpg",
  },

  firstName: "hades",
  lastName: "demo",
  jobTitle: "Jr. Software Engg",
  department: "Backend",
  workEmail: "Hades@compney.com",
  officeLocation: "Delhi, India",
  team: "To be alloted",
};

const WorkProfile = () => {
  return (
    <div className="relative w-80 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-6 text-white">

      {/* Background Circle */}
      <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-white/10"></div>

      <div className="relative flex flex-col items-center">

        <img
          src={user.avatar.url}
          alt="avatar"
          className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
        />

        <h1 className="mt-5 text-3xl font-bold">
          {`${user.firstName} ${user.lastName}`.toUpperCase()}
        </h1>

        <p className="text-lg text-blue-100">
          {user.jobTitle}
        </p>

        <div className="mt-6 grid w-full grid-cols-2 gap-3">

          <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
            <p className="text-xs uppercase text-blue-100">
              Department
            </p>

            <p className="font-semibold">
              {user.department}
            </p>
          </div>

          <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
            <p className="text-xs uppercase text-blue-100">
              Team
            </p>

            <p className="font-semibold">
              Platform
            </p>
          </div>

          <div className="col-span-2 rounded-xl bg-white/15 p-3 backdrop-blur">
            <p className="text-xs uppercase text-blue-100">
              Work Email
            </p>

            <p className="truncate font-semibold">
              {user.workEmail}
            </p>
          </div>

          <div className="col-span-2 rounded-xl bg-white/15 p-3 backdrop-blur">
            <p className="text-xs uppercase text-blue-100">
              Office
            </p>

            <p className="font-semibold">
              {user.officeLocation}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WorkProfile;
