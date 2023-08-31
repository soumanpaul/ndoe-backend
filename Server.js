import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 8080;

connectDB();
console.log("React app",process.env.clientUrl)
const app = express();



// Use CORS middleware with allowed origin
// app.use(cors({
//   origin: 'https://supm-assignment.vercel.app',
// }));

// // Set response headers
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  credentials: true
};
app.use(cors(corsOptions));
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,token');
  next();
}
app.use(allowCrossDomain);


app.get('/', (req, res) => {
  res.send('API is running....');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(0);
});




