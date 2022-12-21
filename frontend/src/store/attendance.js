import { csrfFetch } from "./csrf"

//type values
const GET_ATTENDANCE = "attendances/getAttendees"

const ADD_ATTENDANCE = "attendances/addAttendees"

const UPDATE_ATTENDANCE = "attendances/updateAttendees"

const REMOVE_ATTENDANCE = "attendances/removeAttendees"

//actions

const actionGetAttendees = (payload) => {
  return {
    type: GET_ATTENDANCE,
    payload
  }
}

const actionAddAttendee = (payload) => {
  return {
    type: ADD_ATTENDANCE,
    payload
  }
}

const actionUpdateAttendee = (payload) => {
  return {
    type: UPDATE_ATTENDANCE,
    payload
  }
}

const actionRemoveAttendee = (id) => {
  return {
    type: REMOVE_ATTENDANCE,
    id
  }
}

export const thunkLoadAttendees = (id) => async dispatch => {
  const response = await csrfFetch(`/api/events/${id}/attendees`)
  if(response.ok) {
    const list = await response.json()
    dispatch(actionGetAttendees(normalizeArr(list)))
  }
}

export const thunkPostAttendee = (id, data) => async dispatch => {
  const response = await csrfFetch(`/api/events/${id}/attendees`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const attendee = await response.json()
    dispatch(actionAddAttendee(attendee))
    return attendee
  }
}

export const thunkPutAttendee = (id, data) => async dispatch => {
  const response = await csrfFetch(`api/events/${id}/attendees`, {
    method: "put",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const attendee = await response.json();
    dispatch(actionUpdateAttendee(attendee))
    return attendee
  }
}

export const thunkRemoveAttendee = (eventId) => async dispatch => {
  const response = await csrfFetch(`api/events/${eventId}/attendees`, {
    method: 'delete'
  })
  if (response.ok) {
    const attendee = await response.json()
    dispatch(actionRemoveAttendee(eventId))
    return attendee
  }
}

//reducer

const initialState = {}
export default function attendeeReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ATTENDANCE:
      let newStateGetAttendees = {...state}
      newStateGetAttendees.allAttendees = {...action.payload}
      return newStateGetAttendees
    case ADD_ATTENDANCE:
      let newStateCreate = {...state}
      newStateCreate.allAttendees[action.payload.id] = action.payload
      return newStateCreate
    case UPDATE_ATTENDANCE:
      let newStateUpdate = {...state}
      newStateUpdate[action.payload.id] = action.payload
      return newStateUpdate
    case REMOVE_ATTENDANCE:
      let newStateDelete = {...state}
      delete newStateDelete[action.id]
      return newStateDelete
    default:
      return state
  }
}


const normalizeArr = (arr) => {
  if (!(arr instanceof Array)) throw new Error ("Invalid Data Type: Not an Array")
  let obj = {}
  arr.forEach(el => {
    obj[el.id] = el
  })
  return obj
}
