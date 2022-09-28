const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const {handleValidationErrors, groupValidation} = require('../../utils/auth')
const {check} = require('express-validator')

const venueValidation = (venue) => {
  let errors = {}
  if (!venue.address) {
    errors.address = "Street address is required"
  }
  if (!venue.city) {
    errors.city = "City is required"
  }
  if (!venue.state) {
    errors.state = "State is required"
  }
  if (venue.lat < -90 || venue.lat >90) {
    errors.lat = "Latitude is not valid"
  }
  if (venue.lng < -180 || venue.lng >180) {
    errors.lng = "Longitude is not valid"
  }
  return errors
}

//Edit a Venue specified by its Id

router.put("/:venueId", async (req, res) => {
  let venue = await Venue.findByPk(req.params.eventId)
  let {address, city, state, lat, lng} = req.body

  if (!venue) {
    res.status = 404
    return res.json({message: "Venue couldn't be found", statusCode: 404})
  }
  const newVenue= await Venue.build({address, city, state, lat, lng})
  let errorCheck = venueValidation(newVenue)

  if (Object.keys(errorCheck).length !== 0) {
    res.status = 400
    return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
  }
  if (venue) {
    venue.set({address, city, state, lat, lng})
  }
  await venue.save()
  return res.json(venue)

})

module.exports = router;
