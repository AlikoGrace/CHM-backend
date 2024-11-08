const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    role: {
        type: String,
        enum: ['main_pastor', 'mc_head', 'senior_shepherd', 'shepherd'],
        default: 'shepherd'
    },

    password: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: false
    },
    otpExpires: {
        type: Date
    }

})


module.exports = mongoose.model('User', userSchema);