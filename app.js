const express = require("express");
const app = express();
const ExpressError = require("./expressError");

// app.use((req,res,next)=>{
//     console.log("Hi, I am middleware")
//     next();
// })

const checktokken = (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        next();
    }
    throw new ExpressError(401, "ACCESS DENIED!")
};

app.get("/api", checktokken, (req, res) => {
    res.send("data");
})

app.get("/", (req, res) => {
    res.send("Hi, I am root.")
})

app.get("/random", (req, res) => {
    res.send("This is random page")
})

app.get("/err", (req, res) => {
    abcd = abcd;
})

app.get("/admin",(req,res)=>{
    throw new ExpressError(403,("Access to admin is Forbidden"))
})

app.use((err, req, res, next) => {
    let { status, message } = err;
    res.status(status).send(message);

})

app.use((req, res) => {
    res.status(404).send("page not found")
})

app.listen(8080, () => {
    console.log("server listening to port 8080")
})