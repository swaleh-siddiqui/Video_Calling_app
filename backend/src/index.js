import express from "express";
import {createServer} from "node:http";
import mongoose from "mongoose";

import {Server} from "socket.io";
import cors from "cors";

import userRoutes from "./routes/users.js"

import connectToSocket from "./controlers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit : "40kb", extended : true}));

// routes

app.use("/users", userRoutes);

// mongo connect

const local_db = "mongodb://localhost:27017/vc_project";
const db_url = "mongodb+srv://sufi:sufi_vc@clusterforvc.povbh.mongodb.net/?retryWrites=true&w=majority&appName=ClusterForVC";

main()
    .then(
        console.log("successfull")
    )
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(local_db);
}

app.get("/", async (req,res) => {
    let obj = {
        msg : "hello from express backend",
    }

    return res.send(obj);
})

const start = async () => {
    server.listen( app.get("port") , () => {
        console.log("backend server ready");
    })
}

start();

