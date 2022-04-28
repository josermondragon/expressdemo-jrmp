// requieres express
const express = require("express");

// create a express server function above
const server = express();

const PORT = process.env.PORT || 3000;

// make the server listen on a port (on our computer)
server.listen(PORT, () => {
    console.log("Server Listening...");
});


const destinations = []

// CREATE => POST
// POST/destinations
// what is a destination, what makes a destination record?
server.post("/destinations", (req,res) => {
    console.log("POST /destinations HIT")
    
} )


//GET /jose
server.get("/jose", (req,res) => {
    res.send("<h1>Hi Jose!</h1>");
});