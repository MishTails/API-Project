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
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }

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
        attributes: ['id']
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

  })
  let countGroup = groups.toJSON()
  let numMems =  countGroup.Memberships.length
  countGroup.numMemberships = numMems

  if (!groups) {
    res.status(404)
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  return res.json(countGroup)
})


//Create a Group (in groups.js so route is actually localhost/api/groups)
router.post('/', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }

  if (user) {
    let {name, about, type, private, city, state, } = req.body
    const testGroup = await Group.build({organizerId: user.id, name, about, type, private, city, state})

    let errorCheck = groupValidation(testGroup)

    if (Object.keys(errorCheck).length !== 0) {
      res.status(400)
      return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
    }
    const newGroup = await Group.create({organizerId: user.id, name, about, type, private, city, state})

    return res.json(newGroup)

  }

})

//Add an Image to a Group Based on the Group's Id

router.post('/:groupId/images', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  if (user.id) {
    let {url, preview} = req.body
    let group = await Group.findByPk(req.params.groupId)
    if (group) {
      const newPhoto = await GroupImage.create({groupId: req.params.groupId, url, preview})
      return res.json({id: newPhoto.id, url, preview})
    } else {
      res.status(404)
      return res.json({message: "Group couldn't be found", statusCode: 404})
    }
  }
})

//Edit a Group

router.put('/:groupId', async (req, res) => {
  let {name, about, type, private, city, state} = req.body
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  if (user.id) {
    const group = await Group.findOne({where: {id: req.params.groupId}})
    if(!group) {
      res.status(404)
      return res.json({message: "Group couldn't be found", statusCode: 404})
    }
    if (group.organizerId !== user.id) {
      res.status(403)
      return res.json({message: "Forbidden", statusCode: 403})
    }

    const newGroup = await Group.build({ name, about, type, private, city, state})

    let errorCheck = groupValidation(newGroup)

    if (Object.keys(errorCheck).length !== 0) {
      res.status(400)
      return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
    }

    if (group) {
      group.set({name, about, type, private, city, state})
    }
    await group.save()
    return res.json(group)
  }

})

//Delete a Group Needs fixing

router.delete('/:groupId', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  const group = await Group.findOne({where: {id: req.params.groupId}})
  if (!group) {
    res.status(404)
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  if (group.organizerId !== user.id) {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }

  if (user.id !== group.organizerId) {
    res.status(401)
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
  const group = await Group.findByPk(req.params.groupId)
  if (!group) {
    res.status(404);
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
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

//Create an Event
router.post('/:groupId/events', async (req, res) => {
  const {venueId, name, type, capacity, price, description, startDate, endDate} = req.body
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  const group  = await Group.findByPk(req.params.groupId)
  if (!group) {
    res.status(404);
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  const member = await Membership.findOne({where: {groupId: req.params.groupId, userId: user.id}})

  if (group.organizerId !== user.id && member.status !== "co-host") {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }



  const testEvent = await Event.build({venueId, name, type, capacity, price, description, startDate, endDate})

    let errorCheck = eventValidation(testEvent)

    if (Object.keys(errorCheck).length !== 0) {
      res.status(400)
      return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
    }
    const newEvent = await Event.create({groupId: req.params.groupId, venueId, name, type, capacity, price, description, startDate, endDate})

    return res.json(newEvent)
})

//Get all venues for a group specified by Id

router.get('/:groupId/venues', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  const group  = await Group.findByPk(req.params.groupId)
  const member = await Membership.findOne({where: {groupId: req.params.groupId, userId: user.id}})

  if (group.organizerId !== user.id && member.status !== "co-host") {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }
  const venues = await Venue.findAll({
    where: {
      groupId: req.params.groupId
    },
    attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
  })

  if (!venues || venues.length === 0) {
    res.status(404);
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }

  return res.json(venues)
})


// Create a new Venue for a Group specified by its Id

router.post('/:groupId/venues', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  const group  = await Group.findByPk(req.params.groupId)
  const member = await Membership.findOne({where: {groupId: req.params.groupId, userId: user.id}})
  if (!group) {
    res.status(404);
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  if (group.organizerId !== user.id && member.status !== "co-host") {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }
  if (user) {
    let {address, city, state, lat, lng } = req.body

    const testVenue = await Venue.build({groupId: req.params.groupId, address, city, state, lat, lng})

    let errorCheck = venueValidation(testVenue)

    if (Object.keys(errorCheck).length !== 0) {
      res.status(400)
      return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
    }
    const newVenue = await Venue.create({groupId: req.params.groupId, address, city, state, lat, lng})

    return res.json(newVenue)

  }

})
// Get all members of a group
router.get('/:groupId/members', async (req, res) => {

  const {user} = req
  let group = await Group.findByPk(req.params.groupId)
  let userMem = await Membership.findOne({where: {userId: user.id, groupId: req.params.groupId}})

  if (!group) {
    res.status(404);
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }

  if(!userMem) {
    let groupMems = await User.findAll({
      attributes: ['id', 'firstName', 'lastName'],
      include: {
        model: Membership,
        where: {
          groupId: req.params.groupId,
          status: {
            [Op.notIn]: ['pending']
          }
        },
        attributes: ['status']
      }
    })
    return res.json({Members:groupMems})
  }

  if(user) {
    if(group.organizerId === user.id || userMem.status === "co-host") {
      let groupMems = await User.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        include: {
          model: Membership,
          where: {
            groupId: req.params.groupId,
          },
          attributes: ['status']
        }
      })
      return res.json({Members:groupMems})
    } else {
      let groupMems = await User.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        include: {
          model: Membership,
          where: {
            groupId: req.params.groupId,
            status: {
              [Op.notIn]: ['pending']
            }
          },
          attributes: ['status']
        }
      })
      return res.json({Members:groupMems})
    }
  }
})

