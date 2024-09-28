const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    ShortId: {
        type: String,
        require: true,
        unique: true
    },
    redirecturl:{
        type:String,
        require:true
    },
    visithistory:[{
        timestamp:{
            type: Number
        }
    }],
    createdby : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
}
,{timestamps:true});

const URL = mongoose.model('url',urlSchema);

module.exports = URL