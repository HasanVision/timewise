// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { db } from '../database.js'; // Adjust to your database location

// const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID']!;
// const GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET']!;

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback'
//   }, async (accessToken, refreshToken, profile, done) => {
//     try {
//       // Check if there’s already an account with the Google ID
//       const existingAccount = await db.account.findUnique({
//         where: {
//           provider_providerAccountId: {
//             provider: 'google',
//             providerAccountId: profile.id,
//           }
//         },
//         include: { User: true }
//       });
  
//       if (existingAccount) {
//         return done(null, existingAccount.User); 
//       }
  
//       // If not, create a new user and account
//       const newUser = await db.user.create({
//         data: {
//           firstname: profile.name?.givenName || '',
//           lastname: profile.name?.familyName || '',
//           email: profile.emails?.[0].value || '',
//           emailVerified: new Date(),
//           Account: {
//             create: {
//               provider: 'google',
//               providerAccountId: profile.id,
//               access_token: accessToken,
//               refresh_token: refreshToken,
//               expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry example
//               type: 'oauth'
//             }
//           }
//         },
//       });
  
//       return done(null, newUser);
//     } catch (err) {
//       return done(err);
//     }
//   }));

//   passport.deserializeUser(async (id, done) => {
//     try {
//       const userId = id as string; // Explicitly cast id to a string
//       const user = await db.user.findUnique({ where: { id: userId } });
  
//       if (user) {
//         done(null, user); // First argument is null (no error), second is the user object
//       } else {
//         done(new Error('User not found'), null); // Pass null as the user if not found
//       }
//     } catch (err) {
//       done(err, null); // Pass the error as the first argument
//     }
//   });