import { motion as Motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center w-full px-4">
      <div className="flex flex-col items-center gap-6 py-14">
        <Motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="px-5 py-2 rounded-full font-semibold text-teal-700 bg-teal-100 shadow-sm"
        >
          #1 Job Search <span className="text-amber-500 font-bold">Radi</span>
          <span className="text-teal-500 font-semibold">AntiX</span>
        </Motion.span>

        <Motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Find, Apply & <br />
          Achieve Your{" "}
          <span className="bg-linear-to-r from-[#42edc5] to-[#0ea5e9] text-transparent bg-clip-text">
            Dream Job
          </span>
        </Motion.h1>

        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 max-w-xl font-medium text-lg"
        >
          Discover thousands of verified job opportunities and take the next
          step in your career.
        </Motion.p>

        <Motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className=" flex items-center gap-3 bg-white shadow-xl p-4 rounded-full w-[95%] md:w-[60%] border"
        >
          <Input
            type="text"
            placeholder="Search job title, skill or company..."
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-full  border-none shadow-none focus-visible:ring-0 px-4 py-5 text-gray-700 placeholder:text-xl"
          />

          <Button
            onClick={searchJobHandler}
            className="rounded-full h-12 px-8 bg-teal-500 hover:bg-teal-600 text-white font-medium cursor-pointer"
          >
            Search
          </Button>
        </Motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
