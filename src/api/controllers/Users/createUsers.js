import { request, response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import env from 'dotenv'
import { UsersModels } from "../../../models/Models";

env.config()

const salt = bcrypt.genSaltSync(10)


/**
 * @function createUsers ini digunakan untuk membuat user baru
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueEmail ini digunakan untuk mengecek apakah email yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja dibuat
 * 
 * @author Mprooy
 */


export const createUsers = async (req = request, res = response) => {
    try {
        const {
            username,
            email,
            password,
        } = await req.body; 

        // VALIDASI EMAIL
        const checkUniqueEmail = UsersModels.findUnique({
            where : {
                email : email
            }
        });

        if (!checkUniqueEmail) {
            return res.status(401).json({
                status: false,
                message: "Email already exists!"
            });
        }

        const createUsers = await UsersModels.create({
            data: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                username : username
            }
        });

        const token = jwt.sign(
            {
                app_name: process.env.APP_NAME,
                id: createUsers.id,
                email: createUsers.email,
                username : username
            },
            process.env.API_SECRET
        );

        res.status(201).json({
            success: true,
            msg: "Successfully created users!",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};