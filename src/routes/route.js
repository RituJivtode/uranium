const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const bookController = require("../controllers/bookController")
const newBookController = require("../controllers/newBookController")


router.get("/test-me", function(req, res) {
    res.send("My first ever api!")
})

router.post("/newAuthor", newBookController.newAuthor)
router.post("/newPublisher", newBookController.newPublisher)
router.post("/newBookDetails", newBookController.newBookDetails)
router.get("/fetchBookData", newBookController.fetchBookData)
router.put("/updateBook", newBookController.updateBook)
router.put("/updatePrice", newBookController.updatePrice)



// router.post("/createAuthor", authorController.createAuthor)

// router.get("/getAuthorsData", authorController.getAuthorsData)

// router.post("/createBook", bookController.createBook)

// router.get("/getBooksData", bookController.getBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
module.exports = router;