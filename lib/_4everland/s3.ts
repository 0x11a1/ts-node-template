import {S3} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.EVERLAND_ENDPOINT;
const ak = process.env.EVERLAND_ACCESSKEY;
const sk = process.env.EVERLAND_SECRETKEY;

export const s3 = new S3({
    endpoint,
    credentials: {
        accessKeyId: ak || "",
        secretAccessKey: sk || "",
    },
    region: "us-west-2",
});
