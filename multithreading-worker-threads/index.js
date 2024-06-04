import express from 'express';
import cors from 'cors';
import {Worker} from "worker_threads";

const app = express();
app.use(cors());

const PORT = 3000;

app.get("/non-blocking",(req,res)=>{
    res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
    
    const worker = new Worker('./worker.js');

    worker.on("message", (data)=>{
        res.status(200).res.send(`result is ${data}`);
    });
    worker.on("error", (error)=>{
        res.status(404).res.send(`result is ${error}`);
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
