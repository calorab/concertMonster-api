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
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
    
);

module.exports = mongoose.model('Artist', artistSchema);