require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


const nodemailer = require('nodemailer');




app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/mcpm', (req, res, next) => {
  res.sendFile(__dirname + "/views/index.html");
})




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/send', (req, res) => {
  console.log("sending mail .... ")
  console.log(req.body);

  const body = `<p>you have a new contact ! </p>
  <h2>details</h2>
  <ul>
  <li>Name : ${req.body.name}</li>
  <li>Email : ${req.body.email}</li>
  <li>Subject : ${req.body.subject}</li>
  <li>Message : ${req.body.message}</li>
  </ul>`
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let mailOptions = {
    from: 'mcpm@online.com',
    to: 'contact.mcpm@gmail.com',
    subject: 'MCPM ',
    html: body

  }

  transporter.sendMail(mailOptions, function (err, data) {

    if (err) {
      console.log('Error mail ', err)
      res.send('Error , try again');
    } else {

      console.log('mail sent ! ', err)
      res.send('email sent !');

    }

  })

})
app.listen(process.env.PORT || 3000, () => {

  console.log('RIM server is started do not close this prompt ...')
})