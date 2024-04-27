import { request, response } from "express"
import { UsersModels } from "../../../models/Models";

export const getUsersById = async (req = request, res = response) => {
    try {
        const { id, } = await req.params
		const result = await UsersModels.findUnique({
            where : {
                id : parseInt(id),
            },
            include : {
				story : {
					select : {
						id : true,
						title : true,
						content : true,
						postedAt : true,
						category_id : true,
					}
				},
				comment : {
					select : {
						id : true,
						story_id : true,
						content : true,
						commentAt : true
					}
				}
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