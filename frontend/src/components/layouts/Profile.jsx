import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ContactIcon, Mail, PenBox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AppliedJobDetails from "./AppliedJobDetails";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";

const skills = [
  "JavaScript",
  "React.js",
  "Node.js",
  "Next.Js",
  "MongoDB",
  "Express.js",
];

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto my-10 px-6">
        <div className="rounded-3xl bg-[#111111]/70 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border border-white/20 shadow-md">
                <AvatarImage
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Logo_audi.jpg/1280px-Logo_audi.jpg"
                  alt="profile"
                />
              </Avatar>

              <div>
                <h1 className="text-3xl font-bold">{user?.fullName}</h1>
                <p className="text-gray-400 text-sm mt-1">
                  {user?.profile?.bio || "Bio not available"}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="border-white/20 text-white flex items-center gap-2 hover:bg-white/10"
            >
              <PenBox size={18} />
              Edit Profile
            </Button>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-gray-300" />
              <span className="text-gray-300">{user?.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <ContactIcon size={18} className="text-gray-300" />
              <span className="text-gray-300">{user?.phoneNumber}</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>

            {skills.length > 0 ? (
              <div className="flex flex-wrap">
                {user?.profile?.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="mr-2 mb-2 px-4 py-2 bg-white/10 text-white border border-white/10"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No skills added yet.</p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Resume</h2>

            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-blue-500 hover:underline font-semibold"
              >
                {user?.profile?.resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <p className="text-gray-400">No resume uploaded yet.</p>
            )}
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-[#111111]/70 backdrop-blur-xl border border-white/10 p-8 shadow-xl">
          <h1 className="font-bold text-2xl mb-6">Applied Jobs</h1>
          <AppliedJobDetails />
        </div>

        <UpdateProfile open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
