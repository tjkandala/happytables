const express = require("express");
const router = express.Router();

// Require the controllers, not made yet!
const table_controller = require("../controllers/table.controller");

// a simple test url to check that all of our files are communicating correctly
router.get("/test", table_controller.test);

router.post("/create", table_controller.table_create);

router.get("/:tableid", table_controller.table_details);

module.exports = router;
