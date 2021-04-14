import mongoose from 'mongoose';

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
            _id: mongoose.Schema.Types.ObjectId,
            start: mongoose.Schema.Types.Date,
            end: mongoose.Schema.Types.Date,
            tag: String,
            comment: String
        });

        this.TimeRecord = mongoose.model('TimeRecord', timeRecordSchema);
    }

    findAll() {
        return this.TimeRecord.find();
    }

    findAllOpen() {
        return this.records.filter(record => record.end == null);
    }

    findById(id) {
        const results = this.records.filter(record => record.id == id);
        return results.length == 1 ? results[0] : null;
    }

    save(data) {
        if (!data.id) {
            data = { id: v4(), ...data };
            this.records.push(data);
        } else {
            this.records = this.records.filter(r => r.id != data.id);
            this.records.push(data);
        }
        return data;
    }
}