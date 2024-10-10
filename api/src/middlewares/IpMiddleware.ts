import axios from 'axios';
import { db } from '../../../lib/database.js'; // Adjust the path to your Prisma setup
import { Request, Response, NextFunction } from 'express';

const fetchAndStoreIPInfo = async (req: Request, res: Response, next: NextFunction) => {

  let userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

  if (typeof userIP === 'string' && userIP.includes(',')) {
    userIP = userIP.split(',')[0].trim();
  }


  if (userIP === '127.0.0.1' || userIP === '::1') {
    userIP = '8.8.8.8'; 
  }

  // console.log(`User IP: ${userIP}`);

  if (!userIP) {
    console.log('Could not determine user IP');
    return next();
  }

  try {
    const response = await axios.get(`https://ipapi.co/${userIP}/json/`);

    const {
      ip, country_name = '', region = '', city = '', postal = null, latitude = 0,
      longitude = 0, timezone = '', org = null, in_eu = false, country = '',
      region_code = null, city_code = null, postal_code = null, timezone_name = null,
      currency = null, languages = null, country_code = ''
    } = response.data;

    if (!ip || !city || !country || !region) {
      // console.log('Missing required IP info fields');
      return next();
    }

    await db.iPInfo.create({
      data: {
        ip,
        network: response.data.network || null,
        version: response.data.version || null,
        city,
        country,
        country_name,
        country_code,
        region,
        region_code,
        postal,
        latitude,
        longitude,
        timezone,
        org,
        in_eu,
        asn: response.data.asn || null,
        country_code_iso3: response.data.country_code_iso3 || null,
        country_capital: response.data.country_capital || null,
        country_tld: response.data.country_tld || null,
        continent_code: response.data.continent_code || null,
        utc_offset: response.data.utc_offset || null,
        country_calling_code: response.data.country_calling_code || null,
        currency,
        currency_name: response.data.currency_name || null,
        languages,
        country_area: response.data.country_area || null,
        country_population: response.data.country_population || null
      }
    });

    // console.log('IP information saved successfully.');
  } catch (error) {
    console.error("Error fetching IP info: ", error);
  }

  next(); // Continue with the next middleware or route handler
};

export default fetchAndStoreIPInfo;

// TODO: when user has multiple devices