import passport from "passport";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const isAuth = (req, res, done) => {
  return passport.authenticate("jwt", { session: false });
};

export const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user:process.env.NODEMAILER_SENDER_ADDRESS,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendMailReq = async ({ to, subject, html }) => {
  let info = await transporter.sendMail({
    from: process.env.NODEMAILER_SENDER_ADDRESS, // sender address
    to, // list of receivers
    subject,
    text: "",
    html, // html body
  });
  return info;
};
