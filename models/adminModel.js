import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator';


const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

adminSchema.statics.signup = async function (email, password) {
  const exist = await this.findOne({ email });
  const all =await this.find();

  if(all.length!==0){
    throw Error("Already has an Admin.!.");
  }

  if (exist) {
    throw Error("Email already exists.!.");
  }
  if(!email || !password){
    throw Error("All fields must be filled...")
  }

  if(!validator.isEmail(email)){
    throw Error("Not a valid email.!.")
  }
  if(!validator.isStrongPassword(password)){
    throw Error("Password is not strong enough.!.")
  }


  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const admin = await this.create({email,password:hash});

  return admin;
};


adminSchema.statics.login=async function(email,password){
  if(!email || !password){
    throw Error("All fields must be filled...")
  }

  const admin = await this.findOne({ email });

  if(!admin){
    throw Error('Incorrect Email.!.');
  }

  const match=await bcrypt.compare(password,admin.password)

  if(!match){
    throw Error('Incorrect password.!.');
  }


  return admin;


}

const admin = mongoose.model("AdminCollection", adminSchema);

export default admin;
