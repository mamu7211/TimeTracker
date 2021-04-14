import { v4 } from 'uuid';

class TimeRecordRepository {
    constructor() {
        this.records = [];
    };

    findAll() {
        return this.records;
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

export default TimeRecordRepository