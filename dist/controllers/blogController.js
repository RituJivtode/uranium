"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogById = exports.getBlogs = void 0;
const mongoose_1 = require("mongoose");
const blogModel_1 = require("../models/blogModel");
const stringChecking = (data) => {
    if (typeof data !== "string") {
        return false;
    }
    else if (typeof data === "string" && data.trim().length === 0) {
        return false;
    }
    else {
        return true;
    }
};
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let blogName = req.query.blogName;
        let publishedAt = req.query.publishedAt;
        let category = req.query.category;
        let filter = {};
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
        let filterData = yield blogModel_1.BlogModel.find(filter);
        if (filterData.length === 0) {
            return res.status(404).send({ status: false, msg: "Documents not found.." });
        }
        res.status(200).send({ status: true, Data: filterData });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message });
    }
});
exports.getBlogs = getBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //reading blogId from path
        const _id = req.params.id;
        //id format validation
        if (_id) {
            if (mongoose_1.Types.ObjectId.isValid(_id) === false) {
                return res.status(400).send({ status: false, message: "Invalid blogId" });
            }
        }
        //fetch blog with blogId
        const blog = yield blogModel_1.BlogModel
            .findOne({
            $and: [{ _id }, { isDeleted: false }],
        })
            .lean(); //used to lean to unfreeze document received from mongoDB
        //no blog found
        if (!blog) {
            return res.status(404).send({ status: true, data: "blog not found" });
        }
        //fetch blog data of the above blog
        const blogData = yield blogModel_1.BlogModel.find({
            $and: [{ _id }, { isDeleted: false }],
        });
        //respond blog with reviews
        res.status(200).send({ status: true, data: blogData });
    }
    catch (err) {
        res.status(500).send({
            status: false,
            Error: "Server not responding",
            msg: err.message,
        });
    }
});
exports.getBlogById = getBlogById;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
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
        let publishedData = yield blogModel_1.BlogModel.create(data);
        res.status(201).send({ status: true, data: publishedData });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message });
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        let blogId = req.params.id;
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
        let blog = yield blogModel_1.BlogModel.findOne({
            $and: [{ _id: blogId }, { isDeleted: false }],
        });
        if (!blog) {
            return res.status(404).send({ status: false, msg: "No such blog exists" });
        }
        let updatedblog = yield blogModel_1.BlogModel.findByIdAndUpdate(blogId, { $set: { blogName: blogName, blogBody: blogBody, category: category } }, { new: true });
        res.status(201).send({ status: true, msg: "done", data: updatedblog });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let blogId = req.params.id;
        let blog = yield blogModel_1.BlogModel.findById(blogId);
        if (!blog) {
            return res.status(404).send({ status: false, msg: "No such blog exists" });
        }
        yield blogModel_1.BlogModel.deleteOne({ _id: blogId });
        res.status(200).send({ status: true, msg: "Document for given blog Id is deleted." });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message });
    }
});
exports.deleteBlog = deleteBlog;
