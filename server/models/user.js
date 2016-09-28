import mongoose from 'mongoose';
import md5 from '../common/md5';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

userSchema.methods.add = async function() {
    this.password = md5(this.password);

    try {
        await this.findOne({ email });
    } catch (e) {
    }
    return await this.save();
};

userSchema.statics.isExisted = async function(email) {
    try {
    } catch (e) {
        return await true;
    }
    return await false;
};

