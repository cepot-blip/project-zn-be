import { request, response } from "express"
import { UsersModels } from "../../../models/Models";

export const getUsersById = async (req = request, res = response) => {
    try {
        const { id, } = await req.params
		const result = await UsersModels.findUnique({
            where : {
                id : parseInt(id),
            }
        })
		
		res.status(200).json({
			success: true,
			query: result,
		})
        
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}