import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";

const refineData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
      "Pune",
      "Bhopal",
      "Indore",
      "Jaipur",
    ],
  },
  {
    filterType: "Job Type",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Scientist",
      "DevOps Engineer",
      "Product Manager",
    ],
  },
  {
    filterType: "Salary Range",
    array: ["0-5 LPA", "5-10 LPA", "10-15 LPA", "15-20 LPA", "20+ LPA"],
  },
  {
    filterType: "Experience Level",
    array: [
      "0-6 months",
      "1-2 years",
      "3-5 years",
      "5+ years",
      "8+ years",
      "10+ years",
    ],
  },
];

const RefineCards = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="font-bold text-lg px-5">Refine Your Search</h1>
      <hr className="my-4" />

      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-6"
      >
        {refineData.map((category, i) => (
          <div key={i}>
            <h2 className="font-semibold text-gray-700 mb-2">
              {category.filterType}
            </h2>

            {category.array.map((option, index) => (
              <div className="flex items-center gap-3 mb-2" key={index}>
                <RadioGroupItem id={option} value={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}

            <hr className="mt-4 border-gray-300" />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RefineCards;
