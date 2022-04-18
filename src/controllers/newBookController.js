const res = require("express/lib/response")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
    // const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

// Route Handler
// 1
const newAuthor = async function(req, res) {
    let newAuth = req.body
    let newAuthorCreated = await authorModel.create(newAuth)
    res.send({ data: newAuthorCreated })
}

// 2
const newPublisher = async function(req, res) {
    let newPub = req.body
    let newPublisherCreated = await publisherModel.create(newPub)
    res.send({ data: newPublisherCreated })
}

// 3
const newBookDetails = async function(req, res) {
    let Book = req.body;
    let checkAuthorId = Book.newAuthor;
    let checkPublisherId = Book.newPublisher;

    // a
    if (!checkAuthorId) {
        return res.send({ error: "Author id is not present" })
    }
    // b
    let authorDetails = await authorModel.findById(checkAuthorId)
    if (!authorDetails) {
        return res.send({ error: "Author id is not valid" })
    }
    // c
    if (!checkPublisherId) {
        return res.send({ error: "Publisher id is not present" })
    }
    // d)
    let publisherDetails = await publisherModel.findById(checkPublisherId)
    if (!publisherDetails) {
        return res.send({ error: "Publisher id is not valid" })
    }
    let BookDetails = await bookModel.create(Book)
    res.send({ data: BookDetails })
}

// 4
const fetchBookData = async function(req, res) {
    let getBooks = await bookModel.find().populate(["author", "publisher"])
    res.send({ data: getBooks })
}

// 5(a)
const updateBook = async function(req, res) {
        // update hardcover to true for few books
        let hardCOverPublishers = await publisherModel.find({ name: { $in: ['Penguin', 'HarperCollins'] } }).select({ _id: 1 })
        let arrayOfPublishers = []

        for (let i = 0; i < hardCOverPublishers.length; i++) {
            let objId = hardCOverPublishers[i]._id
            arrayOfPublishers.push(objId)
        }

        let books = await bookModel.updateMany({ publisher: { $in: arrayOfPublishers } }, { isHardCover: true })

        res.send({ data: books })
    }
    // const updateBook = async function(req, res) {
    //     const getPub = await publisherModel.find({ name: { $in: ['Penguin', 'HarperCollins'] } }).select({ _id: 1 })
    //         // console.log(getPub)
    //     for (let i = 0; i < getPub.length; i++) {
    //         await bookModel.updateMany({ publisher: getPub[i]._id }, { isHardCover: true })
    //     }
    //     res.send({ data: getPub })
    // }

// 5(b)
const updatePrice = async function(req, res) {
    const getPrice = await authorModel.updateMany({ rating: { $gt: 3.5 } }, { $inc: { price: 10 } })
    res.send({ data: getPrice })
}

module.exports.newAuthor = newAuthor
module.exports.newPublisher = newPublisher
module.exports.newBookDetails = newBookDetails
module.exports.fetchBookData = fetchBookData
module.exports.updateBook = updateBook
module.exports.updatePrice = updatePrice