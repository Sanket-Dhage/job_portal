import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constant";
import { setSingleJob } from "../../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please login to apply for this job!");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            user?._id &&
              res.data.job.applications.some(
                (application) =>
                  String(application.applicant) === String(user._id),
              ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto my-10 px-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Badge className="bg-[#1e1e1e] text-gray-300 px-3 py-1.5 border border-[#2a2a2a] rounded-md">
              {singleJob?.position} Position
            </Badge>

            <Badge className="bg-[#1e1e1e]  text-gray-300 px-3 py-1.5 border border-[#2a2a2a] rounded-md">
              {singleJob?.jobType}
            </Badge>

            <Badge className="bg-[#1e1e1e] text-gray-300 px-3 py-1.5 border border-[#2a2a2a] rounded-md">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`rounded-full transition-all active:scale-90 ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium text-2xl py-4">
        Job Description :-
      </h1>
      <div className="my-4">
        <h1 className="font-semibold my-1">
          Role :{" "}
          <span className="pl-1 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Location :{" "}
          <span className="pl-1 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Description :{" "}
          <span className="pl-1 font-normal text-gray-800">
            {singleJob?.description}.
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Experience :{" "}
          <span className="pl-1 font-normal text-gray-800">
            {singleJob?.experience} years +
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Salary :{" "}
          <span className="pl-1 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Total Applicants :{" "}
          <span className="pl-1 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Posted Date :{" "}
          <span className="pl-1 font-normal text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
    </motion.div>
  );
};

export default JobDescription;
