import dotenv from "dotenv";
dotenv.config();

import { sendWelcomeEmail } from "./services/emailService.js";

async function main() {
  console.log("🚀 Sending test email via Resend...");
  console.log("From:", process.env.EMAIL_FROM);
  console.log("To: Oluyemiboluwatifepeter@gmail.com");
  console.log("Slack Invite:", process.env.SLACK_INVITE_URL);

  try {
    const result = await sendWelcomeEmail({
      to: "Adeniyipeter999@gmail.com",
      name: "Boluwatife Peter",
      track: "Backend Engineering with Node.js",
      order: 1,
      tier: "Cohort 1.0",
      amount: 15000,
      reference: `test_bb_${Date.now()}`
    });
    console.log("✅ Success! Email dispatched. Result:", result);
    console.log("📬 Check your inbox at Adeniyipeter999@gmail.com (and spam folder)!");
  } catch (err) {
    console.error("❌ Email failed to send:", err.message);
  }
}

main();

