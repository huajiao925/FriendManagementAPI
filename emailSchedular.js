let nodemailer = require('nodemailer');
let cron = require('node-cron');

let mailOptions = {
    from: 'lyrali917@gmail.com',
    to: '<TO_EMAIL_ADDRESS>',
    subject: 'Here is your daily post updates',
    text: 'Some content to send'
};
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lyrali917@gmail.com',
      pass: '<FROM_EMAIL_PASSWORD>'
    }
});
cron.schedule('0 12 * * *', () => {
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});
});