const nodemailer = require("nodemailer");

// const sendEmail = (options) => {
//     const transporter = nodemailer.createTransport({
//         service: process.env.EMAIL_SERVICE,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     });

//     const mailOptions = {
//         from : process.env.EMAIL_FROM,
//         to : options.tom,
//         subject : options.subject,
//         html : options.text
//     }

//     transporter.sendMail(mailOptions, (err, data) => {
//         if (err) {
//             console.log("Error occurred".red, err);
//         } else {
//             console.log("Email sent".green);
//         }
//     });
// }

module.exports.sendEmail = (options) => {
    console.log('options', options);
    console.log('email', options.to)
    
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let details = {
        from: process.env.EMAIL_USER_ADDRESS,
        to: options.to,
        subject: options.subject,
        text: options.text
    };

    mailTransporter.sendMail(details, err => {
        if (err) {
            console.log("Error occured", err);
        } else {
            console.log("Email sent");
        }
    })
}

// module.exports.sendEmail;