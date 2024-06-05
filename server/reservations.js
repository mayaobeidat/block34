const express = require("express");
const router = express.Router();

const {
  getAllReservations,
  addReservation,
  deleteReservation,
} = require("./db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllReservations());
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    res.send(await addReservation(req.body));
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    res.send(await deleteReservation(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;