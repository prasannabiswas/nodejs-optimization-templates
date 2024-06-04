import express from "express";
import cors from "cors";
import EventEmitter from "events";

const app = express();
app.use(cors());
const eventEmitter = new EventEmitter();

const PORT = 3001;

// global variables
let tasks = [];

app.get("/", (req,res)=>{
    // // closure with an external variable reference
    // tasks.push(function() {
    //     return req.headers
    // })

    // // too much data
    // const hugeArray = new Array(1_00_000_000).fill(req)
    // // node-cache, memcached (external library's to solve)

    // // circular object reference
    // req.user = {
    //     id: 1,
    //     username: 'Inefficient User',
    //     badObject: req,
    //     hugeArray
    // };    

    // // clear event emitter listeners
    // eventEmitter.on('start', () => {
    //     console.log('Useless event emitted')
    // })

    // // Should always clear set timeouts for best practise 
    // const resWithTimeout = setTimeout(()=>{
    //     res.send('Hello World!');
    // })
    // clearTimeout(resWithTimeout);

    // Just for test purpose - this below mentioned code
    tasks.push(function() {
        return req.headers
    });

    req.user = {
        id: 1,
        username: 'Efficient User',
        badObject: "Circular references removed"
    };

    setTimeout(()=>{
        res.send('Hello World!');
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Add error handling for the server
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
        process.exit(1);  // Exit the process with an error code
    } else {
        console.error(`Server error: ${err}`);
        process.exit(1);  // Exit the process with an error code
    }
});