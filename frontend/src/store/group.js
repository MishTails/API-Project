import {csrfFetch} from './csrf'

// type values
const GET_GROUPS = 'groups/getGroups'

const GET_ONE_GROUP = 'groups/getOneGroup'

const CREATE_GROUP = 'groups/createGroup'

const UPDATE_GROUP = 'groups/updateGroup'

const DELETE_GROUP = 'groups/deleteGroup'

//actions

const actionGetGroups = (payload) => {
  return {
    type: GET_GROUPS,
    payload
  }
}

const actionGetOneGroup = (payload) => {
  return {
    type: GET_ONE_GROUP,
    payload
  }
}

const actionCreateGroup = (payload) => {
  return {
    type: CREATE_GROUP,
    payload
  }
}

const actionUpdateGroup = (payload) => {
  return {
    type: UPDATE_GROUP,
    payload
  }
}

const actionDeleteGroup = (id) => {
  return {
    type: DELETE_GROUP,
    id
  }
}
//Thunks (error handling maybe needed?)

export const thunkLoadGroups = () => async dispatch => {
  const response = await csrfFetch('/api/groups')
  console.log(response)
  if(response.ok) {
    const list = await response.json()
    dispatch(actionGetGroups(normalizeArr(list)))
  }
}

export const thunkLoadOneGroup = (id) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${id}`)
  if(response.ok) {
    const group = await response.json()
    dispatch(actionGetOneGroup(group))
  }
}

export const thunkPostGroup = (data) => async dispatch => {
  const response = await csrfFetch(`/api/groups`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(response.ok) {
    const group = await response.json()
    dispatch(actionCreateGroup(group))
    return group
  }
}

export const thunkPutGroup = (data) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    const group = await response.json();
    dispatch(actionUpdateGroup(group))
    return group
  }
}

export const thunkRemoveGroup = (id) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${id}`, {
    method: 'delete'
  })
  if (response.ok) {
    dispatch(actionDeleteGroup(id))
    return response
  }
}

//reducer
const initialState = {}
export default function groupsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      let newStateGetGroups = {...state}
      newStateGetGroups.allGroups = {...action.payload}
      return newStateGetGroups
    case GET_ONE_GROUP:
      let newStateGetOneGroup = {...state}
      newStateGetOneGroup.singleGroup = {...action.payload}
      return newStateGetOneGroup
    case CREATE_GROUP:
      let newStateCreate = {...state}
      newStateCreate[action.payload.id] = action.payload
      return newStateCreate
    case UPDATE_GROUP:
      let newStateUpdate = {...state}
      newStateUpdate[action.payload.id] = action.payload
      return newStateUpdate
    case DELETE_GROUP:
      let newStateDelete = {...state}
      delete newStateDelete[action.id]
      return newStateDelete
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
