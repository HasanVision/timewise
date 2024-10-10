
import { Resend } from "resend";



const resend = new Resend(process.env["RESEND_API_KEY"]);
const domain = process.env["DOMAIN"];

export const sendMagicLinkEmail = async (email: string, token: string) => {
    const magicLink = `${domain}/magic-link?token=${token}`;
  
    await resend.emails.send({
        from: "confirm@oxygen365.net",
      to: email,
      subject: "Your Magic Login Link",
      html: `<p>Click <a href="${magicLink}"> here </a> to log in to your account!</p>`,
    });
  };

  export const sendWelcomeEmail = async (email: string, firstName: string) => {
    try {
      const response = await resend.emails.send({
        from: "welcome@oxygen365.net", // Replace with your "from" email
        to: email,
        subject: 'Welcome to Timewise!',
        html: `<p>Hi ${firstName},</p>
               <p>Thank you for registering at Timewise! We're excited to have you on board.</p>
               <p>Best regards,<br>Timewise Team</p>`,
      });
      console.log(`Welcome email sent to ${email}: `, response);
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  };


  
export const sendResetPasswordEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${domain}/new-password?token=${token}`;

    await resend.emails.send({
        from: "reset-password@oxygen365.net",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}"> here </a> to reset your password!</p>`,

    })
}

// TODO: Email Verification: reset password and email verification are similar processes. Consider reusing the email verification logic for the reset password process.
// TODO: User Feedback: Improve the user interface to provide clear feedback during the verification process (e.g., loading spinners, success, and error messages).
// TODO: 	Email Verification Link: Update the verification email to include a meaningful link to guide users.
// TODO: Security Enhancements: Add security measures, such as token encryption or expiration checks, to ensure the verification process is secure.