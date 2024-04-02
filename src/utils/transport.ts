import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pengmaleap@gmail.com",
    pass: "rpigwegdfbioifxo",
  },
});
