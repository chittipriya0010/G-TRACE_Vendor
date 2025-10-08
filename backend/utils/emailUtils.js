// C:\Users\User\Desktop\login-production\backend\utils\emailUtils.js

import nodemailer from 'nodemailer';

// IMPORTANT: Configure your email service credentials using environment variables
// (e.g., in a .env file: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS)

const sendEmail = async (options) => {
  // 1. Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // Use your email service host (e.g., 'smtp.gmail.com', 'smtp.sendgrid.net')
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email', 
    // Use the appropriate port (e.g., 465 for SSL, 587 for TLS)
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || 'placeholder@ethereal.email', // Your actual email address
      pass: process.env.EMAIL_PASS || 'your-email-password', // Your actual email password/app key
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `Your App Name <${process.env.EMAIL_USER || 'placeholder@ethereal.email'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html, // Uncomment if you want to send HTML emails
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

export { sendEmail };