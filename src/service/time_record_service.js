import TimeRecord from '../model/time_record.js';
import moment from 'moment';
import MUUID from 'uuid-mongodb';


class TimeRecordService {

    constructor(repo) {
        this.repo = repo;
    }

    find(query, successCallback) {
        this.repo.TimeRecord.find(query)
            .then(records => records.map(this._mapTimeRecordToJSON))
            .then(successCallback);
    }

    findById(id, successCallback, notFoundCallback) {
        this.repo.TimeRecord.findById(MUUID.from(id))
            .then(record => {
                if (record) {
                    successCallback(this._mapTimeRecordToJSON(record))
                } else {
                    notFoundCallback();
                }
            })
    }

    create(data, successCallback, validationCallback) {
        const validatedData = this._validate(data, TimeRecord.schema.create, validationCallback);
        if (validatedData) {
            const timeRecord = this._mapJSONToTimeRecord(data);
            timeRecord.save()
                .then(this._mapTimeRecordToJSON)
                .then(json => successCallback(json));
        }
    }

    update(id, data, successCallback, notFoundCallback, validationCallback) {
        const validatedData = this._validate(data, TimeRecord.schema.update, validationCallback);
        if (validatedData) {
            this.repo.TimeRecord.findById(MUUID.from(id), (err, timeRecord) => {
                if (err) {
                    throw Error(err);
                } else if (timeRecord) {
                    timeRecord.start = data.start;
                    timeRecord.end = data.end;
                    timeRecord.tag = data.tag;
                    timeRecord.comment = data.comment;
                    timeRecord.save()
                        .then(this._mapTimeRecordToJSON)
                        .then(successCallback);
                } else {
                    notFoundCallback();
                }
            });
        }
    }

    delete(id, successCallback, notFoundCallback) {
        console.log("ASDFADF", notFoundCallback);
        this.repo.TimeRecord.findById(MUUID.from(id), (err, timeRecord) => {
            if (err) {
                console.log(err);
            } else if (timeRecord) {
                timeRecord.delete().then(deleted => successCallback(this._mapTimeRecordToJSON(deleted)));
            } else {
                notFoundCallback();
            }
        });
    }

    _validate(data, validator, validationErrorCallback) {
        const validationResult = validator.validate(data, { abortEarly: false });
        console.log(`Validating: ${JSON.stringify(data)}`);
        if (validationResult.error) {
            var errorMessage = validationResult.error.details.map(detail => detail.message).join(', ');
            console.log(`Validation failed: ${errorMessage}`)
            if (validationErrorCallback) validationErrorCallback(errorMessage);
            else logger.err("No 'validationErrorCallback'.");
        } else {
            return validationResult.value;
        }
    }

    _mapTimeRecordToJSON(timeRecord) {
        console.log(timeRecord);
        return {
            id: timeRecord.id,
            start: timeRecord.start,
            end: timeRecord.end,
            tag: timeRecord.tag,
            comment: timeRecord.comment
        }
    }

    _mapJSONToTimeRecord(json) {
        return this.repo.TimeRecord({
            _id: json.id ? MUUID.from(json.id) : MUUID.v4(),
            start: json.start,
            end: json.end,
            tag: json.tag,
            comment: json.comment
        });
    }
}

export default TimeRecordService