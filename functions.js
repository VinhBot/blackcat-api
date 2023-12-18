import mongodb from "mongodb";
import stdb from "st.db";

export const MongoData = () => {
  class MongoDriver {
    // Hàm khởi tạo của lớp, nhận các tùy chọn cấu hình.
    constructor(options) {
      this.mongoURL = options.setMongoURL;  // Đường dẫn kết nối MongoDB
      this.databaseName = options.databaseName;  // Tên của cơ sở dữ liệu
      this.collectionName = options.collectionName;  // Tên của bộ sưu tập
      this.connectionOptions = options.connectionOptions;  // Tùy chọn kết nối
      this.collection = null;  // Khởi tạo biến collection
      this.data = null;  // Khởi tạo biến dữ liệu
    };
    // Phương thức kết nối đến cơ sở dữ liệu MongoDB.
    async connect() {
      if (!this.data) {
        this.data = await mongodb.MongoClient.connect(this.mongoURL, this.connectionOptions);
        const db = this.data.db(this.databaseName);
        this.collection = db.collection(this.collectionName);
      };
    };
    // Phương thức ngắt kết nối khỏi cơ sở dữ liệu MongoDB.
    async disconnect() {
      if (this.data) {
        await this.data.close();
        this.data = null;
        this.collection = null;
      };
    }
    // Phương thức xóa toàn bộ dữ liệu trong bộ sưu tập.
    async clear() {
      await this.connect();
      await this.collection?.deleteMany({});
    };
    // Phương thức lấy tất cả các tài liệu trong bộ sưu tập.
    async all() {
      await this.connect();
      const documents = await this.collection?.find().toArray();
      return (documents || []).map((doc) => {
        return { ID: doc._id, data: doc.data || null };
      });
    };
    // Phương thức kiểm tra sự tồn tại của một khóa trong bộ sưu tập.
    async has(key) {
      await this.connect();
      const count = await this.collection?.countDocuments({ _id: key });
      return count !== undefined && count > 0;
    };
    // Phương thức lấy giá trị của một khóa từ bộ sưu tập.
    async get(key) {
      await this.connect();
      const document = await this.collection?.findOne({ _id: key });
      return document?.data;
    };
    // Phương thức thiết lập giá trị cho một khóa trong bộ sưu tập.
    async set(key, value) {
      await this.connect();
      await this.collection?.updateOne(
        { _id: key },
        { $set: { _id: key, data: value } },
        { upsert: true }
      );
      return value;
    };
    // Phương thức xóa một khóa khỏi bộ sưu tập.
    async delete(key) {
      await this.connect();
      await this.collection?.deleteOne({ _id: key });
    };
  };
  return {
    react_data: new stdb.Database({
      driver: new MongoDriver({
        setMongoURL: "mongodb+srv://BlackCat-Club:blackcat2k3@blackcat-club.sfgyw.mongodb.net/", /*url của mongodb*/
        databaseName: "BlackCat-React", /* tên database của dự án */
        collectionName: "react-data" /*tên gói database*/
      }),
    }),
  };
};