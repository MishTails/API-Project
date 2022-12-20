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
    payload
  }
}

export const thunkLoadMembers = (id) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${id}/members`)
  if(response.ok) {
    const list = await response.json()
    dispatch(actionGetMembers(normalizeArr(list)))
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
