import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { LogIn, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during logout");
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* LEFT - LOGO */}
        <h1 className="text-3xl text-amber-500 font-semibold">
          Radi<span className="text-[#42edc5]">Antix</span>
        </h1>

        {/* RIGHT - LINKS + AVATAR */}
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 font-medium cursor-pointer">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  {" "}
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  {" "}
                  <Link to="/">Home</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="h-9 px-5 rounded-2xl border border-gray-300 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="h-9 px-5 rounded-2xl bg-teal-600 text-white hover:bg-teal-500 flex items-center gap-2 shadow-sm cursor-pointer">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcnUi"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center gap-3 border-b pb-3">
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="shadCnUi"
                    />
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{user?.fullName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || "Bio not available"}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {user && user.role === "student" && (
                    <Button variant="ghost" className="justify-start gap-2">
                      <User size={16} /> <Link to="/profile">View Profile</Link>
                    </Button>
                  )}

                  <Button
                    onClick={logoutHandler}
                    variant="ghost"
                    className="justify-start gap-2 text-red-500"
                  >
                    <LogOut size={16} /> LogOut Profile
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
