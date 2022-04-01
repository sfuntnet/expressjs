import "reflect-metadata";
import {createConnection} from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
const swaggerJsDoc = require("swagger-jsdoc");
import Router from "./routes";

const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
import dbConfig from './config/database'
const PORT = process.env.PORT || 8000;

const app: Application = express();

const http = require('http');
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
const io = require("socket.io")(server, {
    handlePreflightRequest: (req:any, res:any) => {
        const headers = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
        };
        res.writeHead(200, headers);
        res.end();
    },
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// app.use(
//     "/docs",
//     swaggerUi.serve,
//     swaggerUi.setup(undefined, {
//         swaggerOptions: {
//             url: "/swagger.json",
//         },
//     })
// );
io.on('connection', (socket: any) => {
    console.log('a user connected');
    socket.on('abc', (veri:any) => {
        console.log(new Date() + ' - ' + veri);
        io.emit('abc', '=> ' + new Date() + ' - ' + veri);
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
