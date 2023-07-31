import express from 'express';
import cors from 'cors';

const searchRoutes = require('./routes/search.route');

const app = express();

app.use(express.json());
app.use(cors());

// Register the search routes
app.use('/search', searchRoutes);

export default app;
