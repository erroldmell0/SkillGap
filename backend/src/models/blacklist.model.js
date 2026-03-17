const mongoose = require('mongoose');

const blacklistTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"],
    }
}, {
    timestamps: true
});

const tokenBlacklistModel = mongoose.model('blacklistToken', blacklistTokenSchema);


module.exports = tokenBlacklistModel;