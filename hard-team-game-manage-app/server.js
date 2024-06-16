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

app.get("/api/realisations", (req, res) => {
    
})

app.post("/api/realizations", (req, res) => {
    const newRealization = new Realization(req.body)
    console.log(newRealization)
    
    newRealization.save()
        .then(() => res.status(201).json({ message: 'Realization created successfully' }))
        .catch(err => res.status(400).json('Error: ' + err));
})