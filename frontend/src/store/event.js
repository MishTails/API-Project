
import{csrfFetch} from './csrf'
// type values
const GET_EVENTS = 'events/getEvents'

const GET_ONE_EVENT = 'events/getOneEvent'

const CREATE_EVENT = 'events/createEvent'

const UPDATE_EVENT = 'events/updateEvent'

const DELETE_EVENT = 'events/deleteEvent'

const ADD_IMAGE = 'events/createImage'

// const DELETE_IMAGE = 'events/deleteImage'

//actions

const actionGetEvents = (payload) => {
  return {
    type: GET_EVENTS,
    payload
  }
}

const actionGetOneEvent = (payload) => {
  return {
    type: GET_ONE_EVENT,
    payload
  }
}

const actionCreateEvent = (payload) => {
  return {
    type: CREATE_EVENT,
    payload
  }
}

const actionUpdateEvent = (payload) => {
  return {
    type: UPDATE_EVENT,
    payload
  }
}

const actionDeleteEvent = (id) => {
  return {
    type: DELETE_EVENT,
    id
  }
}

const actionCreateEventImage = (payload) => {
  return {
    type: ADD_IMAGE,
    payload
  }
}
// const actionDeleteImage = (id) => {
//   return {
//     type: DELETE_IMAGE,
//     id
//   }
// }
//Thunks (error handling maybe needed?)

export const thunkLoadEvents = () => async dispatch => {
  const response = await csrfFetch('/api/events')
  if(response.ok) {
    const list = await response.json()
    dispatch(actionGetEvents(normalizeArr(list)))
  }
}

export const thunkLoadOneEvent = (id) => async dispatch => {
  const response = await csrfFetch(`/api/events/${id}`)
  if(response.ok) {
    const event = await response.json()
    dispatch(actionGetOneEvent(event))
  }
}


export const thunkPutEvent = (data) => async dispatch => {
  const response = await csrfFetch(`/api/events/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    const event = await response.json();
    dispatch(actionUpdateEvent(event))
    return event
  }
}

export const thunkRemoveEvent = (id) => async dispatch => {
  const response = await csrfFetch(`/api/events/${id}`, {
    method: 'delete'
  })
  if (response.ok) {
    dispatch(actionDeleteEvent(id))
    return response
  }
}

export const thunkPostEvent = (data) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${data.groupId}/events`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(response.ok) {
    const event = await response.json()
    dispatch(actionCreateEvent(event))
    return event
  }
}


export const thunkPostEventImage = (data) => async dispatch => {
  const response = await csrfFetch(`/api/events/${data.eventId}/images`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(response.ok) {
    const image = await response.json()
    image.eventId = data.eventId
    console.log("data", data)
    console.log("eventId", image.eventId)
    //need to note what is coming out of image
    dispatch(actionCreateEventImage(image))
    return image
  }
}

//reducer
const initialState = {}
export default function eventsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      let newStateGetEvents = {...state}
      newStateGetEvents.allEvents = {...action.payload}
      return newStateGetEvents
    case GET_ONE_EVENT:
      let newStateGetOneEvent = {...state}
      newStateGetOneEvent.singleEvent = {...action.payload}
      return newStateGetOneEvent
    case CREATE_EVENT:
      let newStateCreate = {...state}
      let id = action.payload.id
      newStateCreate.allEvents[id] = action.payload
      return newStateCreate
    case UPDATE_EVENT:
      let newStateUpdate = {...state}
      newStateUpdate[action.payload.id] = action.payload
      return newStateUpdate
    case DELETE_EVENT:
      let newStateDelete = {...state}
      delete newStateDelete[action.id]
      return newStateDelete
    case ADD_IMAGE:
      let newStateAddImage = {...state}
      console.log("newStateAddImage Before---->", newStateAddImage.singleEvent.EventImages)
      newStateAddImage.singleEvent.EventImages[0].url = action.payload.url
      return newStateAddImage


    default:
      return state
  }
}


// helper func

const normalizeArr = (arr) => {
  if (!(arr instanceof Array)) throw new Error ("Invalid Data Type: Not an Array")
  let obj = {}
  arr.forEach(el => {
    obj[el.id] = el
  })
  return obj
}
