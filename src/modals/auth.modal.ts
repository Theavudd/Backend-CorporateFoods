import {Schema, model} from 'mongoose';

const UserSchema = new Schema(
  {
    fullName: String,
    companyName: String,
    employeeId: String,
    emailId: String,
    password: {
      iv: String,
      encryptedData: String,
    },
    accountType: Number,
    phoneNo: String,
  },
  {versionKey: false},
);

export const UserData = model('User', UserSchema);
