import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';

export default class MongoTimeRecordRepository {

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

    findAll() {
        return this.TimeRecord.find().then(records => {
            console.log(records);
            var result = records.map(result => {
                console.log("--------------\n", result);
                return {
                    id: MUUID.from(result._id).toString(),
                    start: result.start,
                    end: result.end,
                    tag: result.tag,
                    comment: result.comment
                }
            });
            console.log(result);
            return result;
        });
    }

    save(timeRecord) {
        return this.TimeRecord({
            _id: timeRecord.id ? MUUID.from(timeRecord.id) : MUUID.v4(),
            start: timeRecord.start,
            end: timeRecord.end,
            tag: timeRecord.tag,
            comment: timeRecord.comment
        }).save().then(result => {
            console.log("MAPPING");
            return {
                id: MUUID.from(result._id),
                start: result.start,
                end: result.end,
                tag: result.tag,
                comment: result.comment
            }
        });
    }
}