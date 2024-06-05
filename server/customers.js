const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  getSingleReservationByCustomerId,
  getSingleCustomer,
} = require("./db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllCustomers());
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    res.send(await getSingleCustomer(req.params.id));
  } catch (err) {
    next(err);
  }
});
router.get("/:id/reservations", async (req, res, next) => {
  try {
    res.send(await getSingleReservationByCustomerId(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;