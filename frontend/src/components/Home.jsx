import useGetAllJobs from "../hooks/useGetAllJobs";
import CarouselList from "./layouts/CarouselList";
import Footer from "../components/shared/Footer";
import HeroSection from "./layouts/HeroSection";
import LatestJobs from "./layouts/LatestJobs";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CarouselList />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
