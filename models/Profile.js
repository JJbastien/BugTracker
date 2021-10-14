// creation of user profile
const mongoose = require ('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    department:{
        type: String
    },
    title:{
        type: String
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);


