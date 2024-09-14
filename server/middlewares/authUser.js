import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: "user not authenticated" });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!tokenVerified) {
            return res.status(400).json({ success: false, message: "user not authenticated" });
        }

        if (tokenVerified.role !== "user") {
            return res.status(403).json({ message: "user not authenticated not a user" });
        }

        req.user = tokenVerified;

        console.log(req.user)

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};