//Express
var express         = require('express')
var app             = express();

//Port
const port          = process.env.POST || 3000;
let http            = require('http');

let server          = http.Server(app);

var nodemailer      = require("nodemailer");
var ejs             = require('ejs');
var fs              = require('fs');
var template        = fs.readFileSync('./email.html',{encoding:'utf-8'});

//Test API Call
app.get('/send/mail', (req, res) => {

    var mail_data = {
        "to": 'ab@ab.com',
        "subject": "Hello World",
        "msg": "My First Message"
    }

    var transport = nodemailer.createTransport({
        host: "yourhost.com",
        port: 465,
        secure: true,
        auth: {
            user: "name@yourhost.com",
            pass: "password" 
        }            
    });

    var mailOptions = {
        from: '"From Name" <form@yourhost.com>',
        to: mail_data.to,
        subject: mail_data.subject,
        html: ejs.render(template, {'msg': mail_data.msg })
    };   

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });  


    res.json({
        'success': true,
        'match': true
    });
});


//Listening
server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
