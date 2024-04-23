import { response, request } from "express";
import cryptoJs from 'crypto-js'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()

export const authCheck = async (req = request, res = response, next) => {
    try {
        const token = await req.headers['authorization']

        if(!token){
            return res.status(401).json({
                success : false,
                msg : "Login terlebih dahulu untuk mendapatkan token!"
            })
        }

        const decriptToken = await cryptoJs.AES.decrypt(token.split(" ")[1], process.env.API_SECRET).toString(cryptoJs.enc.Utf8)
        const verivy = await jwt.verify(decriptToken, process.env.API_SECRET)

        if(!verivy){
            return res.status(401).json({
                success : false,
                msg : "Login terlebih dahulu untuk mendapatkan token!"
            })
        }

        if(verivy.exp < Date.now() / 1000){
            return res.status(401).json({
                success : false,
                msg : "Token Expirited"
            })
        }

        next()


    } catch (error) {
        res.status(401).json({
            success : false,
            msg : "Login terlebih dahulu untuk medapatkan token!"
        })
    }
}