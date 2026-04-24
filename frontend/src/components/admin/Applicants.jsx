import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicationTable from "./ApplicationTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
        <h1 className="font-bold text-xl my-5">
          Applications ({applicants?.applications?.length})
        </h1>
        <ApplicationTable />
      </div>
    </div>
  );
};

export default Applicants;
