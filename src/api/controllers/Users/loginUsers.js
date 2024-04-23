import { request, response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cryptojs from 'crypto-js'
import env from "dotenv"
import { UsersModels } from "../../../models/Models";
env.config()

const salt = bcrypt.genSaltSync(10)

/**
 * @function loginUsers ini digunakan untuk melakukan login user
 * @async ini digunakan untuk menandakan bahwa fungsi ini bersifat asynchronous
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data user yang baru saja dibuat
 * @returns mengembalikan pesan error jika email tidak ditemukan
 * @returns mengembalikan pesan error jika password tidak sesuai
 * @returns mengembalikan pesan error jika terjadi kesalahan pada server
 * @function comparePassword ini digunakan untuk membandingkan password yang diinput dengan password yang ada di database
 * @function token ini digunakan untuk membuat token
 * @function sign ini digunakan untuk membuat token
 * @function verify ini digunakan untuk memverifikasi token
 * 
 * @author Mprooy
 */

export const loginUsers = async (req = request, res = response) =>{
    try {
        const {email, password} =  await req.body
        const usersCheck = await UsersModels.findFirst({
            where : {
                email : email
            }
        })

        if(!usersCheck) {
            return res.status(401).json({
                success : false,
                msg : "Email not found!"
            })
        }

        const comparePassword = await bcrypt.compareSync(password, usersCheck.password, salt)
        const token = await jwt.sign({
            app_name : process.env.API_SECRET,
            id : usersCheck.id,
            email : usersCheck.email
        },
        process.env.API_SECRET,
        {
            expiresIn : "1d"
        }
        )

        if(!comparePassword){
            return res.status(401).json({
                success : false,
                msg : "Incorrect password!"
            })
        }

        const hashToken = await cryptojs.AES.encrypt(token, process.env.API_SECRET).toString()

        res.status(200).json({
            success : true,
            token : hashToken
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}