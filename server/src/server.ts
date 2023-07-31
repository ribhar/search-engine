import app from './app';

const port = process.env.PORT || 8080; // Get the port from environment variable or use 8080 as default

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
