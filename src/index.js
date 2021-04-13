import app from './app.js';
import livereload from 'livereload'
import connectlivereload from 'connect-livereload'

const port = process.env.PORT || 8080;

app.listen(port, () => { console.log(`Listening on Port ${port}...`) });