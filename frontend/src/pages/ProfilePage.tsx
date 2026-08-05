interface userData {
  coverImage: {
    url: string;
  };

  avatar: {
    url: string;
  };

  firstName: string;
  lastname: string
}

const ProfilePage = () => {
  const user: userData = {
    coverImage: {
      url: "/test/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg",
    },

    avatar: {
      url: "/test/BuriBuriZaemon.jpg",
    },

    firstName: "hades",
    lastname: "demo"
  };

  return (
    <div className=" relative m-1 border rounded-md bg-[#161B22] border-[#30363D] flex-1">
      {/* cover Image */}
      <div className="">
        {user?.coverImage?.url ? (
          <img
            src={user.coverImage.url}
            alt="coverImage"
            className=" w-full h-72 rounded-t-md object-cover"
          />
        ) : (
          <div className="w-full h-52 border rounded-md border-gray-600 flex items-center justify-center">
            {"Add cover image"}
          </div>
        )}
      </div>

      {/* user Image */}
      <div className="absolute left-8 top-56">
        {user?.avatar?.url ? (
          <img
            src={user.avatar.url}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-[#161B22] object-cover"
          />
        ) : (
          <div
            className="w-32 h-32 rounded-full border-4 border-[#161B22] bg-white flex items-center justify-center"
          >
            {" Add user Image"}
          </div>
        )}
      </div>
      {/* User information */}
      <div className="pt-20 px-8 bg-amber-400">
        <h1>{`${user?.firstName} ${user?.lastname}`.toUpperCase()}</h1>

      </div>
    </div>
  );
};

export default ProfilePage;
