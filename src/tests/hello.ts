import dayjs from "dayjs";
import {hi} from "./hi";
import dotenv from "dotenv";

dotenv.config();

const hello = () => {
    console.log("hello world...", dayjs().valueOf());
    console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
};

hi();
hello();

console.log(process.env.TEST);
