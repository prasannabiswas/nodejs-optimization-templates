import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 3000;

app.get("/heavy", (req,res)=>{
    let total = 0;
    for(let i=0;i<50_000_000;i++) {
        total++;
    }
    res.send(`The result of the CPU intensive task is ${total}\n`);
})

app.listen(PORT, ()=>{
    console.log(`App running on ${PORT}`);
    console.log(`Worker pid=${process.pid}`);
})