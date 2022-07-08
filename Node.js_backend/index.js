const bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
require('dotenv').config()

app.use(cors())

const PORT = process.env.PORT || 3001
const connectDB = require('./config/db')
const Inbox = require('./userModel')

//conect to database
connectDB()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }))
const from = process.env.PHONE_NUMBER;
const accountSid = process.env.TOKEN_SID;
const authToken = process.env.TOKEN_SECRET;
const twilio = require('twilio')(accountSid, authToken);
// const to = process.env.MY_NUMBER;

// const twilio = require('twilio')(
//     process.env.TOKEN_SID,
//     process.env.TOKEN_SECRET,
//     {
//         accountSid: process.env.ACCOUNT_SID
//     }
// )
// Run server to listen on port 3000.
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POSt"]
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        socket.broadcast.emit("reveive_message", data)
    })
})

server.listen(PORT, () => {
    console.log(`port is listening on ${PORT}`);
})

app.post('/api/sendsms', async (req, res) => {
    try {
        let smsdata = await twilio.messages
            .create({
                body: req.body.Body,
                to: req.body.To,
                from: from,
            })

        console.log(smsdata);

        var inbox = new Inbox({
            MessageSid: smsdata.sid,
            message: smsdata.body,
            to: smsdata.to,
            Twilio_number: smsdata.from,
            type: "send"
        });
        console.log(inbox)
        data = await inbox.save()
        res.send(data)
    } catch (error) {
        return {
            error: true,
            statusCode: 500,
            message: error.message
        };
    }
})

app.post('/api/reciveSms', async (req, res) => {
    try {
        const inbox = new Inbox({
            MessageSid: req.body.SmsSid,
            message: req.body.Body,
            to: req.body.From,
            Twilio_number: req.body.To,
            type: req.body.SmsStatus

        })


        data = await inbox.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result)
            }
        })
        res.send(data)

    } catch (error) {
        return {
            error: true,
            statusCode: 400,
            message: error.message
        };
    }
    console.log("massage is resive");
})


app.post('/api/getsms', async (req, res) => {
    try {
        let messages = await Inbox.find({ to: req.body.to });
        // console.log(messages)
        res.send(messages);

    } catch (error) {
        console.log(error)
        return {
            error: true,
            statusCode: 500,
            message: 'Error'
        };
    }
})


app.get('/api/getNumber', async (req, res) => {
    try {
        let data = await Inbox.aggregate([
            {
                $group: {
                    _id: "$to",
                    message: { $last: "$message" },
                    createdAt: { $first: "$createdAt" },
                }
            }
        ])
        // console.log(data)
        res.send(data)
    } catch (error) {
        return {
            error: true,
            statusCode: 500,
            message: 'Error'
        }
    }

})

// function sendSms() {
//     twilio.messages.create({
//         from,
//         to,
//         body: "hello from twilio"
//     })
//         .then(message => console.log(`message sent with sid ${message.sid}`))
//         .catch(error => console.error(error))

// }

// sendSms()

