import React from 'react'
import {NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadGroups } from '../../store/group'

const GroupIndex = () => {

  const dispatch = useDispatch()
  const groupsObj = useSelector(state => state.groups.allGroups)
  let groups

  useEffect(() => {
    dispatch(thunkLoadGroups())
  }, [dispatch])
  if(groupsObj) {
    groups = Object.values(groupsObj)
  }
  if (!groups) {
    return null
  }

  return (
  <ul>
    {groups.map(group => {
      return <div key={group.id}>
        <div>
          <img src={group.previewImage} alt={group.previewImage} width="150"></img>
        </div>
          <NavLink to={`/groups/${group.id}`}>{group.name}</NavLink>
          <p>{group.city}, {group.state}</p>
          <p>{`About: ${group.about}`}</p>
          <p>{group.numMembers} Members <div>{group.private=== true? 'private': 'public'}</div></p>
        </div>
    })}
  </ul>)
}



export default GroupIndex
