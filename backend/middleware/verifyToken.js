import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).json({ success: false, message: "No autorizado - no se encontró Token" });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) return res.status(401).json({ success: false, message: "No autorizado - Token invalido" });

		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error verificando el Token ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};