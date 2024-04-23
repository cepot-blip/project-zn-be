import { request, response } from "express"
import { UsersModels } from "../../../models/Models";

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
    try {
        const { page = 1, limit = 10 } = await req.query
		let skip = (page - 1) * limit
		const { filter } = await req.body
		const result = await UsersModels.findMany({
            skip: parseInt(skip),
			take: parseInt(limit),
			orderBy: { id: "desc" },
			where: filter,
        })
		
        const conn = await UsersModels.count()

		res.status(200).json({
			success: true,
			current_page: parseInt(page),
			total_page: Math.ceil(conn / limit),
			total_data: conn,
			query: result,
		})
        
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}