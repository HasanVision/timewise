
import { Resend } from "resend";



const resend = new Resend(process.env["RESEND_API_KEY"]);
const domain = process.env["DOMAIN"];

export const sendVerificationEmail = async (
    email: string,
    token: string,

) => {
    const confirmLink = `${domain}/`;

    await resend.emails.send({
        from: "confirm@oxygen365.net",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}"> here </a> to confirm your email!</p>`,
    })
}