const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/result"))
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let email = req.body.email;
    // let listID = "11366967ea";
    // let apiKey = "f3dadeaab16d5483607b86f3fe3e822f-us21";
    let url = "https://us21.api.mailchimp.com/3.0/lists/11366967ea"
    let data = {
        members: [
            {
                email_address: email,

                status: "subscribed",

                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                }

            }
        ]
    }

    let jsonData = JSON.stringify(data);


    let options = {
        auth: "john:f3dadeaab16d5483607b86f3fe3e822f-us21",
        method: "POST",
    }

    const request = https.request(url, options, (response) => {
        
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/result/200/200.html")
        }
        else if (response.statusCode === 401) {
            res.sendFile(__dirname + "/result/401/401.html")
        }
        else{
            res.sendFile(__dirname + "/result/404/404.html")
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();
    
})



app.listen(3000, () => {
    console.log("Server is running on port 3000...")
})

