import app from './app.js';
import livereload from 'livereload'
import connectlivereload from 'connect-livereload'

const port = process.env.PORT || 8080;
console.log("SERVER", process.env.MONGODB_SERVER);
app.listen(port, () => { console.log(`Listening on Port ${port}...`) });