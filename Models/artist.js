const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        tour: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: true
        }
    }
    
);

module.exports = mongoose.model('Artist', artistSchema);