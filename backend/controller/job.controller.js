import { Job } from "../models/job.model.js";


export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      position,
      jobType,
      experience,
      salary,
      companyId,
    } = req.body;
    const userId = req.id;

   
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !position ||
      !jobType ||
      !experience ||
      !salary ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      location,
      position,
      jobType,
      experienceLevel: experience,
      salary: Number(salary),
      companyId: companyId, 
      created_by: userId, 
    });
    return res.status(201).json({
      message: "New Job created successfully...",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "companyId",
        select: "name email location logo",
      })
      .populate({
        path: "created_by",
        select: "name email location",
      })
      .lean()
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found...",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      // select: "name location",
    });

    if (!job) {
      return res.status(404).json({
        message: "Jobs not found...",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};



export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId })
    .populate({
      path: "companyId",
      sort: ({ createdAt: -1 }),
    });

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found for...",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
