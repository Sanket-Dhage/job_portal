import { useSelector } from "react-redux";
import LatestJobsCards from "./LatestJobsCards";


const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Latest & Top{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
            Job Openings
          </span>
        </h1>

        <div className="w-24 h-1 bg-linear-to-r from-teal-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {allJobs?.length <= 0 ? (
          <span>No jobs available</span>
        ) : (
          allJobs
            ?.slice(0, 8)
            .map((job) => (
              <LatestJobsCards
                key={job._id}
                job={job}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
