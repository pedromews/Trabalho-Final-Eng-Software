const router = require("express").Router();

// Services router
const servicesRouter = require("./services");

router.use("/", servicesRouter);

// User router
const userRouter = require("./users");

router.use("/", userRouter);

module.exports = router;