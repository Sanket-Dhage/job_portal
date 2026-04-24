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
import { Edit2, MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CompaniesTable = () => {
  const { companies = [], searchCompanyByText } = useSelector(
    (store) => store.company,
  );

  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#0a0a0a] mt-5">
      <Table>
        <TableCaption className="pb-4 text-gray-500">
          A list of your recent registered companies...
        </TableCaption>
        <TableHeader className="bg-white/5">
          <TableRow className="border-gray-800 hover:bg-transparent">
            <TableHead className="text-gray-300 pl-6">Logo</TableHead>
            <TableHead className="text-gray-300">Company Name</TableHead>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-right text-gray-300 pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filterCompany.length === 0 ? (
              <TableRow className="border-gray-800">
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-400 py-10"
                >
                  You haven't registered any company yet...
                </TableCell>
              </TableRow>
            ) : (
              filterCompany.map((company, index) => (
                <motion.tr
                  key={company._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-800 hover:bg-white/5 transition-colors group"
                >
                  <TableCell className="pl-6 py-4">
                    <Avatar className="h-10 w-10 border border-gray-800 shadow-sm transition-transform group-hover:scale-105">
                      <AvatarImage src={company.logo} />
                    </Avatar>
                  </TableCell>

                  <TableCell className="font-semibold text-gray-200">
                    {company.name}
                  </TableCell>

                  <TableCell className="text-gray-400 font-medium">
                    {company.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="inline-flex items-center justify-center ml-auto h-9 w-9 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
                          <MoreHorizontalIcon className="text-gray-400 hover:text-white" />
                        </div>
                      </PopoverTrigger>

                      <PopoverContent className="w-32 bg-[#121212] border-gray-800 text-white p-2">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded-md transition-all text-sm"
                        >
                          <Edit2 className="w-4 text-amber-500" />
                          <span>Edit</span>
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

export default CompaniesTable;
