const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const { Op, Sequelize, ValidationError, ValidationErrorItem } = require('sequelize')
const {handleValidationErrors, groupValidation} = require('../../utils/auth')
const {check} = require('express-validator')

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")

const eventValidation = event => {
  let errors = {}


  if(!event.venueId) {
    errors.venueId = "Venue does not exist"
  }
  if(event.name.length < 5) {
    errors.name = "Name must be at least 5 characters"
  }
  if(event.type !== "Online" && event.type !== "In Person") {
    errors.type = "Type must be Online or In Person"
  }
  if(!Number.isInteger(parseInt(event.capacity))){
    errors.capacity = "Capacity must be an integer"
  }
  if(typeof parseInt(event.price) !== 'number') {
    errors.price = "Price is invalid"
  }
  if(!event.description) {
    errors.description = "Description is required"
  }
  if(Date.parse(event.startDate) < Date.now()) {
    errors.startDate = "Start date must be in the future"
  }
  if(Date.parse(event.endDate) < Date.parse(event.startDate)) {
    errors.endDate = "End date is less than start date"
  }
  return errors
}
//Get all Attendees of an Event specified by its Id
const queryValidator = (page, size, name, type, startDate) => {
  let errors = {}

  if(page < 1 || page > 10) {
    errors.page = "Page must be greater than or equal to 1"
  }
  if(size < 1 || size > 20) {
    errors.size = "Size must be greater than or equal to 1"
  }
  if(typeof name !== 'string' && name !== undefined) {
    errors.name = "Name must be a string"
  }
  if(type !== "Online" && type !== "In Person" && type !== undefined) {
    errors.type = "Type must be 'Online' or 'In Person'"
  }
  if(!(startDate instanceof Date) && startDate !== undefined) {
    errors.startDate = "Start date must be a valid datetime"
  }
  return errors
}

//Get all Events

router.get("/", async (req, res) => {

  let page = parseInt(req.query.page)
  let size = parseInt(req.query.size)
  let name = req.query.name
  let type = req.query.string
  let startDate = req.query.startDate
  if(!page) {
    page = 1
  }
  if(!size) {
    size = 20
  }

  let errorCheck = queryValidator(page, size, name, type, startDate)

  if (Object.keys(errorCheck).length !== 0) {
    res.status(400)
    return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
  }

  let limit = size
  let offset = size*(page-1)
  let optionalQueries = {}
  if (name) {
    optionalQueries.name = name
  }
  if (type) {
    optionalQueries.type = type
  }
  if (startDate) {
    optionalQueries.startDate = startDate
  }


  const events = await Event.findAll({
    limit: limit,
    offset: offset,
    include: [
    {
      model: Attendance,
      attributes: ['id']
    },
    {
      model: EventImage,
      attributes: ['id', 'eventId', 'url', 'preview']
    },
    {
      model: Group,
      attributes: ['id', 'name', 'city', 'state', 'organizerId']
    },
    {
      model: Venue,
      attributes: ['id', 'city', 'state']
    }
    ],
    where: {
      ...optionalQueries
    }
  })
  let arr = []
  events.forEach(event => {
    arr.push(event.toJSON())
  })
  arr.forEach(event => {
    event.EventImages.forEach(image => {
      if (image.preview === true) {
        event.previewImage = image.url
      }
    })
    if (event.EventImages.length === 0) {
      event.previewImage = 'no image'
    }
    delete event.EventImages
    let x = 0
    event.Attendances.forEach(attendee => {
      x++
    })
    event.numAttending = x
    delete event.Attendances
  })

  return res.json(arr)
});

//Get details of an Event specified by its Id

