import Express from 'express';



import timeRecordRouter from './routes/time_record_routes.js';
import livereload from 'livereload'
import connectlivereload from 'connect-livereload'

const port = process.env.PORT || 8080;
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const liveReloadServer = livereload.createServer();
liveReloadServer.watch("/Users/martinmurrer/Workspace/Spikes/TimeTracker/public");

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});




const app = new Express();
app.use(connectlivereload());

app.use(Express.json());

app.use(Express.static("public"));
app.use("/api/time-records", timeRecordRouter);

export default app;