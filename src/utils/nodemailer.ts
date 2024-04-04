import { transport } from "./transport";

export async function nodemailer (email: string, token: string) {
  const mailOptions = {
    from: "pengmaleap2@gmail.com", // Replace with your sender email
    to: email,
    subject: "Verify Your Email Address",
    text: `Click on this link to verify your email : http://localhost:3000/user/verify?token=${token}`,
  };

  await transport.sendMail(mailOptions);
}