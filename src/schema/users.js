import mongoose from "mongoose";

const userSchema = mongoose.model("account", mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    isAdmin: { type: mongoose.Schema.Types.Boolean, default: false },
    name: { type: mongoose.Schema.Types.String },
    email: { type: mongoose.Schema.Types.String },
    profileImage: { type: mongoose.Schema.Types.String },
    favouriteSongs: { type: mongoose.Schema.Types.Array },
    favouritePlaylist: { type: mongoose.Schema.Types.Array },
    favouriteArtist: { type: mongoose.Schema.Types.Array },
}));

export default userSchema;
