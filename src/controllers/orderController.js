// @ts-check
// 3)
const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")


const createOrder = async function(req, res) {
        let order = req.body
        let userId = order.userId

        let user = await userModel.findById(userId)
        if (!user) {
            return res.send({ status: false, message: "user doesnt exist" })
        }

        let productId = order.productId
        let product = await productModel.findById(productId)
        if (!product) {
            return res.send({ status: false, message: "product doesnt exist" })
        }

        //Scenario 1 : Paid app and user balance is greater than or equal to product price
        if (!req.appTypeFree && user.balance >= product.price) {
            user.balance = user.balance - product.price
            await user.save()

            order.amount = product.price
            order.isFreeAppUser = false
            let orderCreated = await orderModel.create(order)
            return res.send({ status: true, data: orderCreated })
        } else if (!req.appTypeFree) {
            //Scenario 2 : Paid app and user balance is less than product price
            return res.send({ status: false, message: "User deosnt have sufficient balance" })
        } else {
            //Scenario 3 : Free app
            order.amount = 0
            order.isFreeAppUser = true
            let orderCreated = await orderModel.create(order)
            res.send({ status: true, data: orderCreated })
        }
    }
    //     let orderCreated = await orderModel.create(order)
    //     res.send(orderCreated)
    // }

module.exports.createOrder = createOrder