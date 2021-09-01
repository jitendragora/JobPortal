const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("./db/conn");
const User = require("./models/registers");
const Job = require("./models/jobs");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "/views");
const app = express();

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', views_path);

app.get("/", (req, res) => {
    res.send("index");y
})
app.get("/home", (req, res) => {
    res.sendFile(static_path+ "/index.html");
})
app.get("/register", (req, res) => {
    res.sendFile(static_path+ '/register.html');
})
app.get("/login", (req, res) => {
    res.sendFile(static_path+ "/login.html");
})
app.get("/log_out", (req, res) => {
    res.sendFile(static_path+ "/index.html");
})
app.get("/jobs",  (req, res) => {
    Job.find({}, function(err, jobs){
        res.render("allJobs", {joblists: jobs});
    })
})
// app.post("/jobs",  (req, res) => {
//     console.log(req.body);
// })

app.post("/apply_job",  (req, res,) => {
    
    res.render("jobApplied");
})

app.get("/post_jobs",(req, res) => {
    res.render("postJob");
})

app.post("/requestSearch", (req, res) => {
    Job.find({$text: {$search: req.body.searchinput}}, function(err, jobs){
        res.render("allJobs", {joblists: jobs});
    })
    // console.log(req.body.searchinput)
})

app.post("/register", async (req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const registerUser = new User({
                name: req.body.name,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
                email: req.body.email,
                phone: req.body.phone
            })
            
            const registeredUser = await registerUser.save();
            res.status(201).sendFile(static_path+ "/login.html");
        }
        else{
            res.send ("passwords are not matching");
        }

    } catch(err){
        res.status(400).send(err);
    }
})

app.post("/login", async (req, res) => {
    try{
        const emailId = req.body.email;
        const pass = req.body.password;
        
        const targetUser = await User.findOne({email:emailId});

        if(targetUser.password === pass){
            res.status(201).render("jobs", {userName: targetUser.name});
        } else{
            res.send("invalid login details");
        }
        
    } catch(err){
         res.status(400).send("invalid details");
    }
})

app.post("/post_job", async (req, res) => {
    try{
        const postedJob = new Job({
            companyName: req.body.companyName,
            email: req.body.email,
            phone: req.body.phone,
            profile: req.body.profile,
            
            city: req.body.city,
            description: req.body.description,
        })
        
        const registeredPost = await postedJob.save();
        res.status(201).render("jobpostdone");
    } catch(err){
        res.status(400).send(err);
    }
})


// app.get("/city:id", (req, res) => {
//         Job.find({city: "bangalore"}, function(err, jobs){
//             res.render("bangalore", {joblist: jobs});
//         })
//     })
app.get("/bangalore", (req, res) => {
    Job.find({city: "bangalore"}, function(err, jobs){
        res.render("bangalore", {joblist: jobs});
    })
})
app.get("/chennai", (req, res) => {
    Job.find({city: "chennai"}, function(err, jobs){
        res.render("chennai", {joblist: jobs});
    })
})
app.get("/hydrabad", (req, res) => {
    Job.find({city: "hydrabad"}, function(err, jobs){
        res.render("hydrabad", {joblist: jobs});
    })
})
app.get("/noida", (req, res) => {
    Job.find({city: "noida"}, function(err, jobs){
        res.render("noida", {joblist: jobs});
    })
})
app.get("/gurugram", (req, res) => {
    Job.find({city: "gurugram"}, function(err, jobs){
        res.render("gurugram", {joblist: jobs});
    })
})
app.get("/jaipur", (req, res) => {
    Job.find({city: "jaipur"}, function(err, jobs){
        res.render("jaipur", {joblist: jobs});
    })
})


app.listen (port, () => {
    console.log(`server is running on port ${port}`);
})
