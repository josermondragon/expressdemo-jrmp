// requieres express
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const res = require("express/lib/response");

// create a express server function above
const server = express();


//tell our server how to process different payloads
server.use(express.json())

//tell my server to let request from browsers come through
server.use(cors());

const PORT = process.env.PORT || 3000;

// make the server listen on a port (on our computer)
server.listen(PORT, () => {
    console.log("Server Listening...");
});


const destinations = []
//missing shit here

const students = {
    dao:{
        name: "Dao",
        interests: ["food"],
        city: "Sac Town"
    },
    nikko:{
        name: "Nikko",
        interests: ["food"],
        city: "Detroit"
    },
    will:{
        name: "Will",
        interests: ["camaro", "frontier", "wrangler", "bananas"],
        city: "Detroit"

    },
    mannie: {
        name: "Mannie",
        interests: ["soccer", "bananas"],
        city: "Georgia",
      }
}
//Get /students
server.get("/students", (req,res) => {const { name, interest, city } = req.query;
if (name) {
const student = students[name.toLowerCase()];
if (student) {
return res.send(student);
}
return res
.status(404)
.send({ error: `student by the name of ${name} not found` });
}
let filteredStudents = Object.values(students);
if (interest) {
filteredStudents = filteredStudents.filter((student) =>
student.interests.includes(interest.toLowerCase())
);
}
if (city) {
filteredStudents = filteredStudents.filter(
(student) => student.city.toLowerCase() === city.toLowerCase()
);
}
return res.send(filteredStudents);

});


server.get("/students/name/:name", (req,res) =>{
    const {name} = req.params;

    if (name) {
       const student = students[name.toLowerCase()];

       if(student) {
       return res.send(student);
    }

    return res
    .status(404)
    .send({error: `Student by the name of ${name} not found`});
}
});
    server.get("/students/city/:city", (req,res) => {
        const {city} = req.params;

    if (city) {
        const filteredStudents = Object.values(students).filter(
        (student) => student.city.toLowerCase() === city.toLowerCase()
    );
    return res.send(filteredStudents);
    }
});

server.get("/students/interests/:interests", (req,res) => {
    const {interests} = req.params; 
if (interests) {
    const filteredStudents = Object.values(students).filter((student) => 
    student.interests.includes(interests.toLowerCase())
);
return res.send(filteredStudents);
}
});

server.get("/students/name/:name/city/:city", (req,res) => {
    const { name, city} = req.params;
    if(name,city) {
        const student = students[name.toLowerCase()];
        const filteredStudents = Object.values(students).filter(
            (student) => student.city.toLowerCase() === city.toLowerCase()
            );
    
    return res.send(student),(filteredStudents)
}
});


// CREATE => POST
// POST/destinations
// what is a destination, what makes a destination record?
server.post("/destinations", async  (req,res) => {
    //ONLY grab what I need
    const {destination,location,photo,description} = req.body
    // const destination = req.body.destination

    //VALIDATE that I got what I expected (destination and location are both present and no empty strings)
    if (!destination || !location || destination.lengt=== 0 || location.lengt=== 0){
       return res.status(400).send({error: "Destination and Location are both required"})
    }
   

const UnsplashApiUrl = `https://api.unsplash.com/search/photos?query=${destination} ${location}&client_id=asmDy-TlpZh-xiDnk3U0ypQ2KCcMopC5DFQ3dPnwTAk`;

const {data} =await axios.get(UnsplashApiUrl);

const photos = data.results
const randIdx = Math.floor(Math.random()*photos.length)


    //CREATE the new object to put in my database
    const newDest = {
        destination,
        location,
        photo: data.results[randIdx].urls.small,
        description: description && description.lengt !==0 ? description : ""
    }

    destinations.push(newDest)

    res.redirect(303,"/destinations")
    
} );


//GET /destinations
server.get("/destinations", (req,res) => {
    res.send(destinations);
});