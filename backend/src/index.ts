import express from 'express';
import mongoose from 'mongoose';
import { postRouter } from './routes/post';
import { authRouter } from './routes/auth';
import 'dotenv/config'

const app= express();

app.use(express.json())
app.use(postRouter)
app.use(authRouter)

mongoose.connect(process.env.DB_URL!).then(()=> {
    const port= process.env.PORT || 8080;

    app.listen(port, ()=> {
        console.log(`listening on http://localhost:${port}/`)
    })
})