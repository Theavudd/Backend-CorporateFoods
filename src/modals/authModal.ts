import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
  name: String,
  companyName: String,
  employeeId: String,
  emailId: String,
  password: String,
});

const userData = model('userdata', UserSchema);
