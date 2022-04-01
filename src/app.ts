import "reflect-metadata";
import {createConnection} from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

import Router from "./routes";
import dbConfig from './config/database'

const PORT = process.env.PORT || 8000;

const app: Application = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);
io.on('connection', (socket: any) => {
    console.log('a user connected');
    socket.on('abc', (veri:any) => {
        console.log(veri);
        io.emit('abc', veri);
    });
});
app.use(Router);

createConnection(dbConfig).then(_connection => {
    server.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
}).catch(err => {
    console.log("Unable to connect to db", err);
    process.exit(1)
})
