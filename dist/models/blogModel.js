"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    blogName: { type: String, required: true },
    blogBody: { type: String, required: true },
    category: { type: String, required: true },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: Date, required: true },
}, { timestamps: true });
const BlogModel = (0, mongoose_1.model)("EnverXBlog", blogSchema);
exports.BlogModel = BlogModel;
