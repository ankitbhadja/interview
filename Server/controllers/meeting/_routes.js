const express = require("express");
const meeting = require("./meeting");

const router = express.Router();

router.post("/add", meeting.add);
router.get("/", meeting.index);
router.get("/:id", meeting.view);
router.delete("/:id", meeting.deleteData);
router.post("/deleteMany", meeting.deleteMany);

module.exports = router;
