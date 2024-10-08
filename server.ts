import express, { Request, Response } from 'express';
import { db } from './lib/database.js'; 
import UserRoute from './api/src/users/authRoute.js'; 
import cors from 'cors';


const app = express();
const port = 4000;

// Middleware for parsing JSON bodies
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());
app.use('/api', UserRoute);


// Middleware for logging request information
app.use((req, res, next) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    req.body = data;
    next();
  });

  app.post('/test', (req, res) => {
    // console.log('Request Body:', req.body);
    res.json({ message: 'Received', body: req.body });
  });

  // console.log('Request Method:', req.method);
  // console.log('Request Headers:', req.headers);
  // console.log('Request Body:', req.body);
  next();
});


// Simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

async function run() {
  try {
    // console.log('Connecting to the database...');
    // await db.$queryRaw`SELECT 1;`;
    // console.log('Database connection is responsive');
    await db.$connect(); 
    console.log('Database connected successfully!');

    app.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
      // console.log('File exists:', fs.existsSync('./lib/database.ts'));
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); 
  }
}

run();