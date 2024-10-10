import axios from 'axios';
import { db } from '../../../lib/database.js';
import { Request, Response, NextFunction } from 'express';
import { sendIPAlertEmail } from '../../../lib/mail.js'; // Import email sending service
import {  JwtPayload } from 'jsonwebtoken';

const fetchAndCompareIP = async (req: Request, res: Response, next: NextFunction) => {
  const userIP = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const user = req.user as JwtPayload;

   if (!user || !user['id']) {
    console.error('User not authenticated or missing ID.');
     res.status(401).json({ message: 'User not authenticated' });
     return;
  }

  const userId = user['id'];

  

  try {
    const response = await axios.get(`https://ipapi.co/${userIP}/json/`);
    const ipInfo = response.data;

    // Fetch user's previous IPs from the database
    const previousIPs = await db.iPInfo.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },

      take: 5, // Fetch the last 5 IP entries
    });

    const isNewIP = !previousIPs.some((prevIP) => prevIP.ip === ipInfo.ip);

    if (isNewIP) {
      // Log the new IP to the database
      await db.iPInfo.create({
        data: {
          ip: ipInfo.ip,
          userId: userId,
          country_name: ipInfo.country_name,
          country_code: ipInfo.country_code,
          city: ipInfo.city,
          region: ipInfo.region,
          in_eu: ipInfo.in_eu,
          latitude: ipInfo.latitude,
          longitude: ipInfo.longitude,
          timezone: ipInfo.timezone,
          org: ipInfo.org,
          country: ipInfo.country,
        }
      });

      // Send alert email to the user
      await sendIPAlertEmail(user['email'], ipInfo);
      // TODO not sure if this is the right way to pass the email and ipInfo to the function
    }
  } catch (error) {
    console.error('Error fetching or comparing IP info:', error);
  }

  next(); // Continue to the next middleware or route handler
};

export default fetchAndCompareIP;