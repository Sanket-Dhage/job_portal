
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { motion as Motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "MS Excel Specialist",
  "Graphics Designer",
  "Python Developer",
  "UX / UI Designer",
  "Mobile App Developer",
  "Cyber Security Analyst",
  "Spring Boot Web Developer",
];

const CarouselList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  return (
    <div className="w-full ">
      <h2 className="text-center text-3xl font-bold mb-6 tracking-tight ">
        Popular Job Categories
      </h2>

      <Carousel className="w-full max-w-4xl mx-auto relative">
        <CarouselContent className="py-2">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
            >
              <Motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex justify-center"
              >
                <Button
                onClick ={() => searchJobHandler(cat)}
                  variant="outline"
                  className="
                    w-full 
                    text-sm 
                    md:text-base 
                    py-4 
                    rounded-xl 
                    shadow 
                    bg-white
                    hover:bg-teal-500 
                    hover:text-white 
                    border-gray-300 
                    transition-all 
                    whitespace-nowrap
                    overflow-hidden
                    text-ellipsis
                  "
                >
                  {cat}
                </Button>
              </Motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 md:-left-8 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white" />
        <CarouselNext className="right-2 md:-right-8 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white" />
      </Carousel>
    </div>
  );
};

export default CarouselList;
