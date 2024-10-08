
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

// export const sendVerificationEmail = async (
//     email: string,
//     token: string,

// ) => {
//     const confirmLink = `${domain}/verify-token?token=${token}`;

//     await resend.emails.send({
//         from: "confirm@oxygen365.net",
//         to: email,
//         subject: "Confirm your email",
//         html: `<p>Click <a href="${confirmLink}"> here </a> to confirm your email!</p>`,
//     })
// }

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