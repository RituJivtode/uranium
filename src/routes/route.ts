import express from 'express';
import { Router } from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController';

const router: Router = express.Router();

router.post('/posts', createBlog);

router.get('/posts', getBlogs);

router.get('/posts/:id', getBlogById);

router.put('/posts/:id', updateBlog);

router.delete('/blogs/:id', deleteBlog);

export default router;
