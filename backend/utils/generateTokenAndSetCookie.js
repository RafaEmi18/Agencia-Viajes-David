import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true si usas HTTPS
    sameSite: "lax", // o "none" si usas HTTPS y dominios distintos
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  });
};
