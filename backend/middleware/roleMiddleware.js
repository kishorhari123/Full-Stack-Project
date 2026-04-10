module.exports = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: "Authentication required" });
    }

    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ msg: "Access denied. Admin privileges required." });
    }

    next();
  };
};
