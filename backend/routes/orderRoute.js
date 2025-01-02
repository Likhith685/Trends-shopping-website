import express from "express"
import {placeorder,placeorderrazorpay,placeorderstripe,allorders,userorders,updatestatus} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter = express.Router()

// admin features
orderRouter.post('/list',adminAuth,allorders)
orderRouter.post('/status',adminAuth,updatestatus)

// payment features
orderRouter.post('/place',authUser,placeorder)
orderRouter.post('/stripe',authUser,placeorderstripe)
orderRouter.post('/razorpay',authUser,placeorderrazorpay)

// user Feature
orderRouter.post('/userorders',authUser,userorders)

export default orderRouter
