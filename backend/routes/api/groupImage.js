const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const {handleValidationErrors, groupValidation} = require('../../utils/auth')
const {check} = require('express-validator')

const {Attendance, Event, EventImage, Group, GroupImage, Membership, User, Venue} = require("../../db/models")

//delete an image from a group
router.delete('/imageId', async (req, res) => {
  const {user} = req
  if (!user) {
    res.status = 401
    return res.json({message: "Authentication required", statusCode: 401})
  }
  let image = GroupImage.findByPk(req.params.imageId)
  let group = Group.findByPk(image.groupId)
  const member = await Membership.findOne({where: {groupId: req.params.groupId, userId: user.id}})

  if (group.organizerId !== user.id && member.status !== "co-host") {
    res.status = 403
    return res.json({message: "Forbidden", statusCode: 403})
  }
  if (user) {
    let membership = Membership.findOne({
      where: {
      groupId: group.id,
      userId: user.id
    }
  })
  if (membership.status !== "co-host" && user.id !== group.organizerId) {
    res.status = 403
    return res.json({message: "Forbidden", statusCode: 403})
  }

  if (!image) {
    res.status = 404
    return res.json({
      message: "Group Image couldn't be found",
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
