const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
   
app.use(cors());
app.use(express.json());

const atlasConnectionURI = 'mongodb+srv://patmesh2003:qbpte4hFjjxyAsXi@cluster0.9pptbuf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(atlasConnectionURI, {
    authSource: 'admin', 
    user: 'patmesh2003', 
    pass: 'qbpte4hFjjxyAsXi',  
  }).then(console.log("connected to mongodb"));
 
  const userAuthSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  
  const adminAuthSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  
  const userDetailsSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
    tenthMark: Number,
    twelfthMark: Number,
    currentCgpa: Number,
    fatherName: String,
    registerNumber: String,
    projectNames: [String],
    skills: [String],
    dateOfBirth: String,
    gender: String,
    department: String,
    degree: String,
    year:String,
    portfolioLink: String,
    githubLink: String,
    linkedinProfile: String, 
    resumeDriveLink: String,
    leetcodeLink:String,
    hackerrankLink:String,
  });
  
  const UserAuth = mongoose.model('UserAuth', userAuthSchema);
  const AdminAuth = mongoose.model('AdminAuth', adminAuthSchema);
  const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
  
  app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userExists = await UserAuth.findOne({ email });
  
      if (userExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserAuth({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserAuth.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {  
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = { userId: user._id, tk:'VSBECCSE2002' };
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.post("/find", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserDetails.findOne({ email });
        if (user) {
            res.json({ message: "Yes", id: user._id });
        } else {
            res.json({ message: "No" });
        }
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).send("Internal server error");
    }
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const user = await UserDetails.findById(id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


  app.post("/addDetails", async (req, res) => {
    try {
      const {
        name,
        email,
        registerNumber,
        fatherName,
        address,
        phoneNumber,
        dob,
        gender,
        tenthMark,
        twelfthMark,
        degree,
        department,
        year,
        currentCgpa,
        project1,
        project2,
        project3,
        project4,
        project5,
        skills,
        portfolioLink,
        githubLink,
        hackerrankLink,
        linkedinProfile,
        leetcodeLink, 
        resumeLink,
      } = req.body;
   
      const userDetails = new UserDetails({
        name,
        email,
        registerNumber,
        fatherName,
        address,
        phoneNumber,
        dateOfBirth:dob,
        gender,
        tenthMark,
        twelfthMark,
        degree,
        department,
        year,
        currentCgpa,
        projectNames: [project1, project2, project3, project4, project5],
        skills,
        portfolioLink,
        githubLink,
        hackerrankLink,
        linkedinProfile,
        leetcodeLink,
        resumeDriveLink: resumeLink,
      });
      await userDetails.save();
      res.status(201).json({ message: 'Details added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.post("/updateDetails/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const {
        name,
        email,
        registerNumber,
        fatherName,
        address,
        phoneNumber,
        dob,
        gender,
        tenthMark,
        twelfthMark,
        degree,
        department,
        year,
        currentCgpa,
        project1,
        project2,
        project3,
        project4,
        project5,
        skills,
        portfolioLink,
        githubLink,
        hackerrankLink,
        linkedinProfile,
        leetcodeLink, 
        resumeLink,
      } = req.body;
  
      const updatedDetails = {
        name,
        email,
        registerNumber,
        fatherName,
        address,
        phoneNumber,
        dateOfBirth: dob,
        gender,
        tenthMark,
        twelfthMark,
        degree,
        department,
        year,
        currentCgpa,
        projectNames: [project1, project2, project3, project4, project5],
        skills,
        portfolioLink,
        githubLink,
        hackerrankLink,
        linkedinProfile,
        leetcodeLink,
        resumeDriveLink: resumeLink,
      };
  
      const updatedUser = await UserDetails.findOneAndUpdate(
        { _id: userId },
        updatedDetails,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Details updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

app.get('/users', async (req, res) => {
    try {
      const userdetails = await UserDetails.find();
      res.json(userdetails);
    } catch (error) { 
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }); 


  app.listen(8000,()=>{
    console.log("server running on port 8000");
  })