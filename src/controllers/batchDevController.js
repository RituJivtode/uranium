const BatchModel = require("../models/batchModel")
const developerModel = require("../models/developerModel")

const createBatch = async function(req, res) {
    let batch = req.body
    let batchCreated = await BatchModel.create(batch)
    res.send({ data: batchCreated })
}

const createDeveloper = async function(req, res) {
    let developer = req.body
    let developerCreated = await developerModel.create(developer)
    res.send({ data: developerCreated })
}

const eligibleDevs = async function(req, res) {
    let scholarship = await developerModel.find({ percentage: { $gte: 70 }, gender: 'female' }).populate('batch');
    res.send({ data: scholarship })
}

const getDevs = async function(req, res) {
    let batch = req.query.program
    let batchId = await BatchModel.findOne({ name: batch }).select({ _id: 1 })
    let develop = req.query.percentage
    let devs = await developerModel.find({
        batch_id: batchId,
        percentage: { $eq: develop }
    })
    res.send({
        data: devs
    })
}

// module.exports.createBatch = createBatch
// module.exports.createDeveloper = createDeveloper

module.exports = { createBatch, createDeveloper, eligibleDevs, getDevs }