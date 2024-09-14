export const authDealerOrAdmin = (req, res, next) => {
    console.log("asdfasdsa",req.user)
    if (req.user === 'dealer' || req.user === 'admin') {
        next();
    } else {
        return res.status(403).json({ success: false, message: "Not authorized" });
    }
};