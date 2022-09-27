const express = require('express');
const { where } = require('sequelize');
const router = express.Router();

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")
// get all groups (need to change GroupImage to Preview Image and error cases)
router.get('/', async (req, res) => {
  const groups = await Group.findAll({
    include: {
      model: GroupImage,
      attributes: ['url'],
      where: GroupImage.groupId === Group.groupId,
    }
  })

  return res.json(groups)
})
// // get all groups by current user (need error cases + some fixes)
router.get('/current', async (req, res) => {
  const {user} = req
  if (user) {
    const groups = await Group.findAll({
      include: {
        model: GroupImage,
        attributes: ['url'],
        where: GroupImage.groupId === Group.groupId
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

//Create a Group (error cases)
router.post('/', async (req, res) => {
  let {name, about, type, private, city, state} = req.body
  const newGroup = await Group.create({ name, about, type, private, city, state})

  return res.json(newGroup)

})

//Add an Image to a Group Based on the Group's Id (error cases)

router.post('/:groupId/images', async (req, res) => {
  let {url, preview} = req.body
  const newPhoto = await GroupImage.create({groupId: req.params.groupId, url, preview})

  return res.json(newPhoto)
})

//Edit a Group (error cases)

router.put('/:groupId', async (req, res) => {
  let {name, about, type, private, city, state} = req.body
  const group = await Group.findOne({where: {id: req.params.groupId}})
  group.set({
    name,
    about,
    type,
    private,
    city,
    state
  })
  return res.json(group)
})


//Delete a Group (error cases/auth cases)

router.delete('/:groupId', async (req, res) => {
  const group = await Group.findOne({where: {id: req.params.groupId}})
  group.destroy()

  return res.json({message: "Successfully Deleted", statusCode: 200})
})
