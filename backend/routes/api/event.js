const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const {handleValidationErrors, groupValidation} = require('../../utils/auth')
const {check} = require('express-validator')

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")

const eventValidation = event => {
  let errors = {}
  let date = new Date()
  let today = Date.now()

  if(!event.venueId) {
    errors.venueId = "Venue does not exist"
  }
  if(event.name.length < 5) {
    errors.name = "Name must be at least 5 characters"
  }
  if(event.type !== "Online" && event.type !== "In person") {
    errors.type = "Type must be Online or In Person"
  }
  if(!Number.isInteger(event.capacity)){
    errors.capacity = "Capacity must be an integer"
  }
  if(typeof event.price !== 'number') {
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

router.get("/", async (req, res) => {
  const events = await Event.findAll({
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
      attributes: ['id', 'name', 'city', 'state']
    },
    {
      model: Venue,
      attributes: ['id', 'city', 'state']
    }
  ]
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
      attributes: ['id', 'name', 'city', 'state']
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
    res.status = 404;
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
  let event = await Event.findByPk(req.params.eventId)
  let {url, preview} = req.body
  if (event) {
    const newPhoto = await GroupImage.create({eventId: req.params.groupId, url, preview})
    return res.json({id: newPhoto.id, url, preview})
  } else {
    res.status = 404
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
})


//Edit an Event specified by its Id

router.put("/:eventId", async (req, res) => {
  let event = await Event.findByPk(req.params.eventId)

  let {venueId, name, type, capacity, price, description, startDate, endDate} = req.body
  let venue = await Venue.findByPk(venueId)
  
  if (!venue) {
    res.status = 404
    return res.json({message: "Venue couldn't be found", statusCode: 404})
  }
  const newEvent= await Event.build({ venueId, name, type, capacity, price, description, startDate, endDate})
  let errorCheck = eventValidation(newEvent)

  if (Object.keys(errorCheck).length !== 0) {
    res.status = 400
    return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
  }

  if (event) {
    event.set({name, about, type, private, city, state})
  } else {
    res.status = 404
    return res.json({message: "Event couldn't be found", statusCode: 404})
  }
  await event.save()
  return res.json(event)

})

// NOTHING BELOW THIS
module.exports = router;
