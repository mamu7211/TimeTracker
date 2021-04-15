import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';

export default class MongoRepo {

    constructor() {
        const password = process.env.MONGODB_PWD
        const server = process.env.MONGODB_SERVER
        var uri = `mongodb+srv://time:${password}@${server}/TimeTracker?retryWrites=true&w=majority`;
        console.log(uri);
        mongoose.connect(`mongodb+srv://time:${password}@${server}/TimeTracker?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

        );

        const timeRecordSchema = new mongoose.Schema({
            _id: { type: String, default: MUUID.v4 },
            start: mongoose.Schema.Types.Date,
            end: mongoose.Schema.Types.Date,
            tag: String,
            comment: String
        });

        this.TimeRecord = mongoose.model('TimeRecord', timeRecordSchema);

    }
}
