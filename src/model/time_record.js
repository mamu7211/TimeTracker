import Joi from 'joi';

class TimeRecord {

    constructor(id, start, end, category, tag, comment) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.tag = tag;
        this.comment = comment
    }

    static schema = {
        create: Joi.object({
            start: Joi.date().required(),
            end: Joi.alternatives(Joi.date().min(Joi.ref('start', { render: true })), Joi.valid(null, "")).required(),
            tag: Joi.string().min(2).lowercase().trim().max(15).allow(null, "").default(""),
            comment: Joi.string().trim().allow(null, "").default("")
        }),
        update: Joi.object({
            id: Joi.string().guid().required(),
            start: Joi.date().required(),
            end: Joi.alternatives(Joi.date().min(Joi.ref('start', { render: true })), Joi.valid(null, "")).required(),
            tag: Joi.string().min(2).lowercase().trim().max(15).allow(null, "").default(""),
            comment: Joi.string().trim().allow(null, "").default("")
        })
    };
}

export default TimeRecord
