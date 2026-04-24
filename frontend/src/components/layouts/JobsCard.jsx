import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let unit in intervals) {
    const value = Math.floor(seconds / intervals[unit]);
    if (value >= 1) {
      return value === 1 ? `1 ${unit} ago` : `${value} ${unit}s ago`;
    }
  }
  return "Just now";
};

const JobsCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 rounded-2xl bg-[#1b1b1b] border border-[#2a2a2a] hover:border-[#088F8F]/50 hover:shadow-[0_0_20px_rgba(8,143,143,0.1)] transition-all duration-300 cursor-pointer shadow-md group"
    >
      <div className="flex items-center justify-between text-gray-400 text-sm">
        <p className="font-medium text-gray-500">{timeAgo(job?.createdAt)}</p>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-[#2a2a2a] text-gray-300 hover:bg-[#088F8F] hover:text-white transition-all"
        >
          <Bookmark size={18} />
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="p-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] group-hover:border-[#088F8F] transition-colors">
          <Avatar className="h-12 w-12">
            <AvatarImage src={job?.companyId?.logo} />
          </Avatar>
        </div>

        <div>
          <h1 className="text-lg font-bold text-gray-100 group-hover:text-[#42edc5] transition-colors">
            {job?.companyId?.name || "Unknown Company"}
          </h1>
          <p className="text-gray-500 flex items-center gap-1 text-sm">
            <MapPin size={14} className="text-[#088F8F]" />{" "}
            {job?.location || "Remote"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-xl text-white tracking-tight">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-5">
        <Badge className="bg-[#088F8F]/10 text-[#088F8F] border border-[#088F8F]/20 rounded-lg px-2 py-1">
          {job?.position} Position
        </Badge>
        <Badge className="bg-[#7209b7]/10 text-[#7209b7] border border-[#7209b7]/20 rounded-lg px-2 py-1">
          {job?.jobType}
        </Badge>
        <Badge className="bg-[#42edc5]/10 text-[#42edc5] border border-[#42edc5]/20 rounded-lg px-2 py-1">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button
          className="flex-1 bg-[#088F8F] hover:bg-[#066d6d] text-white rounded-xl font-bold transition-all active:scale-95"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>

        <Button
          variant="outline"
          className="flex-1 border-[#2a2a2a] bg-transparent text-gray-300 hover:bg-white/5 rounded-xl transition-all"
        >
          Save
        </Button>
      </div>
    </motion.div>
  );
};

export default JobsCard;
