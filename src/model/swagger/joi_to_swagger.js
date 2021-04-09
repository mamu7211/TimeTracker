import joiToSwagger from 'joi-to-swagger';
import TimeRecord from '../time_record.js';

console.log(JSON.stringify(joiToSwagger(TimeRecord.schema.create), null, 2));
