import Data from "../model/data.model.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();



async function sendEmail(rEmail, rName) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable for username
        pass: process.env.EMAIL_PASSWORD // Use environment variable for password
      }
    });

    const receiver = {
      from: process.env.EMAIL_USER, // Use environment variable for sender email
      to: rEmail,
      subject: 'Thanks for Enquiry',
      text: `Hello ${rName}, we have received your query we get back to you ASAP
      thanks for visiting`
    };

    const info = await transporter.sendMail(receiver);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}



export const getData = async (req, res) => {
  try {
    const { name, email, query, status } = req.body;
    console.log("req.body");
    sendEmail(email, name);
    res.status(201).json({ message: "email sent propelry" });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Load environment variables securely





