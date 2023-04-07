import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
  fullName: String,
  companyName: String,
  employeeId: String,
  emailId: String,
  password: String,
  accountType: Number,
  phoneNo: String,
});

export const UserData = model('User', UserSchema);
