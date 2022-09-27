const express = require('express');
const { where } = require('sequelize');
const router = express.Router();

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")
// get all groups
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
// // get all groups by current user
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

  return res.json(groups)
})
module.exports = router;
