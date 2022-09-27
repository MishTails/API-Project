const express = require('express')
const router = express.Router();

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")
// get all groups
router.get('/', async (req, res) => {
  const group = await Group.findAll({
    include: {
      model: GroupImage,
      attributes: ['previewImage'],
      where: GroupImage.groupId === Group.groupId
    }
  })
  return res.json(group)
})
// // get all groups by current user
router.get('/current', async (req, res) => {
  const {user} = req
  if (user) {
    const groups = await Group.findAll({
      include: {
        model: GroupImage,
        attributes: ['previewImage'],
        where: GroupImage.groupId === Group.groupId
      },
      where: {
        organizerId: user.id
      }
    })
  }
})
// get details of a Group from an Id
