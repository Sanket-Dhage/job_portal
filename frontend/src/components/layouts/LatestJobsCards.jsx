import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobsCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-xl bg-[#1b1b1b] border border-[#2a2a2a] hover:border-teal-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-md"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-200">
          {job?.companyId?.name || "Unknown Company"}
        </h2>

        <p className="text-sm text-gray-400">
          {job?.location || "India"} • Remote
        </p>
      </div>

      <div>
        <h1 className="text-xl font-bold text-white">{job?.title}</h1>

        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
          {job?.description?.slice(0, 100)}...
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        <Badge className="bg-[#2f2f2f] text-gray-300 px-3 py-1 border border-[#3a3a3a]">
          {job?.position} Position
        </Badge>

        <Badge className="bg-[#2f2f2f] text-gray-300 px-3 py-1 border border-[#3a3a3a]">
          {job?.jobType}
        </Badge>

        <Badge className="bg-[#2f2f2f] text-gray-300 px-3 py-1 border border-[#3a3a3a]">
          {job?.salary} LPA
        </Badge>
      </div>

      <button className="w-full mt-6 bg-teal-600/80 hover:bg-teal-600 text-white py-2.5 rounded-lg font-medium transition-all">
        Apply Now
      </button>
    </div>
  );
};

export default LatestJobsCards;
