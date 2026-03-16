import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }
    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email Service Failed silently. make sure that you have provided your mailtrap credentials in the .env file")
        console.error("Error: ", error);
    }
}


const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "welcome to our app! we're excited to have you on board.",
            action: {
                instructions: "to verify your email please click on the following button",
                button: {
                    color: "#22BC66",
                    text: "verify your email",
                    link: verificationUrl
                },
            },
            outro: "need help, or have question? just reply to this email, we'd love to help",
        },
    };
};

const ForgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "we got a request to reset the password of your account",
            action: {
                instructions: "to reset your password click on the following button or link",
                button: {
                    color: "#ca1212",
                    text: "reset password",
                    link: passwordResetUrl
                },
            },
            outro: "need help, or have question? just reply to this email, we'd love to help",
        },
    };
};

export {
    emailVerificationMailgenContent,
    ForgotPasswordMailgenContent, sendEmail
};