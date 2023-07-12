"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const router = express_1.default.Router();
router.post('/posts', blogController_1.createBlog);
router.get('/posts', blogController_1.getBlogs);
router.get('/posts/:id', blogController_1.getBlogById);
router.put('/posts/:id', blogController_1.updateBlog);
router.delete('/blogs/:id', blogController_1.deleteBlog);
exports.default = router;
