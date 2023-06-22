const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let email = req.body.email;
    res.write(fName)
    res.write(lName)
    res.write(email)
    res.send()
})

app.listen(3000, () => {
    console.log("Server is running on port 3000...")
})

