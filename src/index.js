// Import các module cần thiết từ thư viện
import bodyParser from "body-parser";  // Middleware giúp xử lý dữ liệu từ các yêu cầu HTTP
import mongoose from "mongoose"; // 
import express from "express";  // Framework web Node.js để xây dựng ứng dụng
import cors from "cors";  // Middleware giúp xử lý vấn đề CORS (Cross-Origin Resource Sharing)
import path from "path";
import url from "url";
// Import các routes liên quan
import userRoutes from "./routes/user.js";  // Import các routes liên quan đến người dùng từ file user.js
import zingRoutes from "./routes/zingmp3.js"; // Import các routers liên quan đến api của zing mp3
// Lấy thư mục chứa file hiện tại từ đường dẫn tuyệt đối
const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express(); // Tạo một đối tượng Express
app.use(cors(/*{ // Sử dụng middleware CORS để cho phép các yêu cầu từ các domain khác
  origin: 'http://example.com', // 
  optionsSuccessStatus: 200 // một số trình duyệt cũ (IE11, nhiều SmartTV khác nhau) bị nghẽn trên 204
}*/));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Thiết lập các header cho phép truy cập từ mọi nguồn (*)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); // Thiết lập các phương thức HTTP được phép (GET, POST, PUT, PATCH, DELETE)
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Thiết lập các header cho phép (Content-Type, Authorization)
  next(); // Chuyển tiếp request sang middleware tiếp theo
});
app.use(express.static(path.join(dirname, "..", "Public"))); // 
// Sử dụng middleware "body-parser" để xử lý dữ liệu JSON và dữ liệu từ form
app.use(bodyParser.json({ // được sử dụng để xử lý dữ liệu JSON trong yêu cầu.
  limit: "30mb", // giới hạn dung lượng dữ liệu JSON được chấp nhận.
  extended: true // cho phép xử lý dữ liệu có định dạng phức tạp.
}));
app.use(bodyParser.urlencoded({ // được sử dụng để xử lý dữ liệu từ form.
  limit: "30mb", // giới hạn dung lượng dữ liệu từ form được chấp nhận.
  extended: true // cho phép xử lý dữ liệu từ form có định dạng phức tạp.
}));
// Sử dụng các routes liên quan đến user
app.use("/user/", userRoutes);
// Sử dụng các routes liên quan đến zing mp3
app.use("/api/", zingRoutes);
// thử in lên một cái gì đó
app.get('/', (request, response) => {
  // Gửi tệp HTML về trình duyệt
  response.sendFile(path.join(dirname, "..", "Public", "main.html"));
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