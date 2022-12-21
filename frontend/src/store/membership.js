import { csrfFetch } from "./csrf"

//type values
const GET_MEMBERS = "memberships/getMembers"

const ADD_MEMBER = "memberships/addMembers"

const UPDATE_MEMBER = "memberships/updateMembers"

const REMOVE_MEMBER = "memberships/removeMembers"

//actions

const actionGetMembers = (payload) => {
  return {
    type: GET_MEMBERS,
    payload
  }
}

const actionAddMember = (payload) => {
  return {
    type: ADD_MEMBER,
    payload
  }
}

const actionUpdateMember = (payload) => {
  return {
    type: UPDATE_MEMBER,
    payload
  }
}

const actionRemoveMember = (id) => {
  return {
    type: REMOVE_MEMBER,
    id
  }
}

export const thunkLoadMembers = (id) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${id}/members`)
  if(response.ok) {
    const list = await response.json()
    console.log('list',list.Members)
    dispatch(actionGetMembers(normalizeArr(list.Members)))
  }
}

export const thunkPostMember = (id, data) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${id}/membership`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const member = await response.json()
    dispatch(actionAddMember(member))
    return member
  }
}

export const thunkPutMember = (id, data) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${id}/membership`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const member = await response.json();
    dispatch(actionUpdateMember(member))
    return member
  }
}

export const thunkRemoveMember = (groupId) => async dispatch  => {
  const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
    method: 'delete'
  })
  if (response.ok) {
    const member = await response.json()
    dispatch(actionRemoveMember(groupId))
    return member
  }
}

//Maybe make a kick member in the near future frontend + backend

//reducer
const initialState = {}
export default function membershipReducer (state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS:
      let newStateGetMembers = {...state}
      console.log('hi im in members')
      newStateGetMembers.allMembers = {...action.payload}
      return newStateGetMembers
    case ADD_MEMBER:
      let newStateCreate = {...state}
      newStateCreate.allMembers[action.payload.id] = action.payload
      return newStateCreate
    case UPDATE_MEMBER:
      let newStateUpdate = {...state}
      newStateUpdate[action.payload.id] = action.payload
      return newStateUpdate
    case REMOVE_MEMBER:
      let newStateDelete = {...state}
      delete newStateDelete[action.id]
      return newStateDelete
    default:
      return state
  }
}

//keep an eye on update and delete


const normalizeArr = (arr) => {
  if (!(arr instanceof Array)) throw new Error ("Invalid Data Type: Not an Array")
  let obj = {}
  arr.forEach(el => {
    obj[el.id] = el
  })
  return obj
}
