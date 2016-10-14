import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

userSchema.statics.add = async function(user) {
    let document = await this.findOne({ email: user.email });
    if (document) {
        return { status: 'error', msg: '此邮箱已注册' };
    }

    let u = await user.save();
    return { status: 'success', msg: '注册成功' };
};

let User = mongoose.model('User', userSchema);

export { User };

