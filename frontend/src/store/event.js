

const GET_EVENTS = 'events/getEvents'

const GET_ONE_EVENT = 'events/getOneEvent'

const CREATE_EVENT = 'events/createEvent'

const UPDATE_EVENT = 'events/updateEvent'

const DELETE_EVENT = 'events/deleteEvent'


const getEvents = () => {
  return {
    type: GET_EVENTS
  }
}

const getOneEvent = (id) => {
  return {
    type: GET_ONE_EVENT,
    id
  }
}

const createEvent = (payload) => {
  return {
    type: CREATE_EVENT,
    payload
  }
}

const updateEvent = (payload) => {
  return {
    type: UPDATE_EVENT,
    payload
  }
}

const deleteEvent = (id) => {
  return {
    type: DELETE_EVENT,
    id
  }
}
