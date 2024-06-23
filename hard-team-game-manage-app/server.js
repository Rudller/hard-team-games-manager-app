import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const app = express()

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch(err => console.log(err));

const realizationSchema = new mongoose.Schema({
    companyName: String,
    description: String,
    date: Date,
    people: Number,
    teams: {
        teamsNumber: Number,
        teams: [{
            name: String,
            color: String
        }]
    }
})

const Realization = mongoose.model("Realization", realizationSchema);

const User = mongoose.model("User", new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    authorized: Boolean,
}))

// Realizations
app.post("/api/realizations", (req, res) => {
    const newRealization = new Realization(req.body)
    newRealization.save()
        .then(() => res.status(201).json({ message: 'Realization created successfully' }))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Users
app.get("/api/users", (req, res) => {   
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

app.post("/api/users", (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
        .then(() => res.status(201).json({ message: 'User created successfully' }))
        .catch(err => res.status(400).json('Error: ' + err));
})