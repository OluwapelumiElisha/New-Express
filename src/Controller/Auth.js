const UserZodSchema = require("../Utils/ZodSchema");
const { sendWelcomeEmail } = require("../mailer");
const User = require("../model/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (id, email) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const handleSignUp = async (req, res) => {
  let { firstName, lastName, email, gender, phone, password } = req.body;
  try {
    let validatedData = UserZodSchema.parse({
      firstName,
      lastName,
      email,
      gender,
      phone,
      password,
    });

    const salt = await bcrypt.genSalt();
    validatedData.password = await bcrypt.hash(password, salt);
    // console.log(validatedData);
    const response = await User.create(validatedData);
    res.status(200).json(response);
    const name = firstName;

    await sendWelcomeEmail({ name, email });

    
  } catch (error) {
    res.status(500).json({ error: "Error Creating Data ", error });
    console.log(error);
  }
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(404).json({ message: "Please Fill all Details" });
    }
    const user = await User.findOne({ email });
    // checking and feching user data in the data base
    if (!user) {
      return res.status(404).json({ message: "Invaild Login Crediential" });
    }
    // checking if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invaild Login Crediential" });
    }
    // Creating a token for login user jwt
    const token = createToken(user._id, user.email);
    console.log(req.body);
    // res.status(200).json(req.body)
    res.status(200).json({ message: "Paid Money to Login brr", token });
  } catch (error) {
    console.log(error);
  }
};
const handleCheckAuth = async(req,res)=>{
    try {
      const user = await User.findById(req.user);
      if(!user){
        return res.status(404).json({message: "User Not Found"})
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status).json({ message });
    }
}
module.exports = {
  handleSignUp,
  handleLogin,
  handleCheckAuth
};

// lfvi vdcf cqqf lyno
// JWT --> Json Web Token
