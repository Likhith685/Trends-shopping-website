import userModel from "../models/userModel.js";

// adding product to User's Cart
const addtoCart = async (req, res) => {
  try {
    // id,itemId and size from req.body
    const { itemId, size } = req.body;
    const userId = req.user.id;
    // console.log(userId)
    // console.log(itemId)
    // console.log(size)

    if (!userId) {
      console.log("user id required");
      return res.json({ success: false, message: "User ID is required" });
    }

    // fetching user data from usermodel
    const userData = await userModel.findById(userId);

    if (!userData) {
      console.log("user not found");
      return res.json({ success: false, message: "user not found" });
    }

    // fetching cartdata from userdata
    let cartData = userData.cartData || {};

    // logic for increasing the quantity of the item
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // finding the id of the user in usermodel and updating the cart data
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Function for Updating the cart
const updateCart = async (req, res) => {
  try {
    // id,itemId,size and quantity from req.body
    const { itemId, size, quantity } = req.body;
    const userId = req.user.id;

    // console.log(itemId)
    // console.log(size)
    // console.log(quantity)
    // console.log(userId)

    // finding the userdata from usermodel by findbyid method
    const userData = await userModel.findById(userId);
    // accessing cartdata from userdata
    let cartData = await userData.cartData;

    // updating the quantity for a given itemid and size
    cartData[itemId][size] = quantity;

    // updating the cartdata of the user
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "updated the cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// accessing information from user's cart
const getuserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addtoCart, updateCart, getuserCart };
