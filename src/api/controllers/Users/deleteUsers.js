import { request, response } from "express";
import { UsersModels } from "../../../models/Models";

/**
 * @function deleteUsers ini digunakan untuk menghapus data user
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkId ini digunakan untuk mengecek apakah id yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja dihapus
 * @function result ini digunakan untuk menampung data yang telah dihapus
 * 
 * @author Mprooy
*/

export const deleteUsers = async(req = request, res = response) =>{
    try {
        const {id} = await req.params
        const checkUniqueId = await UsersModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        await UsersModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            query : "Successfully delete users!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}