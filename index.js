// Import các module cần thiết từ thư viện
import bodyParser from "body-parser";  // Middleware giúp xử lý dữ liệu từ các yêu cầu HTTP
import express from "express";  // Framework web Node.js để xây dựng ứng dụng
import cors from "cors";  // Middleware giúp xử lý vấn đề CORS (Cross-Origin Resource Sharing)
// Import các routes liên quan
import userRoutes from "./routes/user.js";  // Import các routes liên quan đến người dùng từ file user.js
// Tạo một đối tượng Express
const app = express();
// Sử dụng middleware CORS để cho phép các yêu cầu từ các domain khác
app.use(cors());
// Sử dụng middleware bodyParser để xử lý dữ liệu JSON và các yêu cầu có thể mở rộng
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// Sử dụng các routes liên quan đến người dùng được định nghĩa trong userRoutes
app.use("/user", userRoutes);
// thử in lên một cái gì đó
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Lắng nghe trên cổng 5000 và in ra console khi máy chủ bắt đầu chạy
app.listen(5000, () => console.log("Máy chủ đang chạy"));