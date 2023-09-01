import dayjs from "dayjs";
import {hi} from "./hi";

const hello = () => {
    console.log("hello world...", dayjs().valueOf());
    console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
};

hi();
hello();

console.log(process.env.Dev);
