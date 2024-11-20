/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 */

const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");
const logger = require("firebase-functions/logger");

// Email transporter configuration using Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use Gmail; you can change this to another service
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email's app password
  },
});

// Welcome email template
const getWelcomeEmailTemplate = (name) => `
  <html>
    <body>
      <h2>Welcome, ${name}!</h2>
      <p>We are thrilled to have you onboard. Feel free to explore and let us know if you have any questions!</p>
      <p>Best regards, <br> The Team</p>
    </body>
  </html>
`;

/**
 * Firestore trigger to send a welcome email on user creation
 */
exports.sendWelcomeEmail = onDocumentWritten(
  { document: "users/{userId}" }, // Firestore path to monitor
  async (event) => {
    const { before, after } = event.data;

    // If a new document is created
    if (!before.exists && after.exists) {
      const userData = after.data();
      const { name, email } = userData;

      if (!email || !name) {
        logger.error("Missing required fields: name or email");
        return;
      }

      // Email options
      const mailOptions = {
        from: "your-email@gmail.com", // Sender's email address
        to: email, // Recipient's email address
        subject: "Welcome to Our Platform!",
        html: getWelcomeEmailTemplate(name), // Use the HTML template
      };

      try {
        // Send email
        await transporter.sendMail(mailOptions);

        // Log success
        logger.info(`Welcome email sent to ${email}`);
        await after.ref.update({ emailSent: true }); // Update Firestore document
      } catch (error) {
        // Log error
        logger.error(`Failed to send email to ${email}:`, error);
        await after.ref.update({ emailSent: false, error: error.message });
      }
    }
  }
);

/**
 * Hello World example function
 */
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
