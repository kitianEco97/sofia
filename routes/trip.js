/*
    path: api/trip

*/
const { Router } = require('express');
const { crearTrip, getTrips, getTrip, getTripsByStatus, updateTripToDispatched, findDriverAndStatus, updateTripToFinish, updateLatLng } = require('../controllers/trip');

const router = Router();

router.post('/', crearTrip );
router.get('/', getTrips );
router.get('/findByStatus/:status', getTripsByStatus );
router.get('/:id', getTrip );
router.get('/findByDeliveryAndStatus/:status', getTripsByStatus );
router.get('/findByDriverAndStatus/:id', findDriverAndStatus );
router.put('/updateTripToDispatched', updateTripToDispatched );
router.put('/updateTripToFinish', updateTripToFinish );
router.put('/updateLatLng', updateLatLng );

module.exports = router;
