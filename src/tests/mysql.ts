import mysql from "mysql2/promise";

const config = {
    host: "192.168.123.11",
    user: "root",
    password: "mySa902eE7143d0b_49d11dF0e82Wb6dedsql",
    database: "bot_tx",
};

// const connection = mysql.createConnection(config);

const mysqlPromise = async () => {
    // create the connection
    const connection = await mysql.createConnection(config);
    const [rows] = await connection.execute(
        `select * from bite_jun where name = 'okxSwapTx' AND algo_cl_ord_id is not null AND state = 4 AND close_avg_px > 0 AND up_state = 1;`
    );
    console.log(rows);
    // query database
    connection.end();
    // connection.destroy();
};

mysqlPromise();

// connection.query(
//     `select * from bite_jun where name = 'okxSwapTx' AND algo_cl_ord_id is not null AND state = 4 AND close_avg_px > 0 AND up_state = 1;`,
//     function (err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         // console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

// with placeholder
// connection.query(`select * from bite_jun`, ["Page", 45], function (err, results) {
//     console.log(results);
// });
