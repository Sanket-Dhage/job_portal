import { ArrowLeft, UploadCloud } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 mt-5 mb-20">
        <div className="bg-background border border-border rounded-2xl shadow-xl px-10 py-12">
          <div className="flex items-center gap-4 mb-10">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="ghost"
              className="px-2 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Company Setup
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Fill in your company details to continue
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  placeholder="Google Inc."
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  placeholder="https://company.com"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Bangalore, India"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="Short company description"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Company Logo</Label>

              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-xl border border-dashed border-muted-foreground/40 flex items-center justify-center overflow-hidden">
                  {input.file ? (
                    <img
                      src={URL.createObjectURL(input.file)}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UploadCloud className="text-muted-foreground" />
                  )}
                </div>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="max-w-sm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={isloading}
                className="px-10 py-6 text-base rounded-xl flex items-center gap-3"
              >
                {isloading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Saving...
                  </>
                ) : (
                  "Save Company"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;
