const mongoose = require("mongoose");

// Schema for job..
const jobSchema = new mongoose.Schema ({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,   
    },
    phone: {
        type: Number,
        required: true,
        
    },
    profile: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        
    },
    city: {
        type: String,
        required: true
    },
    
    appliedBy:{
        type: [String],
        default: undefined
    } 
})
// creating model/collection/table from above jobSchema..
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;