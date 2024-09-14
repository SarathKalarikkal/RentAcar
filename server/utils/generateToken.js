import jwt from "jsonwebtoken";

export const generateToken = (id, email, role) => {
    try {
        const token = jwt.sign(
            { id: id, email: email, role: role || "user" },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" } 
        );
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
}