const mongoose = require('mongoose');
const { Schema } = mongoose;

const workHoursSchema = new Schema({
    tecnico: String,
    service: String,
    date: Date,
    timeStart: Array,
    timeEnd: Array,
    weekYear: Number,
    week: Array
});

module.exports = mongoose.model('work_hours', workHoursSchema)