const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const reservation = [];
const waitingList = [];




app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname,"index.html"));
});

app.get("/add", function(req, res){
    res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/tables", function (req,res) {
    res.sendFile(path.join(__dirname, "tables.html"));    
});

app.get("/api/tables", function (req, res) {
    return res.json(reservation);
});

app.get("/api/waitlist", function (req,res) {
    return res.json(waitingList);
})

app.post("/api/reservation", function(req,res) {
    const newReserv = req.body;
    newReserv.routeName = newReserv.name.replace(/ /g, "").toLowerCase();
    console.log(newReserv);

    const isItFull = false;
    if(reservation.length <= 4) {
        reservation.push(newReserv);
    } else {
        waitingList.push(newReserv);
        isItfull = true;
    }
    res.json(newReserv);
    return isItFull;
})

app.delete("/api/clear", function(req, res) {

    reservation = [];
    waitingList = [];

})

app.listen(PORT, function(){
    console.log("app listening on PORT " + PORT);
});