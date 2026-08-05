import TimeLine from "../components/ui/TimeLine";
import WorkProfile from "../components/ui/WorkProfile";

const ProfilePage = () => {
 
  return (
    <div className="m-1 border rounded-md bg-[#161B22] border-[#30363D] flex-1 p-2">
      <WorkProfile/>
      <TimeLine/>
     </div>
  );
};

export default ProfilePage;
