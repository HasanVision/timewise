// import { db } from '../../database.js'; // Adjust to your setup

// export async function cleanExpSecEmailsAndTokens() {
//   const now = new Date();

//   try {
//     // Delete expired tokens
//     await db.secondaryEmailMagicLinkToken.deleteMany({
//       where: {
//         expires: { lte: now },
//       },
//     });

//     // Delete users with unverified secondary emails and no tokens
//     await db.user.updateMany({
//       where: {
//         secondaryEmailVerified: null,
//         secondaryEmail: { not: null },
//         secondaryEmailToken: { none: {} },
//       },
//       data: {
//         secondaryEmail: null,
//       },
//     });

//     console.log("Expired tokens and unverified emails cleaned up successfully.");
//   } catch (error) {
//     console.error("Error cleaning up expired tokens and emails:", error);
//   }
// }