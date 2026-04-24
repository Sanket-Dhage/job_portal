import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) {
      toast.error("Please select a company");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {loading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
            <p className="text-white text-sm">Posting job...</p>
          </div>
        </div>
      )}

      <div className="flex justify-center px-4 my-10">
        <form
          onSubmit={submitHandler}
          className="
            w-full max-w-5xl 
            rounded-2xl 
            p-8 md:p-10 
            shadow-2xl
            bg-zinc-900
          "
        >
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white">
              Post a New Job
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Fill in the details to create a job listing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-300">Job Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Frontend Developer"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Job role description"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300">Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="React, Tailwind, API"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300">Salary (LPA)</Label>
              <Input
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="6 - 10"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300">Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Bangalore"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300">Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full-time / Remote"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300">Experience Level</Label>
              <Input
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="2+ Years"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300">No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300">Company</Label>
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col items-end mt-10 gap-2">
            <Button
              type="submit"
              disabled={loading || companies.length === 0}
              className="px-10 py-6 text-base rounded-xl flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Job"
              )}
            </Button>

            {companies.length === 0 && (
              <p className="text-xs text-red-500 font-medium">
                * Please register a company first, before posting any jobs
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default PostJobs;
