import {s3} from "./s3";

export const listBuckets = async () => {
    const buckets = await s3.listBuckets({});
    console.log(buckets);
};
