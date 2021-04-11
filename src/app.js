import Express from 'express';
import timeRecordRouter from './routes/time_record_routes.js';

const app = new Express();

app.use(Express.json());

app.use(Express.static("src/public"));
app.use("/api/time-records", timeRecordRouter);

export default app;