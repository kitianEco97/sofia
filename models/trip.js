const { Schema, model } = require('mongoose');

const TripSchema = Schema({

    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    online: {
        type: Boolean,
    },
    status: {
        type: String
    }, 
    idDriver: {
        type: String
    }
});

TripSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Trip', TripSchema );