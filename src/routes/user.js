// Import các module và thư viện cần thiết
import { Router } from "express";
import jwt from "jsonwebtoken"; // Thư viện JWT cho xác thực
import bcrypt from "bcryptjs"; // Thư viện bcrypt để hash mật khẩu
import colors from "chalk"; // Thư viện colors để làm đẹp console log
// Import module
import account from "../schema/users.js";
// Khởi tạo router
const router = Router();
// Tuyến đường xử lý đăng nhập
router.post("/login", async (req, res) => {
  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const existingUser = await account.findOne({ username: req.body.username });
    if (!existingUser) return res.status(404);
    // So sánh mật khẩu đã hash
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );
    if (!isPasswordCorrect) return res.status(400);
    // Tạo token JWT nếu thông tin đăng nhập hợp lệ
    const token = jwt.sign(
      {
        username: existingUser.username,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "1h" },
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Đã xảy ra lỗi." });
  }
});

// Tuyến đường xử lý đăng ký
router.post("/signup", async (req, res) => {
  const { password, repeatPassword, username, profileImage, name } = req.body;
  try {
    // Kiểm tra tên người dùng đã tồn tại chưa
    const existingUsername = await account.findOne({ username: username });
    if (existingUsername?.username === username) {
      return res.status(400).json({
        message: "Tên tài khoản đã tồn tại",
      });
    }
    // Kiểm tra tính hợp lệ của mật khẩu và mật khẩu lặp lại
    if (password !== repeatPassword)
      return res.status(404).json({
        message: "Mật khẩu không khớp.",
      });
    // Hash mật khẩu và lưu thông tin người dùng mới vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await account.create({
      profileImage: profileImage,
      password: hashedPassword,
      username: username,
      name: name,
      favouritePlaylist: [],
      favouriteArtist: [],
      favouriteSongs: [],
    });
    // Tạo token JWT cho người dùng mới
    const token = jwt.sign(
      { username: result.username, id: result._id },
      "test",
      { expiresIn: "1h" },
    );
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:username", async (req, res) => {
  const username = req.params.username;
  const userData = req.body;
  try {
    const findUsername = await account.findOneAndUpdate({ username: username },
      {
        $set: { ...userData },
      },
      { new: true },
    );
    console.log(
      `${colors.blue(`[${username}]`)}: ${colors.green(
        "Đã cập nhật lại Profile",
      )}, ${colors.red(JSON.stringify(req.body))}`,
    );
    res.status(200).json({
      message: "Cập nhật lại thông tin thành công.",
      result: findUsername,
    });
  } catch (error) {
    // Log lỗi nếu có
    console.error(`${colors.red(`[${username}]`)}: Lỗi khi cập nhật Profile: ${error.message}`);
    res.status(500).json({ message: "Đã xảy ra lỗi." });
  }
});

// Assuming your route is something like '/api/users/:id/like'
router.post('/:username/like', async (req, res) => {
  const { username } = req.params;
  const { type, item } = req.body;
  
  const updateUser = async (id, update) => {
    try {
      return await account.updateOne({ username: id }, update);
    } catch (error) {
      throw error;
    }
  };
  
  try {
    const user = await account.findOne({ username: username });
    if(!user) return res.status(404).json({ 
      message: 'Không tìm thấy người dùng'
    });
  
    let likeSelector;
    if (type === 1) {
      likeSelector = user.favouritePlaylist.find((e) => e?.encodeId === item?.encodeId);
    } else if (type === 2) {
      likeSelector = user.favouriteSongs.find((e) => e?.encodeId === item?.encodeId);
    } else if (type === 3) {
      likeSelector = user.favouriteArtist.find((e) => e?.id === item?.id);
    };
    let isLike = !!likeSelector;

    if (!isLike) {
      // Add to favorites
      await updateUser(username, { 
        $push: {
          [`favourite${type === 3 ? 'Artist' : type === 1 ? 'Playlist' : 'Songs'}`]: item 
        } 
      });
      res.json({ 
        data: user,
        message: 'Added to favorites'
      });
    } else {
      // Remove from favorites
      await updateUser(username, { $pull: { [`favourite${type === 3 ? 'Artist' : type === 1 ? 'Playlist' : 'Songs'}`]: item } });
      res.json({ 
        data: user,
        message: 'Removed from favorites' 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//
router.get("/finduser/:username", async(request, response) => {
  const user = await account.findOne({ username: request.params.username });
  response.status(200).json({ 
    message: "Lấy thông tin người dùng thành công",
    data: user,
  });
});
// Xuất router để sử dụng trong ứng dụng Express
export default router;

