import { request, response } from "express";
import { UsersModels } from "../../../models/Models";

/**
 * @function updateUsers ini digunakan untuk update data user
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id yang diinput sudah ada atau belum
 * @function checkUniqueEmail ini digunakan untuk mengecek apakah email yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja diupdate
 * @function result ini digunakan untuk menampung data yang telah diupdate
 * 
 * @author Mprooy
*/

export const updateUsers = async(req = request, res = response) =>{
    try {
        const {id, email, username} = await req.body
        const checkUniqueId = await UsersModels.findFirst({
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

         await UsersModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                email : email,
                username : username
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update users!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}