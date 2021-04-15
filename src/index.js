import app from './app.js';

const port = process.env.PORT || 8080;
console.log("MongoDB Server", process.env.MONGODB_SERVER);
app.listen(port, () => { console.log(`Listening on Port ${port}...`) });