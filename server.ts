// import { APP_BASE_HREF } from '@angular/common';
// import { CommonEngine } from '@angular/ssr';
// import express from 'express';
// import { fileURLToPath } from 'node:url';
// import { dirname, join, resolve } from 'node:path';
// import bootstrap from './src/main.server';

// // The Express app is exported so that it can be used by serverless Functions.
// export function app(): express.Express {
//   const server = express();
//   const serverDistFolder = dirname(fileURLToPath(import.meta.url));
//   const browserDistFolder = resolve(serverDistFolder, '../browser');
//   const indexHtml = join(serverDistFolder, 'index.server.html');

//   const commonEngine = new CommonEngine();

//   server.set('view engine', 'html');
//   server.set('views', browserDistFolder);

//   // Example Express Rest API endpoints
//   // server.get('/api/**', (req, res) => { });
//   // Serve static files from /browser
//   server.get('**', express.static(browserDistFolder, {
//     maxAge: '1y',
//     index: 'index.html',
//   }));

//   // All regular routes use the Angular engine
//   server.get('**', (req, res, next) => {
//     const { protocol, originalUrl, baseUrl, headers } = req;

//     commonEngine
//       .render({
//         bootstrap,
//         documentFilePath: indexHtml,
//         url: `${protocol}://${headers.host}${originalUrl}`,
//         publicPath: browserDistFolder,
//         providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
//       })
//       .then((html) => res.send(html))
//       .catch((err) => next(err));
//   });

//   return server;
// }

// function run(): void {
//   const port = process.env['PORT'] || 4000;

//   // Start up the Node server
//   const server = app();
//   server.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// run();




import express, { Request, Response } from 'express';
import { db } from './lib/database.js'; 
import UserRoute from './api/src/users/authRoute.js'; 
import cors from 'cors';



const app = express();
const port = 4000;

// Middleware for parsing JSON bodies
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],
  credentials: true,
}))
app.options('*',cors())  //When you send a PUT request, browsers often send a preflight request (an OPTIONS request) to check the allowed methods on the server. 
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
  console.log('Request Body:', req.body);
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

// // TODO: implement callback for routes that require authentication