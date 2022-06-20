const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const debug = require("debug");
const http = require("http");
const cors = require("cors");

const router = require("./routes/function_router");
const app = express();

// Database Credentials to allow the connection.
const dbcreds = require("../credentials");
app.use(express.urlencoded({ extended: true}));

// Forming the connection to the database.
const dbURI = `mongodb+srv://${dbcreds.clusterName}:${dbcreds.databasePassword}@cluster0.psmwl.mongodb.net/${dbcreds.databaseName}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log("Connected to database!"); })
.catch(() => { console.log("Connection failed!"); });

// Use CORS for complying to the policy.
app.use( cors({ origin: "http://localhost:3000", methods: "GET,POST,PUT,DELETE", credentials: true, exposedHeaders: ['set-cookie'] }) );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const normalizePort = val => {
    var port = parseInt(val, 10);
  
    // named pipe and port.
    if (isNaN(port)) return val;
    if (port >= 0) return port;
  
    return false;
};
  
  // Setting up Callbacks.
const onError = error => {
    if (error.syscall !== "listen") throw error;
        const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
        switch (error.code) {
            case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
            case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
            default:
            throw error;
    }
}

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
}


// Starting the Server.
const onServerStart = () => {
    console.log('Ultimate Ecommerce App server is running at PORT: ', app.get('port'));
}

// Set the PORT.
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

// Start the Server.
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port, onServerStart);

app.use("/", router);