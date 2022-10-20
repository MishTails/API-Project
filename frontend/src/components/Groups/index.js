import React from 'react'
import {NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadGroups } from '../../store/group'
import './groups.css'

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
  <div>
    <h2 className='text'> Groups</h2>
    <div className='groupCardFull'>
      {groups.map(group => {
        return <div key={group.id} className="contentCard">
          <NavLink to={`/groups/${group.id}`}>
            <img src={group.previewImage} alt={group.previewImage} width="160"></img>
          </NavLink>

          <div className='cardText'>
            <NavLink to={`/groups/${group.id}`} className="groupName">{group.name}</NavLink>
            <p className='nameCity'>{group.city}, {group.state}</p>
            <p className="aboutMems">{`${group.about.slice(0,50)}...`} </p>
            <p className="aboutMems">{group.numMembers} Members, {group.private=== true? 'Private': 'Public'}</p>
          </div>
        </div>
      })}
    </div>
  </div>)
}



export default GroupIndex
