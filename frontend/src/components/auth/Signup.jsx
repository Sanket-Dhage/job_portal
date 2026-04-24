import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    profile: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    const { name, value, files } = e.target;
    setInput({
      ...input,
      [name]: files ? files[0] : value,
    });
  };

  const roleChangeHandler = (value) => {
    setInput({ ...input, role: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.profile) {
      toast.error("Please upload a profile picture!");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("file", input.profile);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[90vh] px-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-[#121212] border-gray-800 text-white shadow-2xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-center tracking-tight">
                Create Account 🚀
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={submitHandler} className="space-y-5">
                <div className="space-y-1">
                  <Label className="text-gray-300">Full Name</Label>
                  <Input
                    type="text"
                    name="fullName"
                    required
                    value={input.fullName}
                    onChange={changeEventHandler}
                    placeholder="Enter your full name"
                    className="bg-[#1a1a1a] border-gray-700 h-11 focus:ring-[#088F8F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-gray-300">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      required
                      value={input.email}
                      onChange={changeEventHandler}
                      placeholder="Enter your email"
                      className="bg-[#1a1a1a] border-gray-700 h-11"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-gray-300">Phone Number</Label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={input.phoneNumber}
                      onChange={changeEventHandler}
                      placeholder="Enter your phone number"
                      className="bg-[#1a1a1a] border-gray-700 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-300">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    required
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="Enter your password"
                    className="bg-[#1a1a1a] border-gray-700 h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Registering As :</Label>
                  <RadioGroup
                    value={input.role}
                    onValueChange={roleChangeHandler}
                    className="flex gap-4"
                  >
                    <div
                      className={`flex items-center space-x-2 border p-2 rounded-lg flex-1 cursor-pointer transition ${
                        input.role === "student"
                          ? "border-[#088F8F] bg-[#088F8F]/10"
                          : "border-gray-700"
                      }`}
                    >
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student" className="cursor-pointer">
                        Student
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 border p-2 rounded-lg flex-1 cursor-pointer transition ${
                        input.role === "recruiter"
                          ? "border-[#088F8F] bg-[#088F8F]/10"
                          : "border-gray-700"
                      }`}
                    >
                      <RadioGroupItem value="recruiter" id="recruiter" />
                      <Label htmlFor="recruiter" className="cursor-pointer">
                        Recruiter
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-300">Upload Profile Image</Label>
                  <Input
                    type="file"
                    name="profile"
                    required
                    accept="image/*"
                    onChange={changeEventHandler}
                    className="bg-[#1a1a1a] border-gray-700 cursor-pointer h-11 pt-2"
                  />
                </div>

                <Button
                  className="w-full h-11 bg-[#088F8F] hover:bg-[#077b7b] text-white font-bold transition-all active:scale-95 mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <p className="text-sm text-center text-gray-400">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-[#088F8F] font-bold ml-1 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