router.get("/:eventId", async (req, res) => {
  const event = await Event.findByPk(req.params.eventId,{
    include: [
    {
      model: Attendance,
      attributes: ['id']
    },
    {
      model: EventImage,
      attributes: ['id', 'eventId', 'url', 'preview']
    },
    {
      model: Group,
      attributes: ['id', 'organizerId', 'name', 'city', 'state']
    },
    {
      model: Venue,
      attributes: ['id', 'city', 'state']
    },
    {
      model: EventImage,
      attributes: ['id', 'url', 'preview']
    }
  ]
  })
  if (!event) {
    res.status(404);
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  let eventJSON = event.toJSON()
  let x = 0
  eventJSON.Attendances.forEach(attendee => {
    x++
  })
  eventJSON.numAttending = x
  delete eventJSON.Attendances

  return res.json(eventJSON)
});

//Add an Image to an Event based on the Event's id

router.post("/:eventId/images", async(req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  let event = await Event.findByPk(req.params.eventId)
  if(!event) {
    res.status(404)
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  const group  = await Group.findByPk(event.groupId)
  const attendee = await Attendance.findOne({where: {eventId: req.params.eventId, userId: user.id}})
  if (group.organizerId !== user.id && attendee.status !== "co-host" && attendee.status !== "attendee") {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }

  let {url, preview} = req.body
  if (event) {
    const newPhoto = await EventImage.create({eventId: req.params.eventId, url, preview})
    return res.json({id: newPhoto.id, url, preview})
  }
})


//Edit an Event specified by its Id

router.put("/:eventId", async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  let event = await Event.findByPk(req.params.eventId)
  if(!event) {
    res.status(404)
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  const group  = await Group.findByPk(event.groupId)
  const attendee = await Attendance.findOne({where: {eventId: req.params.eventId, userId: user.id}})
  if (group.organizerId !== user.id && attendee.status !== "co-host") {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }

  let {venueId, name, type, capacity, price, description, startDate, endDate} = req.body
  let venue = await Venue.findByPk(venueId)

  if (!venue) {
    res.status(404)
    return res.json({message: "Venue couldn't be found", statusCode: 404})
  }
  const newEvent= await Event.build({ venueId, name, type, capacity, price, description, startDate, endDate})
  let errorCheck = eventValidation(newEvent)

  if (Object.keys(errorCheck).length !== 0) {
    res.status(400)
    return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
  }

  if (event) {
    event.set({groupId: group.id, venueId, name, type, capacity, price, description, startDate, endDate})
  }
  await event.save()
  return res.json(event)

})

//Delete an event specified by its Id. Need to do cohost related things.

router.delete('/:eventId', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  let event = await Event.findByPk(req.params.eventId)
  if (!event) {
    res.status(404)
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  const group  = await Group.findByPk(event.groupId)
  const attendee = await Attendance.findOne({where: {eventId: req.params.eventId, userId: user.id}})
  if (group.organizerId !== user.id && attendee.status !== "co-host") {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }

  if (user.id !== group.organizerId) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
    await event.destroy()

  return res.json({message: "Successfully Deleted", statusCode: 200})
})

// Get all Attendees of an Event specified by its Id

router.get('/:eventId/attendees', async (req, res) => {
  let {user} = req
  const event = await Event.findOne({where: {id: req.params.eventId}})
  if (!event) {
    res.status(404)
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  let userMem = await Attendance.findOne({where: {userId: user.id, eventId: req.params.eventId}})
  const group = await Group.findByPk(event.groupId)

  if (userMem === null && user.id === group.organizerId) {
    userMem = {test: 'test', status: 'co-host'}
  }
  if (userMem.status = "co-host" || user.id === group.organizerId) {
    let attendees = await User.findAll({
      attributes: ['id', 'firstName', 'lastName'],
      include: {
        model: Attendance,
        where: {
          eventId: req.params.eventId,
        },
        attributes: ['status']
      }
    })

    return res.json({Attendees: attendees})
  } else {
    let attendees = await User.findAll({
      attributes: ['id', 'firstName', 'lastName'],
      include: {
        model: Attendance,
        where: {
          eventId: req.params.eventId,
          status: {
            [Op.notIn]: ['pending']
          }
        },
        attributes: ['status']
      }
    })

    return res.json({Attendees: attendees})
  }
})

//request to attend an event based on the event id

router.post('/:eventId/attendance', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  const event = await Event.findByPk(req.params.eventId)
  if (!event){
    res.status(404)
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  const group  = await Group.findByPk(event.groupId)
  const member = await Membership.findOne({where: {groupId: group.id, userId: user.id}})
  if (!member) {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }
  const userAttend = Attendance.findOne({where: {eventId: req.params.eventId, userId: user.id}})


  if (userAttend.status === "pending") {
    res.status(400)
    return res.json({message: "Attendance has already been requested", statusCode: 400})
  }
  if (userAttend.status === "attending") {
    res.status(400)
    return res.json({message: "User is already an attendee of the event", statusCode: 400})
  }
  const newAttendee = await Attendance.create({eventId: req.params.eventId, userId: user.id, status: 'pending'})
    return res.json({eventId: req.params.eventId, userId: user.id, status: 'pending'})
})

// change the status of an attendance for an event specified by id

router.put('/:eventId/attendance', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  const event = await Event.findByPk(req.params.eventId)
  if (!event) {
    res.status(404)
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  const group  = await Group.findByPk(event.groupId)
  const attendeeValid = await Attendance.findOne({where: {eventId: req.params.eventId, userId: user.id}})

  if (group.organizerId !== user.id && attendeeValid.status !== "co-host") {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }

  let {userId, status} = req.body
  let attendee = await Attendance.findOne({where: {eventId: req.params.eventId, userId}, attributes: ['id','userId', 'eventId', 'status']})

  let userAttend = await Attendance.findOne({where: {eventId: req.params.eventId, userId}})
  if (user.id === group.organizerId) {
    userAttend === true
  }
  if (status === "pending") {
    res.status(400);
    return res.json({message: "Cannot change a membership status to pending", statusCode: 400})
  }

  if (userAttend=== null && user.id === group.dataValues.organizerId) {
    userAttend = {test: 'test', status: 'co-host'}
  }

  if (!userAttend) {
    res.status(404)
    return res.json({message: "Attendance between the user and the event does not exist", statusCode: 404})
  }
  if (status === "attending") {
    if (userAttend.status !== "co-host" && user.id !== group.organizerId ) {
      res.status(403)
      return res.json({message: "Forbidden", statusCode: 403} )
    } else {
      attendee.set({status})
      await attendee.save()
      res.json(attendee)
    }
  }
})

// Delete membership attendance to an event specified by id

router.delete('/:eventId/attendance', async (req, res) => {
  const {user} = req
  let {memberId} = req.body

  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  let event = await Event.findByPk(req.params.eventId)
  if (!event) {
    res.status(404)
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  const group  = await Group.findByPk(event.groupId)
  if (group.organizerId !== user.id && user.id !== memberId) {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }

  // const myUser = await User.findByPk(userId)

  const attendee = await Attendance.findOne({where: {eventId: req.params.eventId, userId: memberId}})
  if (!attendee) {
    res.status(404)
    return res.json({message: "Attendance does not exist for this User", statusCode: 404})
  }
  if(memberId !== attendee.userId && user.id !== group.organizerId) {
    res.status(403)
    return res.json({message: "Only the User or organizer may delete an Attendance", statusCode: 400})
  }


    await attendee.destroy()

  return res.json({message: "Successfully Deleted", statusCode: 200})
})



// NOTHING BELOW THIS
module.exports = router;
