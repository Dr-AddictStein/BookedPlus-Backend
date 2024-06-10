import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: "early@bookedplus.com",
    pass: "alub ldwm ouxh eyuw",
  },
});

export const sendWelcomeEmail = async (to, fullName) => {
  console.log("Here : SEND: ", to);
  const subject = "Thank You for Joining the BookedPlus Waitlist!";
  const emailContent = `
    <p>Dear ${fullName},</p>
    <p>Thank you for joining the BookedPlus waitlist! We're excited to have you on board and appreciate your interest in our platform.</p>
    <p>By signing up, you have automatically enrolled in a 3-month free trial of BookedPlus at the time of our release. Additionally, you now have a chance to win a 6-month free trial if selected from our random poll. On the release date, we will choose 10 lucky waitlist members for this special offer.</p>
    <p>We look forward to providing you with a seamless and efficient online catering reservation experience. In the meantime, feel free to <a href="https://bookedplus.com/blogs">visit BookedPlus Learn</a> where we regularly post blogs about the benefits of switching to an online reservation platform while still keeping phone reservations available.</p>
    <p>Thank you once again for your support. If you have any questions, please don't hesitate to reach out.</p>
    <p>Best regards,</p>
    <p>Faraz</p>
    <p>Founder, BookedPlus</p>
  `;

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"BookedPlus" <your-email@gmail.com>',
      to: to,
      subject: subject,
      html: emailContent,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendForgotPasswordEmail = async (to) => {
  const subject = "Verification of Your Admin Credintials...";
  const emailContent = `
    <p>Dear Admin,</p>
    <p>Your email has been verified and you are recognized as the Admin.</p>
    <p>Thank you for letting us know that you have forgotten your password.</p>
    <p>Thank you for joining the BookedPlus waitlist! We're excited to have you on board and appreciate your interest in our platform.</p>
    <p><a href="http://bookedplus.com/665d7c66148427685bf468df">Click here</a> to Set up a new Password</p>
    <p>Thank you once again for your support. If you have any questions, please don't hesitate to reach out.</p>
    <p>Best regards,</p>
    <p>Faraz</p>
    <p>Founder, BookedPlus</p>
  `;

  try {
    let info = await transporter.sendMail({
      from: '"BookedPlus" <your-email@gmail.com>',
      to: to,
      subject: subject,
      html: emailContent,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
