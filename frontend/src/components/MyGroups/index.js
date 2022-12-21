import React from 'react'
import {NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadGroups } from '../../store/group'
import { thunkLoadMembers, thunkRemoveMember } from '../../store/membership'
import './mygroups.css'

const MyGroupIndex = () => {

  const dispatch = useDispatch()
  let session = useSelector(state => state.session.user)
  const groupsObj = useSelector(state => state.groups.allGroups)
  let groups

  useEffect(() => {
    dispatch(thunkLoadGroups())
    // dispatch(thunkLoadMembers())
  }, [dispatch])
  if(groupsObj) {
    groups = Object.values(groupsObj)
  }
  if (!groups) {
    return null
  }

  return (
    <div>
    <h2 className='text'> My Groups</h2>
    <div className='groupCardFull'>
      {groups?.map(group => {
        if (group.members[session.id]) {
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
          <button>Leave Group</button>
        </div>
        }
      })}
    </div>
  </div>
  )
}

export default MyGroupIndex
