const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const { Op, Sequelize, ValidationError, ValidationErrorItem } = require('sequelize')
const {handleValidationErrors} = require('../../utils/auth')
const {check} = require('express-validator')

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")
// get all groups (need to make not n+1 query)

const groupValidation = (group) => {
  let errors = {}
  if (group.name.length >= 60) {
    errors.name = "Name must be 60 characters or less"
  }
  if (group.about.length < 50) {
    errors.about = "About must be 50 characters or more"
  }
  if (group.type !== "Online" && group.type !== "In person") {
    errors.type = "Type must be 'Online' or 'In person'"
  }
  if (group.private !== true && group.private !== false) {
    errors.private = "Private must be a boolean"
  }
  if (!group.city) {
    errors.city = "City is required"
  }
  if (!group.state) {
    errors.state = "State is required"
  }
  return errors
}
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

// GET ALL groups

router.get("/", async (req, res) => {
    const final = {}
    const groups = await Group.findAll({
      include: [
      {
        model: Membership,
        attributes: ['id']
      },
      {
        model: GroupImage,
        attributes: ['id', 'groupId', 'url', 'preview']
      }
    ]
    })
    let arr = []
    groups.forEach(group => {
      arr.push(group.toJSON())
    })
    arr.forEach(group => {
      group.GroupImages.forEach(image => {
        if (image.preview === true) {
          group.previewImage = image.url
        }
      })
      if (group.GroupImages.length === 0) {
        group.previewImage = 'no image'
      }
      delete group.GroupImages
      let x = 0
      group.Memberships.forEach(member => {
        x++
      })
      group.numMembers = x
      delete group.Memberships
    })

    return res.json(arr)
});
// get all groups by current user
router.get('/current', async (req, res) => {
  const {user} = req
  if (user) {
    const groups = await Group.findAll({
      include: [
        {
          model: Membership,
          attributes: ['id']
        },
        {
          model: GroupImage,
          attributes: ['id', 'groupId', 'url', 'preview']
        }
      ],
      where: {
        organizerId: user.id
      }
    })

    let arr = []
    groups.forEach(group => {
      arr.push(group.toJSON())
    })
    arr.forEach(group => {
      group.GroupImages.forEach(image => {
        if (image.preview === true) {
          group.previewImage = image.url
        }
      })
      if (group.GroupImages.length === 0) {
        group.previewImage = 'no image'
      }
      delete group.GroupImages
      let x = 0
      group.Memberships.forEach(member => {
        x++
      })
      group.numMembers = x
      delete group.Memberships
    })

    return res.json(arr)
  }
})
// get details of a Group from an Id
router.get('/:groupId', async (req, res) => {
  const groups = await Group.findByPk(req.params.groupId, {
    include: [
      {
        model: Membership,
        attributes: []
      },
      {
        model: GroupImage,
        attributes: ['id', 'url', 'preview'],
      },
      {
        model: User,
        as: 'Organizer',
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: Venue,
        attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng'],
      }
    ],
    attributes: {
      include: [[Sequelize.fn("COUNT", Sequelize.col("Memberships.id")), 'numMembers']]
    }
  })
  if (!groups) {
    res.status = 404
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  return res.json(groups)
})


//Create a Group
router.post('/', async (req, res) => {
  const {user} = req
  if (user) {
    let {name, about, type, private, city, state, } = req.body
    const testGroup = await Group.build({organizerId: user.id, name, about, type, private, city, state})
    console.log(testGroup)
    let errorCheck = groupValidation(testGroup)

    if (Object.keys(errorCheck).length !== 0) {
      res.status = 400
      return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
    }
    const newGroup = await Group.create({organizerId: user.id, name, about, type, private, city, state})

    let trimmedGroup = {name, about, type, private, city, state }
    return res.json(newGroup)

  }

})

//Add an Image to a Group Based on the Group's Id

router.post('/:groupId/images', async (req, res) => {
  const {user} = req
  if (user.id) {
    let {url, preview} = req.body
    let group = await Group.findByPk(req.params.groupId)
    if (group) {
      const newPhoto = await GroupImage.create({groupId: req.params.groupId, url, preview})
      return res.json({id: newPhoto.id, url, preview})
    } else {
      res.status = 404
      return res.json({message: "Group couldn't be found", statusCode: 404})
    }
  }
})

//Edit a Group

router.put('/:groupId', async (req, res) => {
  let {name, about, type, private, city, state} = req.body
  const {user} = req
  if (user.id) {
    const group = await Group.findOne({where: {id: req.params.groupId}})
    const newGroup = await Group.build({ name, about, type, private, city, state})
    console.log('hi')
    let errorCheck = groupValidation(newGroup)

    if (Object.keys(errorCheck).length !== 0) {
      res.status = 400
      return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
    }

    if (group) {
      group.set({name, about, type, private, city, state})
    } else {
      res.status = 404
      return res.json({message: "Group couldn't be found", statusCode: 404})
    }
    await group.save()
    return res.json(group)
  }

})

//Delete a Group Needs fixing

router.delete('/:groupId', async (req, res) => {
  const {user} = req
  const group = await Group.findOne({where: {id: req.params.groupId}})
  if (!group) {
    res.status = 404
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  if (user.id !== group.organizerId) {
    res.status = 401
    return res.json({message: "Authentication required", statusCode: 401})
  }
    await group.destroy()

  return res.json({message: "Successfully Deleted", statusCode: 200})
})

// Get all Events of a group specified by its id
router.get("/:groupId/events", async (req, res) => {
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
    ],
    where: {
      groupId: req.params.groupId
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

router.post('/:groupId/events', async (req, res) => {
  const {venueId, name, type, capacity, price, description, startDate, endDate} = req.body
  const group = await Group.findOne({where: {id: req.params.groupId}})

  if (!group) {
    res.status = 404;
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }

  const testEvent = await Event.build({venueId, name, type, capacity, price, description, startDate, endDate})
  console.log(testEvent)
    let errorCheck = eventValidation(testEvent)

    if (Object.keys(errorCheck).length !== 0) {
      res.status = 400
      return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
    }
    const newEvent = await Event.create({groupId: req.params.groupId, venueId, name, type, capacity, price, description, startDate, endDate})

    return res.json(newEvent)
})

module.exports = router;
