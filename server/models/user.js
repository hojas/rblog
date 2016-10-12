import mongoose from 'mongoose';
import md5 from '../common/md5';

const { Schema } = mongoose;

const userSchema = new Schema({
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

export default mongoose.model('User', userSchema);

