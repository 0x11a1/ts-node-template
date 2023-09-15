import http from "http";

http.createServer(handler).listen(8888);

function handler(req: any, res: any) {
    console.log("Hello World");
}
