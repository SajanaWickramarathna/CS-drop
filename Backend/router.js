const express = require("express");
const router = express.Router();

const cutomerRoutes = require("./Routes/customerRoutes");
const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const supporterRoutes = require("./Routes/customerSupporterRoutes");

router.use("/users", userRoutes);
router.use("/customers", cutomerRoutes);
router.use("/admins", adminRoutes);
router.use("/supporters", supporterRoutes);

module.exports = router;
