import mongoose from "mongoose";

const userSchema = mongoose.model("account", mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    email: { type: String },
    profileImage: { type: String },
    favouriteSongs: { type: Array },
    favouritePlaylist: { type: Array },
    favouriteArtist: { type: Array },
}));

export default userSchema;
