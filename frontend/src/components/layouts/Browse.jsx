import { useDispatch, useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import JobsCard from "./JobsCard";
import { useEffect } from "react";
import { setSearchedQuery } from "../../redux/jobSlice";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <Motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold mb-6"
        >
          Search Result :{" "}
          <span className="text-[#0ea5e9]">({allJobs.length})</span>
        </Motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {allJobs.length > 0 ? (
              allJobs.map((job, index) => (
                <Motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <JobsCard job={job} />
                </Motion.div>
              ))
            ) : (
              <Motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-gray-500 mt-10"
              >
                No jobs found at the moment.
              </Motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Browse;
