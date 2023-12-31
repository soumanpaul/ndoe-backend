import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.token;
  console.log("Token...12",token)
  console.log("Token...12",token)
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Verify...",decoded)

      req.user = await User.findById(decoded.userId).select('-password');
      console.log("Verify...",decoded, req.user)

      next();
    } catch (error) {
      console.error(error);
      // res.status(401);
      res.status(401).json({
        message: "Not authorized user",
        status: 401
      })
      // throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401).json({
      message: "Not authorized user",
      status: 401
    })
  }
});

export { protect };
