const router = require("express").Router();

const serviceController = require("../controllers/serviceController");
const userController = require("../controllers/userController");

router.route("/services").post((req, res) => serviceController.create(req, res))
                         .put((req, res) => userController.addService(req, res));

router.route("/services").get((req, res) => serviceController.getAll(req, res));

router.route("/services/:id").get((req, res) => serviceController.get(req, res));

router.route("/services/:id").delete((req, res) => serviceController.delete(req, res));

router.route("/services/:id").put((req, res) => serviceController.update(req, res));

module.exports = router;