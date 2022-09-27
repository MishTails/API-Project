const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const {handleValidationErrors, groupValidation} = require('../../utils/auth')
const {check} = require('express-validator')

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")
// get all groups (need to make not n+1 query)

router.get('/', async (req, res) => {
  const groups = await Group.findAll({
    include: {
      model: GroupImage, as: "PreviewImage",
      where: {preview: true},
      attributes: ['url'],
    }
  })

  return res.json(groups)
})
// // get all groups by current user (some fixes)
router.get('/current', async (req, res) => {
  const {user} = req
  if (user) {
    const groups = await Group.findAll({
      include: {
        model: GroupImage, as: "PreviewImage",
        where: {preview: true},
        attributes: ['url'],

      },
      where: {
        organizerId: user.id
      }
    })

    return res.json(groups)
  }
})
// get details of a Group from an Id
router.get('/:groupId', async (req, res) => {
  const groups = await Group.findByPk(req.params.groupId, {
    include: [
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
  ]
  })
  if (!groups) {
    res.status = 404
    return res.json({message: "Group couldn't be found", statusCode: 404})
  }
  return res.json(groups)
})
module.exports = router;

//Create a Group (Body Validation Neededd)
router.post('/', async (req, res) => {
  const {user} = req
  if (user) {
    let {name, about, type, private, city, state} = req.body
    const newGroup = await Group.build({ name, about, type, private, city, state})

    let errorCheck = groupValidation(newGroup)

    if (Object.keys(errorCheck).length !== 0) {
      res.status = 400
      return res.json({message: "Validation Error", statusCode: 400, errors: errorCheck})
    }
    newGroup.save()

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
      return res.json(newPhoto)
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

    return res.json(group)
  }

})

//Delete a Group

router.delete('/:groupId', async (req, res) => {
  const group = await Group.findOne({where: {id: req.params.groupId}})
  const {user} = req
  if (user.id = req.params.groupId) {
    if (group) {
      group.destroy()
    } else {
      res.status = 404
      return res.json({message: "Group couldn't be found", statusCode: 404})
    }
  } else {
    res.status = 401
    return res.json({message: "Authentication required", statusCode: 401})
  }



  return res.json({message: "Successfully Deleted", statusCode: 200})
})
