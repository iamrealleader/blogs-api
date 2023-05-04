const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/contact', function(req, res) {
  try {
    const {email,subject,message} = req.body;
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      secure: true,
    })
    const mailData = {
      from: email ,
      to: process.env.EMAIL,
      subject: subject,
      text: message,
      html: `<div>${message}</div><h2>Sent from:
      ${email}</h2>`
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info)
    })
    res.status(200).json({success  : true , msg : "Message Send succesfully"});
   
} catch (error) {
  res.status(200).json({success  : false , msg : "Some error has occurred!"});
}
});

module.exports = router;