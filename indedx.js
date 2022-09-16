const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourgmailaccount@gmail.com', //coloque seu email aqui Mandiiinha ^^
        pass: 'yourgmailaccpassword' //e aqui sua senha
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const dest = req.query.dest;
        const code = req.query.code;

        const mailOptions = {
            from: 'Your Account Name <yourgmailaccount@gmail.com>', // Coloque seu nome e email aqui, tipo: Mandinha Cleto <mandinha.cleto@gmail.com>
            to: dest,
            subject: 'Recuperação de senha', // Assunto do email
            html: `<p style="font-size: 16px;">Olá, você fez uma requisição de reset de senha no app da Mandinha!</p>
                <br />
                <p>Aqui está o seu código: </p><strong>${code}</strong>
            ` // Pode melhorar esse texto 100%
        };

        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});