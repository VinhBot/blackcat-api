import bodyParser from "body-parser";
import express from "express";
import colors from "chalk";

const app = express();
const port = 3000;

// phân tích các loại JSON tùy chỉnh khác nhau dưới dạng JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

import(`./lib/newfeeds.js`).then((e) => e.default(app));
import("./lib/recommendkeyword.js").then((e) => e.default(app));

app.get("/", (request, response) => {
  response.send("Home");
});

app.listen(port, () => {
  console.log(colors.blue("Api đang chạy trên cổng:"), port);
});