import express from 'express';
import { connect } from 'mongoose';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routes/users.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: [ process.env.APP_URL ] }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "lobalala" })
});

app.use('/api/auth', usersRouter);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.error('MongoDB connection error:', err));


 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });
 