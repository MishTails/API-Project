import React from 'react'
import {NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadGroups } from '../../store/group'

const GroupIndex = () => {

  const dispatch = useDispatch()
  const groupsObj = useSelector(state => state.groups)
  let groups

  useEffect(() => {
    dispatch(thunkLoadGroups())
  }, [dispatch])
  if(groupsObj) {
    groups = Object.values(groupsObj)
  }
  return (
  <ul>
    {groups.map(group => {
      return <div key={group.id}>
          <NavLink to={`/groups/${group.id}`}>{group.name}</NavLink>
          <p>{group.city}, {group.state}</p>
          <p>{group.about}</p>
          <p>{group.numMembers} Members <li>{group.private=== true? 'private': 'public'}</li></p>
        </div>
    })}
  </ul>)
}



export default GroupIndex
