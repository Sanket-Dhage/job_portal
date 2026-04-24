import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, Eye, MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.companyId?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#0a0a0a] mt-5">
      <Table>
        <TableCaption className="pb-4 text-gray-500">
          A list of your recent posted Jobs...
        </TableCaption>
        <TableHeader className="bg-white/5">
          <TableRow className="border-gray-800 hover:bg-transparent">
            <TableHead className="text-gray-300 pl-6">Logo</TableHead>
            <TableHead className="text-gray-300">Company Name</TableHead>
            <TableHead className="text-gray-300">Role</TableHead>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-right text-gray-300 pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence mode="popLayout">
            {filterJobs.length === 0 ? (
              <TableRow className="border-gray-800">
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-400 py-10"
                >
                  No jobs found.
                </TableCell>
              </TableRow>
            ) : (
              filterJobs.map((job, index) => (
                <motion.tr
                  key={job._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-b border-gray-800 hover:bg-white/5 transition-colors group cursor-default"
                >
                  <TableCell className="pl-6 py-4">
                    <Avatar className="h-10 w-10 border border-gray-800 shadow-sm transition-transform group-hover:scale-105">
                      <AvatarImage src={job?.companyId?.logo} />
                    </Avatar>
                  </TableCell>

                  <TableCell className="font-semibold text-gray-200">
                    {job?.companyId?.name || "N/A"}
                  </TableCell>

                  <TableCell className="text-gray-400 font-medium ">
                    {job?.title}
                  </TableCell>

                  <TableCell className="text-gray-400">
                    {job?.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="inline-flex items-center justify-center ml-auto h-9 w-9 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
                          <MoreHorizontalIcon className="text-gray-400 hover:text-white" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 bg-[#121212] border-gray-800 text-white p-2 shadow-2xl">
                        <div className="flex flex-col gap-1">
                          <div
                            onClick={() =>
                              navigate(
                                `/admin/companies/${job?.companyId?._id}`
                              )
                            }
                            className="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded-md transition-all text-sm group/item"
                          >
                            <Edit2 className="w-4 text-amber-500 group-hover/item:scale-110 transition-transform" />
                            <span>Edit Company</span>
                          </div>
                          <div
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}/applicants`)
                            }
                            className="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded-md transition-all text-sm group/item"
                          >
                            <Eye className="w-4 text-[#42edc5] group-hover/item:scale-110 transition-transform" />
                            <span>Applicants</span>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
