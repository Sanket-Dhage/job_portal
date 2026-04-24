import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const roleChangeHandler = (value) => {
    setInput({ ...input, role: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-[#121212] border-gray-800 text-white shadow-2xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-center tracking-tight">
                Welcome Back 👋
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    required
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="Enter your email"
                    className="bg-[#1a1a1a] border-gray-700 text-white h-12 focus:ring-[#088F8F]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    required
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="Enter your password"
                    className="bg-[#1a1a1a] border-gray-700 text-white h-12 focus:ring-[#088F8F]"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300">Login As :</Label>
                  <RadioGroup
                    value={input.role}
                    onValueChange={roleChangeHandler}
                    className="flex gap-4"
                  >
                    <div
                      className={`flex items-center space-x-2 border p-3 rounded-lg flex-1 cursor-pointer transition ${
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
                      className={`flex items-center space-x-2 border p-3 rounded-lg flex-1 cursor-pointer transition ${
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

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#088F8F] hover:bg-[#077b7b] text-white font-bold text-lg transition-all active:scale-95"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <p className="text-sm text-center text-gray-400">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="text-[#088F8F] font-bold ml-1 hover:underline"
                  >
                    Sign Up
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

export default Login;
