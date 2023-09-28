import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

app.use(express.json());
app.use(cors());

app.post('/', async (req, res) => {
   try {
    const { name, phone, email, link, vacancie } = req.body;

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Отклик на вакансию ${vacancie}`,
        html:`<p>Здравствуйте. Пришел отклик на вакансию: <strong>${vacancie}</strong></p>
            <p>Имя кандидата: <strong>${name}</strong></p>
            <p>Телефон: <strong>${phone}</strong></p>
            <p>E-mail при наличии: ${email}</p>
            <p>Ссылка на резюме при наличии: ${link}</p>`
    });

    res.send('Сообщение отправлено');

   } catch(error) {
    console.error(error);
    res.status(500).send(error.message);

   }
})







app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Сервер запущен. PORT:${PORT}`);
})