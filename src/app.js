import Express from 'express';
import timeRecordRouter from './routes/time_record_routes.js';

const app = new Express();

app.use(Express.json());

app.use("/api/time_records", timeRecordRouter);

export default app;