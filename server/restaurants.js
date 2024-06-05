const express = require("express");
const router = express.Router();

const {
  getAllRestaurants,
  getSingleReservationByRestaurantId,
} = require("./db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllRestaurants());
  } catch (err) {
    next(err);
  }
});
router.get("/:id/reservations", async (req, res, next) => {
  try {
    res.send(await getSingleReservationByRestaurantId(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;