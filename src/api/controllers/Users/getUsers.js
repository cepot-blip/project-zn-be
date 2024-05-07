import { request, response } from "express";
import userService from "../../../lib/services/User";

/**
 * @function getUsers ini digunakan untuk menampilkan data user
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function page ini digunakan untuk menampung data page
 * @function limit ini digunakan untuk menampung data limit
 * @function skip ini digunakan untuk menampung data skip
 * @function filter ini digunakan untuk menampung data filter agar bisa melakukan pencarian data berdasarkan id, username dan email
 * @function result result ini digunakan untuk menampung data hasil dari query
 * @function conn ini digunakan untuk menampung data hasil dari query
 *
 * @author Mprooy
 */

export const getUsers = async (req = request, res = response) => {
  const { page = 1, limit = 10 } = await req.query;
  let skip = (page - 1) * limit;
  const { filter } = await req.body;
  const result = await userService.getUsers(skip, limit, filter);

  const conn = await userService.countTotalDataUser();

  res.status(200).json({
    success: true,
    current_page: parseInt(page),
    total_page: Math.ceil(conn / limit),
    total_data: conn,
    query: result,
  });
};
