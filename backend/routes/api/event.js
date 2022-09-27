const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const {handleValidationErrors, groupValidation} = require('../../utils/auth')
const {check} = require('express-validator')

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")

//Get all Attendees of an Event specified by its Id

router.get('/:eventId/attendees', async (req, res) => {
  let attendees = Attendance.findAll({
    where: 'hi'
  })
})






// NOTHING BELOW THIS
module.exports = router;
