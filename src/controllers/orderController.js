// @ts-check
// 3)
const orderModel = require("../models/orderModel")

const createOrder = async function(req, res) {
        let order = req.body
        let headers = req.headers
        let appType = headers["isFreeAppUser"]
        if (!appType) {
            appType = headers["isfreeappuser"]
        }

        if (!appType) {
            return res.send({ status: false, msg: "Headere is mandatory." })
        }
        let orderCreated = await orderModel.create(order)
        res.send({ status: true, data: { orderCreated } })
    }
    //     let orderCreated = await orderModel.create(order)
    //     res.send(orderCreated)
    // }

module.exports.createOrder = createOrder