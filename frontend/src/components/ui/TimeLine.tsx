import {
  CheckCircle2,
  Bug,
  MessageSquare,
  GitPullRequest,
} from "lucide-react";

const activities = [
  {
    id: 1,
    icon: <CheckCircle2 size={18} />,
    title: "Completed TASK-102",
    time: "10 min ago",
  },
  {
    id: 2,
    icon: <Bug size={18} />,
    title: "Reported BUG-24",
    time: "1 hour ago",
  },
  {
    id: 3,
    icon: <MessageSquare size={18} />,
    title: "Commented on TASK-89",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: <GitPullRequest size={18} />,
    title: "Created PR #45",
    time: "2 days ago",
  },
];

const TimeLine = () => {
  return (
    <div className="relative mt-2 h-[22rem] w-80 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-4 text-white">

      <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-white/10" />

      <h2 className="relative mb-4 text-center text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="relative h-full space-y-3 overflow-y-auto rounded-xl bg-white/15 p-4 backdrop-blur">

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3"
          >
            <div className="rounded-full bg-white/20 p-2">
              {activity.icon}
            </div>

            <div>
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-blue-100">
                {activity.time}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TimeLine;