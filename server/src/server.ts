import express from 'express';
import cors from 'cors';

const searchRoutes = require('./routes/search.route');

const app = express();

const port = process.env.PORT || 8080; // Get the port from environment variable or use 3000 as default

app.use(express.json());

app.use(cors());

// Register the search routes
app.use('/search', searchRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
