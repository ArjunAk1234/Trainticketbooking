const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 4000;

const otpMap = new Map();
const upload = multer();

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://ananthakrishnans0608:ArjunAk1234@cluster1.hjjwq.mongodb.net/Train?retryWrites=true&w=majority&appName=Cluster1';

// MongoDB connection
mongoose.connect(MONGODB_URI, {
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String
},{ collection: 'Users' });

const User = mongoose.model('User', userSchema);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Handle GET requests for login and signup pages
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// NodeMailer setup
const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'webpage.krctc.project@gmail.com', // Your Gmail address
    pass: 'umzy cqxf odzr qeyj', // Your Gmail app password
    // pass: 'xkry osow maah ymmy', // Your Gmail app password
  },
});

// Handle POST request to send OTP
app.post('/send-otp', async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const user = await User.findOne({ email, phone, password });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpMap.set(email, otp);

      const mailOptions = {
        from: 'webpage.krctc.project@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your One Time Password (OTP) for LOGIN on KRCTC is  ${otp}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Error sending OTP' });
        } else {
          res.json({ success: true, message: 'OTP sent successfully' });
        }
      });
    } else {
      res.json({ success: false, message: 'Invalid email, phone, or password' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Handle POST request to verify OTP and login
app.post('/login', async (req, res) => {
  const { email, phone, password, otp } = req.body;

  try {
    const user = await User.findOne({ email, phone, password });
    const storedOtp = otpMap.get(email);

    if (user && storedOtp === otp) {
      otpMap.delete(email); // Clear OTP after successful login
      res.json({ success: true, message: 'Login successful!', user });
    } else {
      res.json({ success: false, message: 'Invalid OTP or credentials' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Handle POST requests for registration
app.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log('Received registration data:', { name, email, password, phone }); // Log received data
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.json({ success: false, message: 'User already exists' });
    } else {
      const newUser = new User({ name, email, password, phone });
      await newUser.save();
      res.json({ success: true, message: 'Registration successful!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Redirect root path to login page
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
