import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // token from req.headers
    const { token } = req.headers;
    // if it is not available login is not authorised
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorised Login Again",
      });
    }
    // decode the token with jwt secret key
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // checking if it matching with original one
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorised Login Again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
