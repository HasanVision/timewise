import axios from 'axios';
import { db } from '../../../lib/database.js'; 
import { Request, NextFunction } from 'express';
import { CustomJwtPayload } from '../../../types/custom';

const fetchAndStoreIPInfo = async (req: Request, _: any, next: NextFunction) => {
  try {
    let userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    // If the IP is a list (comma-separated), take the first one
    if (typeof userIP === 'string' && userIP.includes(',')) {
      userIP = userIP.split(',')[0].trim();
    }

    // For localhost, use a public IP for testing
    if (userIP === '127.0.0.1' || userIP === '::1') {
      userIP = '8.8.8.8'; // Public IP for development
    }

    if (!userIP) {
      console.log('No user IP found in the request');
      return next();
    }

    const user = req.user as CustomJwtPayload;
    if (!user || !user.id) {
      console.log('No user found in the request');
      return next();
    }

    const userId = user.id;

    // Fetch IP data from ipapi.co
    const response = await axios.get(`https://ipapi.co/${userIP}/json/`);
    const {
      ip, country_name = '', region = '', city = '', postal = null, latitude = 0,
      longitude = 0, timezone = '', org = null, in_eu = false, country = '',
      region_code = null, postal_code = null, currency = null, country_code = ''
    } = response.data;

    // Validate essential IP data fields
    if (!ip || !city || !country || !region) {
      console.log('Missing required IP info fields');
      return next();
    }

    // Check if the IP already exists for the user
    const existingIP = await db.iPInfo.findFirst({
      where: { userId, ip }
    });

    if (!existingIP) {
      // If the IP doesn't exist, create a new entry
      await db.iPInfo.create({
        data: {
          ip, userId, city, country, country_name, country_code, region,
          region_code, postal, latitude, longitude, timezone, org, in_eu,
          asn: response.data.asn || null,
          country_code_iso3: response.data.country_code_iso3 || null,
          country_capital: response.data.country_capital || null,
          country_tld: response.data.country_tld || null,
          continent_code: response.data.continent_code || null,
          utc_offset: response.data.utc_offset || null,
          country_calling_code: response.data.country_calling_code || null,
          currency, currency_name: response.data.currency_name || null,
          languages: response.data.languages || null,
          country_area: response.data.country_area || null,
          country_population: response.data.country_population || null
        }
      });
      console.log('IP information saved successfully.');
    } else {
      // Update existing record only if location fields have changed
      const locationChanged = existingIP.city !== city || existingIP.region !== region;
      if (locationChanged) {
        await db.iPInfo.update({
          where: { id: existingIP.id },
          data: {
            city, region, country, country_name, region_code, postal,
            latitude, longitude, timezone, org, in_eu
          }
        });
        console.log(`IP information updated with new location: ${city}, ${region}, ${country}`);
      } else {
        console.log('IP already exists for user with no significant location changes.');
      }
    }

  } catch (error) {
    console.error('Error fetching IP info:', error);
  }
  next(); // Continue to the next middleware or route handler
};

export default fetchAndStoreIPInfo;

// TODO: CODE ABOVE IS WORKING, BUT NEEDS TO BE TESTED FURTHER
// TODO: CODE BELOW WORKS BUT DOES NOT UPDATE THE IP INFO IF THE LOCATION CHANGES
// TODO: UPDATE THE USER VIA EMAIL IF THE LOCATION CHANGES


// import axios from 'axios';
// import { db } from '../../../lib/database.js'; 
// import { Request, NextFunction } from 'express';
// import { CustomJwtPayload } from '../../../types/custom';

// const fetchAndStoreIPInfo = async (req: Request, _: any, next: NextFunction) => {
//   let userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

//   if (typeof userIP === 'string' && userIP.includes(',')) {
//     userIP = userIP.split(',')[0].trim();
//   }

//   if (userIP === '127.0.0.1' || userIP === '::1') {
//     userIP = '8.8.8.8'; // Default for localhost during development
//   }

//   if (!userIP) {
//     console.log('No user IP found in the request');
//     return next();
//   }

//   const user = req.user as CustomJwtPayload;
//   if (!user || !user.id) {
//     console.log('No user found in the request');
//     return next();
//   }

//   const userId = user.id;

//   try {
//     const response = await axios.get(`https://ipapi.co/${userIP}/json/`);

//     const {
//       ip, country_name = '', region = '', city = '', postal = null, latitude = 0,
//       longitude = 0, timezone = '', org = null, in_eu = false, country = '',
//       region_code = null, postal_code = null, currency = null, country_code = ''
//     } = response.data;

//     if (!ip || !city || !country || !region) {
//       console.log('Missing required IP info fields');
//       return next();
//     }

//     // Check if the IP already exists for the user
//     const existingIP = await db.iPInfo.findFirst({
//       where: {
//         userId,
//         ip
//       }
//     });

//     if (!existingIP) {
//       // If IP does not exist, create new entry
//       await db.iPInfo.create({
//         data: {
//           ip,
//           userId,
//           city,
//           country,
//           country_name,
//           country_code,
//           region,
//           region_code,
//           postal,
//           latitude,
//           longitude,
//           timezone,
//           org,
//           in_eu,
//           asn: response.data.asn || null,
//           country_code_iso3: response.data.country_code_iso3 || null,
//           country_capital: response.data.country_capital || null,
//           country_tld: response.data.country_tld || null,
//           continent_code: response.data.continent_code || null,
//           utc_offset: response.data.utc_offset || null,
//           country_calling_code: response.data.country_calling_code || null,
//           currency,
//           currency_name: response.data.currency_name || null,
//           languages: response.data.languages || null,
//           country_area: response.data.country_area || null,
//           country_population: response.data.country_population || null
//         }
//       });
//       console.log('IP information saved successfully.');
//     } else {
//       console.log('IP already exists for user.');
//       // console.log(`IP already exists for user with IP: ${ip} in ${existingIP.city}, ${existingIP.country}`);
//     }
//   } catch (error) {
//     console.error("Error fetching IP info:", error);
    
//   }

//   next(); // Continue to the next middleware or route handler
// };

// export default fetchAndStoreIPInfo;




// TODO: when user has multiple devices