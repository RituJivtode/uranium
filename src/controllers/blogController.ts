import { Request, Response } from "express";
import { Types } from "mongoose";
import { BlogModel, IBlog } from "../models/blogModel";

const stringChecking = (data: any): boolean => {
  if (typeof data !== "string") {
    return false;
  } else if (typeof data === "string" && data.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};

const getBlogs = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    let blogName = req.query.blogName as string;
    let publishedAt = req.query.publishedAt as string;
    let category = req.query.category as string;
    let filter: any = {};

    if (blogName !== undefined) {
      if (!stringChecking(blogName))
        return res
          .status(400)
          .send({ status: false, msg: "Please enter the blog name in the right format...!" });
      filter.blogName = blogName;
    }

    if (publishedAt !== undefined) {
      if (!stringChecking(publishedAt))
        return res
          .status(400)
          .send({ status: false, msg: "Please enter the date in the right format...!" });
      filter.publishedAt = publishedAt;
    }

    if (category !== undefined) {
      if (!stringChecking(category))
        return res
          .status(400)
          .send({ status: false, msg: "Please enter the category in the right format...!" });
      filter.category = category;
    }

    filter.isDeleted = false;
    let filterData: IBlog[] = await BlogModel.find(filter);

    if (filterData.length === 0) {
      return res.status(404).send({ status: false, msg: "Documents not found.." });
    }
    res.status(200).send({ status: true, Data: filterData });
  } catch (err: any) {
    res.status(500).send({ status: false, msg: "Error", error: err.message });
  }
};

const getBlogById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    //reading blogId from path
    const _id = req.params.id;

    //id format validation
    if (_id) {
      if (Types.ObjectId.isValid(_id) === false) {
        return res.status(400).send({ status: false, message: "Invalid blogId" });
      }
    }

    //fetch blog with blogId
    const blog: IBlog | null = await BlogModel
      .findOne({
        $and: [{ _id }, { isDeleted: false }],
      })
      .lean(); //used to lean to unfreeze document received from mongoDB

    //no blog found
    if (!blog) {
      return res.status(404).send({ status: true, data: "blog not found" });
    }

    //fetch blog data of the above blog
    const blogData: IBlog[] = await BlogModel.find({
      $and: [{ _id }, { isDeleted: false }],
    });

    //respond blog with reviews
    res.status(200).send({ status: true, data: blogData });
  } catch (err: any) {
    res.status(500).send({
      status: false,
      Error: "Server not responding",
      msg: err.message,
    });
  }
};

const createBlog = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    let data: IBlog = req.body;

    let { blogName, blogBody, category } = data;

    if (!blogName) {
      return res.status(400).send({ status: false, msg: "blogName is required...!" });
    }
    if (!stringChecking(blogName)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter the blogName in the right format...!" });
    }

    if (!blogBody) {
      return res.status(400).send({ status: false, msg: "blogBody is required...!" });
    }
    if (!stringChecking(blogBody)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter the blogBody in the right format...!" });
    }

    if (!category) {
      return res.status(400).send({ status: false, msg: "Category is required...!" });
    }
    if (!stringChecking(category)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter the category in the right format...!" });
    }

    let publishedData: IBlog = await BlogModel.create(data);
    res.status(201).send({ status: true, data: publishedData });
  } catch (err: any) {
    res.status(500).send({ status: false, msg: "Error", error: err.message });
  }
};

const updateBlog = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    let data: IBlog = req.body;
    let blogId: string = req.params.id;

    const { blogName, blogBody, category } = data;

    if (blogName !== undefined) {
      if (!stringChecking(blogName))
        return res
          .status(400)
          .send({ status: false, msg: "Please enter the blogName in the right format...!" });
    }

    if (blogBody !== undefined) {
      if (!stringChecking(blogBody))
        return res
          .status(400)
          .send({ status: false, msg: "Please enter the Blog Body in the right format...!" });
    }

    if (category !== undefined) {
      if (!stringChecking(category))
        return res
          .status(400)
          .send({ status: false, msg: "Please enter the category in the right format...!" });
    }

    let blog: IBlog | null = await BlogModel.findOne({
      $and: [{ _id: blogId }, { isDeleted: false }],
    });

    if (!blog) {
      return res.status(404).send({ status: false, msg: "No such blog exists" });
    }

    let updatedblog: IBlog | null = await BlogModel.findByIdAndUpdate(
      blogId ,
      { $set: { blogName: blogName, blogBody: blogBody, category: category } },
      { new: true }
    );

    res.status(201).send({ status: true, msg: "done", data: updatedblog });
  } catch (err: any) {
    res.status(500).send({ status: false, msg: "Error", error: err.message });
  }
};

const deleteBlog = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    let blogId: string = req.params.id;
    let blog: IBlog | null = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(404).send({ status: false, msg: "No such blog exists" });
    }

    await BlogModel.deleteOne({ _id: blogId });
    res.status(200).send({ status: true, msg: "Document for given blog Id is deleted." });
  } catch (err: any) {
    res.status(500).send({ status: false, msg: "Error", error: err.message });
  }
};

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
