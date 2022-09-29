const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const {handleValidationErrors, groupValidation} = require('../../utils/auth')
const {check} = require('express-validator')

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")

//Delete an Image for an Event

router.delete('/imageId', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status = 401
    return res.json({message: "Authentication required", statusCode: 401})
  }
  let image = EventImage.findByPk(req.params.imageId)
  let event = Event.findByPk(image.eventId)
  const group  = await Group.findByPk(event.groupId)
  const attendeeValid = await Attendance.findOne({where: {eventId: req.params.eventId, userId: user.id}})
  if (group.organizerId !== user.id && attendeeValid.status !== "co-host") {
    res.status = 403
    return res.json({message: "Forbidden", statusCode: 403})
  }

  if (user) {
    let group = Group.findByPk(event.groupId)
    let attendance = Attendance.findOne({
      where: {
      eventId: event.id,
      userId: user.id
    }
  })
  if (attendance.status !== "co-host" && user.id !== group.organizerId) {
    res.status = 403
    return res.json({message: "Forbidden", statusCode: 403})
  }

  if (!image) {
    res.status = 404
    return res.json({
      message: "Event Image couldn't be found",
      statusCode: 404
    })
  }
  image.destroy()
  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
}




})


module.exports = router;
