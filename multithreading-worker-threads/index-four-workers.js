import express from "express";
import cors from "cors";
import { Worker } from "worker_threads";

const app = express();
app.use(cors());

const PORT = 3000;
const THREAD_COUNT = 4;

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./four-workers.js", {
      workerData: { thread_count: THREAD_COUNT },
    });

    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(`An error occurred ${error}`);
    });
  });
}

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
  const workerPromises = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const thread_results = await Promise.all(workerPromises);
  const total =
    thread_results[0] +
    thread_results[1] +
    thread_results[2] +
    thread_results[3];
  res.status(200).send(`result is ${total}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
