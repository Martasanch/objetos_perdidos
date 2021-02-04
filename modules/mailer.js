const nodemailer = require("nodemailer");
const fs = require('fs')

const mailer={}

mailer.send = function send(destinatario) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'proyectoyana@gmail.com', // generated ethereal user
      pass: 'Fullstack#01', // generated ethereal password
    },
  });

/*   // send mail with defined transport object
  mailer.getTemplate(template)
    .then(datos=> */
        transporter.sendMail({
            from: '"Fred Foo" <foo@example.com>', // sender address, puedo poner lo que yo quiera aunque no exista
            to: destinatario, // list of receivers
            subject: "Registro confirmado", // Subject line
            text: "Se ha registrado en la oficina de objetos perdidos", // plain text body
            html: "<h1>activar tu cuenta</h1>"
          })
 /*    ) */
  
}

mailer.getTemplate= async function getTemplate(template){
    return fs.readFileSync('./modules/mailer-templates/' + template + '.html','utf8')
}

module.exports=mailer
