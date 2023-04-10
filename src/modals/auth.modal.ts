import {Schema, model} from 'mongoose';

const UserSchema = new Schema(
  {
    userId: String,
    name: String,
    companyName: String,
    employeeId: String,
    email: String,
    password: String,
    accountType: Number,
    tokeniv: String,
  },
  {versionKey: false},
);

export const UserData = model('User', UserSchema);
