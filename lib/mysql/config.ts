import dotenv from "dotenv";
dotenv.config();

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

export const config = {
    host,
    user,
    password,
    database,
};
