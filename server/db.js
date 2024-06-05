// data layer
const pg = require('pg');
const client = new pg.Client('postgres://localhost/acme_reservation_planner');

const getAllCustomers = async () => {
    const response = await client.query(`SELECT * FROM customer ORDER BY id ASC`);
    return response.rows;
};
const getAllReservations = async () => {
    const response = await client.query(
      `SELECT * FROM reservations ORDER BY id ASC`
    );
    return response.rows;
};
const getAllRestaurants = async () => {
    const response = await client.query(
      `SELECT * FROM restaurant ORDER BY id ASC`
    );
    return response.rows;
};
  
const addReservation = async (body) => {
    await client.query(
      `INSERT INTO reservations(date, party_count, restaurant_id, customer_id) VALUES(now(), $1, $2, $3)`,
      [body.party_count, body.restaurant_id, body.customer_id]
    );
    return {
      party_count: body.party_count,
      restaurant_id: body.restaurant_id,
      customer_id: body.customer_id,
    };
};
  
const deleteReservation = async (id) => {
    await client.query(`DELETE from reservations WHERE id = $1`, [Number(id)]);
    return {
      id: id,
    };
};
  
const getSingleCustomer = async (id) => {
    const response = await client.query(`SELECT * FROM customer WHERE id = $1`, [
      id,
    ]);
    return response.rows[0];
};
  
const getSingleReservationByCustomerId = async (params_id) => {
    const response = await client.query(`SELECT * FROM customer WHERE id = $1`, [
      params_id,
    ]);
    const { id, name } = response.rows[0];
    const res_response = await client.query(
      `SELECT * FROM reservations WHERE customer_id = $1`,
      [params_id]
    );
    return {
      id,
      name,
      reservation: res_response.rows,
    };
};
  
const getSingleReservationByRestaurantId = async (params_id) => {
    const response = await client.query(
      `SELECT * FROM restaurant WHERE id = $1`,
      [params_id]
    );
    const { id, name } = response.rows[0];
    const res_response = await client.query(
      `SELECT * FROM reservations WHERE restaurant_id = $1`,
      [params_id]
    );
    return {
      id,
      name,
      reservation: res_response.rows,
    };
};
  
module.exports = {
    getAllCustomers,
    getAllReservations,
    getAllRestaurants,
    addReservation,
    deleteReservation,
    getSingleCustomer,
    getSingleReservationByCustomerId,
    getSingleReservationByRestaurantId,
    client,
};