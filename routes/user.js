// Import các module và thư viện cần thiết
import { Router } from 'express';
import jwt from 'jsonwebtoken'; // Thư viện JWT cho xác thực
import bcrypt from 'bcryptjs'; // Thư viện bcrypt để hash mật khẩu
import colors from "chalk"; // Thư viện colors để làm đẹp console log
import stdb from "st.db"; // thư viện database
// Import module MongoData từ file functions.js
import { MongoDriver } from "../functions.js";
// Khởi tạo router
const router = Router();
// Lấy đối tượng MongoDB từ MongoData
// new stdb.JSONDriver("data.json"),
 
const data = new stdb.Database({
  driver: new MongoDriver({
    databaseName: "BlackCat-React", // tên database của dự án 
    collectionName: "react-data" // tên gói database
  }),
});
// Tuyến đường xử lý đăng nhập
router.post('/login', async(req, res) => {
  const { username, password } = req.body;
  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const existingUser = await data.get(username);
    if (!existingUser) return res.status(404).json({
      message: 'Người dùng không tồn tại.'
    });

    // So sánh mật khẩu đã hash
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({
      message: "Mật khẩu không đúng."
    });
  
    // Tạo token JWT nếu thông tin đăng nhập hợp lệ
    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi.' });
  };
});

// Tuyến đường xử lý đăng ký
router.post('/signup', async (req, res) => {
  const { password, repeatPassword, username, profileImage, name } = req.body;
  try {
    // Kiểm tra tên người dùng đã tồn tại chưa
    const existingUsername = await data.has(username);
    if (existingUsername) return res.status(400).json({
      message: 'Tên người dùng đã tồn tại.'
    });
    // Kiểm tra tính hợp lệ của mật khẩu và mật khẩu lặp lại
    if (password !== repeatPassword) return res.status(404).json({
      message: "Mật khẩu không khớp."
    });
    // Hash mật khẩu và lưu thông tin người dùng mới vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 12);
    data.set(username, {
      username: username,
      password: hashedPassword,
      name: name,
      profileImage: profileImage,
    });
    // Tạo token JWT cho người dùng mới
    const result = await data.get(username);
    const token = jwt.sign(
      { username: result.username, id: result._id },
      'test',
      { expiresIn: '1h' }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
});

router.patch('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    // Kiểm tra xem người dùng có tồn tại không
    const existingUser = await data.get(userId);
    if (!existingUser) return res.status(404).json({ 
      message: 'Người dùng không tồn tại.' 
    });
    // Tạo một object mới để lưu trữ giá trị cũ và các thay đổi
    const updatedUser = Object.assign({}, existingUser, req.body);
    // Lưu lại vào cơ sở dữ liệu
    data.set(userId, updatedUser);
    // Log thông báo cập nhật thành công
    console.log(`${colors.blue(`[${userId}]`)}: Đã cập nhật lại Profile, ${JSON.stringify(req.body)}`);
    res.status(200).json({ 
      message: 'Cập nhật thành công.',
      result: await data.get(userId),
    });
  } catch (error) {
    // Log lỗi nếu có
    console.error(`${colors.red(`[${userId}]`)}: Lỗi khi cập nhật Profile: ${error.message}`);
    res.status(500).json({ message: 'Đã xảy ra lỗi.' });
  }
});

// Xuất router để sử dụng trong ứng dụng Express
export default router;
