const express = require('express');
const router = express.Router();

const AuthorController= require("../controllers/authorController")
const BlogController= require("../controllers/blogController")



router.post("/authors", AuthorController.createAuthor)

// router.get("/bookList", BookController.bookList)

router.post("/blogs", BlogController.createBlog)

router.get("/blogs", BlogController.getAllBlogs)

router.put("/blogs/:blogId", BlogController.updateBlog)

router.delete("/blogs/:blogId", BlogController.deleted)

router.delete("/blogs", BlogController.Qdeleted)



// router.post("/getParticularBooks", BookController.getParticularBooks)

// router.get("/getXINRBooks", BookController.getXINRBooks)

// router.get("/getRandomBooks", BookController.getRandomBooks)
module.exports = router;