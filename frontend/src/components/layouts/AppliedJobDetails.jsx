import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

const AppliedJobDetails = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const appliedJobs = allAppliedJobs || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "Rejected":
        return "bg-red-600 text-white";
      case "Accepted":
        return "bg-green-600 text-white";
      case "Pending":
        return "bg-yellow-500 text-black";
      case "Interviewing":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="p-6 rounded-2xl border">
      <Table>
        <TableCaption className="text-lg text-gray-300 font-semibold pb-2"></TableCaption>

        <TableHeader>
          <TableRow className="hover:bg-white/5">
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-gray-300">Job Role</TableHead>
            <TableHead className="text-gray-300">Company</TableHead>
            <TableHead className="text-right text-gray-300">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-400">
                You haven't applied any job yet...
              </TableCell>
            </TableRow>
          ) : (
            appliedJobs.map((appliedjob) => (
              <TableRow key={appliedjob._id}>
                <TableCell>{appliedjob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedjob?.job?.title}</TableCell>
                <TableCell>{appliedjob?.job?.companyId?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={getStatusColor(appliedjob.status)}>
                    {appliedjob.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobDetails;
