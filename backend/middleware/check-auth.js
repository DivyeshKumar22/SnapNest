import HttpError from "../models/http-error.js";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token,process.env.JWT_KEY); 
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
