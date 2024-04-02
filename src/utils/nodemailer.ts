import { transport } from "./transport";

export async function nodemailer (email: string, token: string) {
  const mailOptions = {
    from: "pengmaleap2@gmail.com", // Replace with your sender email
    to: email,
    subject: "Verify Your Email Address",
    text: `Click on this link to verify your email : https://www.youtube.com/watch?v=dJ9uVVNWClk?token=${token}`,
  };

  await transport.sendMail(mailOptions);
}