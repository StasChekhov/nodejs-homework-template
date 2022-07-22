const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
 const { path: tempDir, originalname } = req.file;
 const { _id } = req.user;
 const [extension] = originalname.split(".").reverse();
 const newName = `${_id}.${extension}`;
 const resultDir = path.join(avatarsDir, newName);
 await fs.rename(tempDir, resultDir);
 const avatarURL = path.join("avatars", newName);
 await User.findByIdAndUpdate(_id, { avatarURL });
 res.json({ avatarURL });
};

module.exports = updateAvatar;