//Request a Membership for a Group based on the Group's Id

router.post('/:groupId/membership', async (req, res) =>{
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  let group = await Group.findByPk(req.params.groupId)
  let member = await Membership.findOne({where: {groupId: req.params.groupId, userId: user.id }})
  if (!group) {
    res.status(404);
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  if (member) {
    if (member.status === "pending") {
      res.status(400);
      return res.json({message: "Membership has already been requested", statusCode: 400})
    } else {
      res.status(400);
      return res.json({message: "User is already a member of the group", statusCode: 400})
    }
  } else {
    const newMember = await Membership.create({userId: user.id, groupId: req.params.groupId, status: 'pending'})
    return res.json({memberId: user.id, status: 'pendng'})
  }
})

//Change the status of a membership for a group specified by id


router.put('/:groupId/membership', async (req, res) => {
  let {memberId, status} = req.body
  let group = await Group.findByPk(req.params.groupId)
  let member = await Membership.findOne({where: {groupId: req.params.groupId, userId: memberId}, attributes: ['id','userId', 'groupId', 'status']})
  let {user} = req
  let userMem = await Membership.findOne({where: {groupId: req.params.groupId, userId: user.id}})
  if (status === "pending") {
    res.status(400);
    return res.json({message: "Cannot change a membership status to pending", statusCode: 400})
  }
  if (!member) {
    res.status(404);
    return res.json({message: "User couldn't be found", statusCode: 404})
  }
  if (!group) {
    res.status(404)
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  if (userMem === null && user.id === group.dataValues.organizerId) {
    userMem = {test: 'test', status: 'co-host'}
  }
  if (!userMem) {

    res.status(404)
    return res.json({message: "Membership between the user and the group does not exist", statusCode: 404})
  }
  if (status === "member") {
    if (userMem.status !== "co-host" && user.id !== group.organizerId ) {
      res.status(403)
      return res.json({message: "Forbidden", statusCode: 403} )
    } else {
      member.set({status})
      await member.save()
      res.json(member)
    }
  }
  if (status === "co-host") {
    if (user.id !== group.organizerId ) {
      res.status(403)
      return res.json({message: "Forbidden", statusCode: 403} )
    } else {
      member.set({status})
      await member.save()
      res.json(member)
  }
}
})

// Delete membership to a group specified by id

router.delete('/:groupId/membership', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status(401)
    return res.json({message: "Authentication required", statusCode: 401})
  }
  const group  = await Group.findByPk(req.params.groupId)
  if (!group) {
    res.status(404)
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  let memberValid = await Membership.findOne({where: {groupId: req.params.groupId, userId: user.id}})

  if (!memberValid && group.dataValues.organizerId === user.id) {
    memberValid = {test: 'test', status: "co-host"}
  }
  if (group.dataValues.organizerId !== user.id && memberValid.status !== "co-host") {
    res.status(403)
    return res.json({message: "Forbidden", statusCode: 403})
  }
  const {memberId} = req.body
  const myUser = await User.findByPk(memberId)
  const member = await Membership.findOne({where: {groupId: req.params.groupId, userId: memberId}})
  if(!myUser) {
    res.status(400)
    return res.json({message: "Validation Error", statusCode: 400, errors: {memberId: "User couldn't be found"}})
  }

  if (!member) {
    res.status(404)
    return res.json({message: "Membership does not exist for this User", statusCode: 404})
  }
    await member.destroy()

  return res.json({message: "Successfully Deleted", statusCode: 200})
})


module.exports = router;
