import { Database, JSONDriver } from 'st.db';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const data = new Database({
  driver: new JSONDriver("data.json"),
});
const router = Router();

router.post('/login', async(req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await data.get(username);
    if (!existingUser) return res.status(404).json({
      message: 'Người dùng không tồn tại.'
    });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({
      message: 'Thông tin không hợp lệ'
    });
  
    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  };
});

router.post('/signup', async (req, res) => {
  const { email, password, repeatPassword, username, profileImage, name } = req.body;
  try {
    const existingUsername = await data.has(username);
    if (existingUsername) return res.status(400).json({
      message: 'Tên người dùng đã tồn tại.'
    });
    
    if (password !== repeatPassword) return res.status(404).json({
      message: "Mật khẩu không khớp."
    });

    const hashedPassword = await bcrypt.hash(password, 12);

    data.set(username, {
      username: username,
      password: hashedPassword,
      email: email,
      name: name,
      profileImage: profileImage,
    });

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
    // Cập nhật thông tin người dùng
    existingUser.profileImage = req.body.profileImage;
    existingUser.name = req.body.name;

    // Lưu lại vào cơ sở dữ liệu
    data.set(userId, existingUser);
    
    console.log(`[${userId}]: Đã cập nhật lại Profile`);
    res.status(200).json({ message: 'Cập nhật thành công.' });
  } catch (error) {
    console.error(`[${userId}]: Lỗi khi cập nhật Profile: ${error.message}`);
    res.status(500).json({ message: 'Đã xảy ra lỗi.' });
  }
});

export default router;