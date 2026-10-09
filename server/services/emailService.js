import { Resend } from "resend";

const escapeHtml = (s = "") =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c])
  );

/**
 * Sends a welcome & Slack invite email to a student upon successful payment.
 */
export async function sendWelcomeEmail({
  to,
  name,
  track,
  order,
  tier = "Standard",
  amount,
  reference,
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Skipping welcome email.");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const naira = Number(amount).toLocaleString("en-NG");
  const fromEmail = process.env.EMAIL_FROM || "Builder Bootcamp <support@builderbootcamp.com.ng>";
  const replyTo = process.env.REPLY_TO_EMAIL || "builderbootcamp@gmail.com";
  const slackUrl = process.env.SLACK_INVITE_URL || "#";

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      replyTo,
      subject: "You're in! Builder Bootcamp 1.0 – Payment confirmed",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;line-height:1.5;color:#333;">
          <h2 style="color:#111;">Builder Bootcamp 1.0</h2>
          <p style="color:#666;">Registration Confirmation &amp; Next Steps</p>

          <p>Hi ${escapeHtml(name)},</p>
          <p>Welcome to Builder Bootcamp 1.0! Your payment was successful and your spot in the
          <strong>${escapeHtml(track)}</strong> track is confirmed.</p>

          <h3>💳 Payment Details</h3>
          <ul style="padding-left:20px;">
            <li>Submission Order: Response #${escapeHtml(order)}</li>
            <li>Tier: ${escapeHtml(tier)}</li>
            <li>Amount Paid: ₦${naira}</li>
            <li>Reference: ${escapeHtml(reference)}</li>
          </ul>

          <h3>💬 Join Our Slack Community</h3>
          <p>Connect with mentors, track leads, and other builders:</p>
          <p style="margin:20px 0;">
            <a href="${slackUrl}"
               style="background:#4a154b;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
               Join Builder Bootcamp 1.0 on Slack
            </a>
          </p>

          <p style="color:#666;font-size:13px;margin-top:30px;">
            If you don't see this email, check your spam folder.<br/>
            Questions? Just reply directly to this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error(`Error sending welcome email to ${to}:`, error.message);
      throw new Error(error.message || "Failed to send welcome email");
    }

    console.log(`Welcome email sent to ${to} (ID: ${data?.id || "ok"})`);
    return data;
  } catch (error) {
    console.error(`Error sending welcome email to ${to}:`, error.message);
    throw error;
  }
}