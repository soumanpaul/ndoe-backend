import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  console.log("Token...",token)
  res.cookie("token", token, {
    origin: "https://localhost:3000",
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
};

export default generateToken;
