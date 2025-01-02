import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// placing orders using cash on delivery
const placeorder = async (req, res) => {
  try {
    // console.log(req)
    // console.log(req.body)
    const { items, amount, address } = req.body;
    const userId = req.user.id;
    const orderData = {
      userId,
      items,
      amount,
      paymentmethod: "cod",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new orderModel(orderData);

    // save the order in database
    await newOrder.save();

    // clear the cart data after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// placing order using Stripe
const placeorderstripe = async (req, res) => {};

// placing order using razorpay
const placeorderrazorpay = async (req, res) => {};

// all orders data for admin panel
const allorders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user order data for frontend
const userorders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from admin panel
const updatestatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeorder,
  placeorderrazorpay,
  placeorderstripe,
  allorders,
  userorders,
  updatestatus,
};
