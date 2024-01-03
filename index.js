// Import các module cần thiết từ thư viện
import bodyParser from "body-parser";  // Middleware giúp xử lý dữ liệu từ các yêu cầu HTTP
import mongoose from "mongoose"; // 
import express from "express";  // Framework web Node.js để xây dựng ứng dụng
import cors from "cors";  // Middleware giúp xử lý vấn đề CORS (Cross-Origin Resource Sharing)
// Import các routes liên quan
import userRoutes from "./routes/user.js";  // Import các routes liên quan đến người dùng từ file user.js
import zingRoutes from "./routes/zingmp3.js"; // Import các routers liên quan đến api của zing mp3
// Tạo một đối tượng Express
const app = express();
// Sử dụng middleware CORS để cho phép các yêu cầu từ các domain khác
app.use(cors());
// Middleware để xử lý CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  // Thiết lập các header cho phép truy cập từ mọi nguồn (*)
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Thiết lập các phương thức HTTP được phép (GET, POST, PUT, PATCH, DELETE)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  // Thiết lập các header cho phép (Content-Type, Authorization)
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Chuyển tiếp request sang middleware tiếp theo
  next();
});
// Sử dụng middleware bodyParser để xử lý dữ liệu JSON và các yêu cầu có thể mở rộng
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// Sử dụng các routes liên quan đến người dùng được định nghĩa trong userRoutes
app.use("/user/", userRoutes);
// Sử dụng các routes liên quan đến zing mp3
app.use("/api/", zingRoutes);
// thử in lên một cái gì đó
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// kết nối đến mongoose
mongoose.connect(process.env.mongourl, {
  dbName: "BlackCat-React",
}).then(() => {
  console.log("Đã kết nối với cơ sở dữ liệu");
}).then(() => {
  // Lắng nghe trên cổng 5000 và in ra console khi máy chủ bắt đầu chạy
  app.listen(5000, () => console.log("Máy chủ đang chạy"));
}).catch((err) => {
  console.log("Không kết nối được với cơ sở dữ liệu", err);
});