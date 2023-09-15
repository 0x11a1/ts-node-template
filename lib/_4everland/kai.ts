import mysql from "mysql2/promise";
import {config} from "../mysql/config";
import {s3} from "./s3";
import {HeadObjectCommandOutput} from "@aws-sdk/client-s3";
import {IBucketTx} from "../../types/IBucketTx";
import {IMG_SRC} from "../../constants/ImgSrc";
import dayjs from "dayjs";
export const kai = async (bucketName: string) => {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute<mysql.RowDataPacket[]>(
        `select * from bite_jun where name = 'okxSwapTx' AND cl_ord_id is not null AND state = 1 AND close_avg_px > 0 AND up_state = 0;`
    );
    if (rows.length > 0) {
        const dd: any = rows[0];
        let notFound = false;
        let obj: HeadObjectCommandOutput;
        try {
            obj = await s3.headObject({Bucket: bucketName, Key: dd.cl_ord_id});
            if (obj && obj.Metadata && (obj.Metadata["ipfs-hash"] !== "" || obj.Metadata["arweave-hash"] !== "")) {
                await conn.execute(`update bite_jun set up_state = 4 where id = ${dd.id};`);
                conn.end().then();
                return;
            }
        } catch (e: any) {
            if (e.name === "NotFound" && e.$metadata.httpStatusCode === 404) {
                notFound = true;
            }
        }

        if (notFound) {
            const symbol = dd.inst_id.split("-")[0];
            let title = "开仓";
            let side = "";
            if (dd.pos_side === "long") {
                title += "🚀";
                side += "多🚀";
            } else if (dd.pos_side === "short") {
                title += "🪂";
                side += "空🪂";
            }

            const content =
                `币种:${symbol}\n` +
                `交易方向:${side}\n` +
                `开仓均价:💲${dd.avg_px}\n` +
                `止盈:${dd.tp_trigger_px}\n` +
                `止损:${dd.sl_trigger_px}\n` +
                `杠杆:X${dd.lever}\n` +
                `本单花费:🍥${Number(dd.cost).toFixed(1)}\n` +
                `开单前账户可用余额:💰${Number(dd.bal).toFixed(1)}\n` +
                "＿＿＿＿＿＿＿🦄️🦄️🦄＿＿＿＿＿＿＿\n" +
                "止盈止损会随后台策略实时修改❗\n" +
                "账户初始资金:💲1200\n" +
                "仅供学习参考，不构成投资建议❗\n" +
                "在区块链上记录每一笔交易🐸";

            const data: IBucketTx = {
                id: dd.cl_ord_id,
                pid: "",
                symbol: IMG_SRC[symbol.toLowerCase()][0],
                title: title,
                author: "0x666",
                avatar: IMG_SRC["avatar"][0],
                content: content,
                timestamp: dayjs(dd.pos_update_time).unix(),
                secretKey: "",
            };

            await s3.putObject({
                Bucket: bucketName,
                Key: dd.cl_ord_id,
                Body: JSON.stringify(data),
                ContentType: "application/json",
            });
        }
    }
    conn.end().then();
};
