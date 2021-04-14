import TimeRecord from '../model/time_record.js';
import moment from 'moment';

class TimeRecordService {

    constructor(timeRecordRepository) {
        this.timeRecordRepository = timeRecordRepository;
    }

    findAll(query, successCallback) {
        return this.timeRecordRepository.findAll()
            .then(data => successCallback(data));
    }

    findById(id, successCallback, notFoundCallback) {
        var timeRecord = this._findById(id, notFoundCallback);
        if (timeRecord) successCallback(timeRecord);
    }

    create(data, successCallback, validationCallback) {
        this._save(data, TimeRecord.schema.create, successCallback, validationCallback);
    }

    update(id, data, successCallback, notFoundCallback, validationCallback) {
        var timeRecord = this._findById(id, null, notFoundCallback);
        if (timeRecord) {
            timeRecord.start = data.start;
            timeRecord.end = data.end;
            timeRecord.tag = data.tag;
            timeRecord.comment = data.comment;
            this._save(timeRecord, TimeRecord.schema.update, successCallback, validationCallback);
        }
    }

    closeAllOpen() {
        this.timeRecordRepository.findAllOpen().forEach(timeRecord => {
            timeRecord.end = moment()
            this.timeRecordRepository.save(timeRecord);
            console.log("CLOSING ", timeRecord);
        });
    }

    async _save(data, validator, successCallback, validationErrorCallback) {
        const validatedData = this._validate(data, validator, validationErrorCallback);
        if (validatedData) {
            await this.timeRecordRepository.save(validatedData).then(savedData => {
                if (successCallback) successCallback(savedData);
            });
        }
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

    _findById(id, notFoundCallback) {
        var timeRecord = this.timeRecordRepository.findById(id);
        if (!timeRecord) {
            if (notFoundCallback) notFoundCallback(`TimeRecord '${id}' not found.`);
            else console.error("No 'notFoundCallback'.");
        }
        return timeRecord;
    }


}

export default TimeRecordService