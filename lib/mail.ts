
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

export const sendPasswordResetSuccessEmail = async (email: string) => {
  try {
    await resend.emails.send({
      from: 'reset-password@oxygen365.net', // Adjust this to your verified sender email
      to: email,
      subject: 'Your Password Has Been Reset Successfully',
      html: `<p>Hello,</p>
             <p>This is to inform you that your password has been successfully reset.</p>
             <p>If you did not initiate this request, please contact support immediately.</p>
             <p>Thank you,</p>
             <p>Your Company Name</p>`
    });

    // console.log(`Password reset success email sent to ${email}`);
  } catch (error) {
    console.error('Error sending password reset success email:', error);
  }
};
export const sendSecondaryEmailVerification= async (email: string, token: string) => {
  const verificationLink = `${domain}/verify-secondary-email?token=${token}`;

  await resend.emails.send({
    from: "verify@oxygen365.net",
    to: email,
    subject: "Verify your secondary email",
    html: `<p>Click <a href="${verificationLink}"> here </a> to verify your secondary email!</p>`,
  });
}
export const sendIPAlertEmail = async (email: string, ipInfo: any) => {
  const emailContent = `
    <p>We detected a login from a new location:</p>
    <ul>
      <li><strong>IP Address:</strong> ${ipInfo.ip}</li>
      <li><strong>Location:</strong> ${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country_name}</li>
      <li><strong>Organization:</strong> ${ipInfo.org || 'Unknown'}</li>
      <li><strong>Timezone:</strong> ${ipInfo.timezone}</li>
    </ul>
    <p>If this was you, no further action is needed. If not, please contact support immediately.</p>
  `;

  await resend.emails.send({
    from: "security@oxygen365.net",
    to: email,
    subject: 'New Login from Unfamiliar Location',
    html: emailContent,
  });
};

// TODO: User Feedback: Improve the user interface to provide clear feedback during the verification process (e.g., loading spinners, success, and error messages).
// TODO: 	Email Verification Link: Update the verification email to include a meaningful link to guide users.
// TODO: Security Enhancements: Add security measures, such as token encryption or expiration checks, to ensure the verification process is secure.