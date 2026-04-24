import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const shortListing = ["Accepted", "Rejected"];

const ApplicationTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {   
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <Table className="w-full min-w-[900px]">
        <TableCaption>A list of your recent applied users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>

            <TableHead className="text-right px-6">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullName || "NA"}</TableCell>
                <TableCell>{item?.applicant?.email || "NA"}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "NA"}</TableCell>

                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>

                <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>

                <TableCell className="text-right px-6">
                  <div className="flex justify-end">
                    <Popover>
                      <PopoverTrigger
                        asChild
                        className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
                      >
                        <MoreHorizontal size={20} />
                      </PopoverTrigger>

                      <PopoverContent className="w-32 p-2 shadow-md">
                        {shortListing.map((status) => (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={status}
                            className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded text-sm font-medium"
                          >
                            {status}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-gray-400"
              >
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
