import { Schema, Document, model } from "mongoose";

interface IBlog extends Document {
  blogName: string;
  blogBody: string;
  category: string;
  deletedAt?: Date;
  isDeleted: boolean;
  publishedAt: Date;
}

const blogSchema = new Schema<IBlog>({
  blogName: { type: String, required: true },
  blogBody: { type: String, required: true },
  category: { type: String, required: true },
  deletedAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
  publishedAt: { type: Date, required: true },
}, { timestamps: true });

const BlogModel = model<IBlog>("EnverXBlog", blogSchema);

export { BlogModel, IBlog };
