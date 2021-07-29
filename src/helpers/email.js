const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "Gmail",
    auth: {
        user: 'iniemailbuatngetes@gmail.com', // generated ethereal user
        pass: 'NoProblemo99', // generated ethereal password
    }
});

const sendEmail = () => {
    return new Promise(async(resolve, reject) => {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'iniemailbuatngetes@gmail.com', // sender address
            to: "iniemailbuatngetes@gmail.com", // list of receivers
            subject: "Welcome To Blanja.com", // Subject line
            // text: "Hello world?", // plain text body
            // html: `<!DOCTYPE html>
            // <html lang="en">
            // <head>
            //     <meta charset="UTF-8">
            //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
            //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //     <title>Document</title>
            // </head>
            // <body>
            //     <h3>klik <a href="http://localhost:4000/v1/category">disini</a> untuk melihat all category</h3>
            // </body>
            // </html>` // html body
            html: `<h3>Thank you for registering. klik <a href="http://localhost:4000/v1/category">disini</a> untuk melihat all category</h3>`
        });
        resolve(info)
    })

}

module.exports = {
    sendEmail
}