const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js')
const eventsRouter = require('./event.js')
const venuesRouter = require ('./venue.js')
const groupImagesRouter = require('./groupImage.js')
const eventImagesRouter = require('./eventImage.js')

const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/groups', groupsRouter);

router.use('/events', eventsRouter);

router.use('/venues', venuesRouter)

router.use('/group-images', groupImagesRouter)

router.use('/event-images', eventImagesRouter)

router.use()

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
