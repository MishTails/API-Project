import React from 'react'
import { useParams} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadOneGroup } from '../../store/group'
import { NavLink } from 'react-router-dom'



const GroupPage = () => {
  const dispatch = useDispatch()
  const { groupId } = useParams()
  const group = useSelector(state => state.groups.singleGroup)

  useEffect(() => {
    dispatch(thunkLoadOneGroup(groupId))
  }, [dispatch, groupId])


  if (!group) {
    return null
  }

  if (!group.GroupImages[1]) {
    group.GroupImages[1] = {url: 'hi'}
  }
  return (
  <div className='groupCardFull'>


    <div className='groupDetailCard'>
      <div>
          {/* i need to figure out how to make this load in asynchronously */}
          <img className="groupPageImage" src = {group.GroupImages[1].url} alt="pokeball"></img>
      </div>
      <div>
        <h1>{group.name}</h1>
        <p>{`${group.city}, ${group.state}`}</p>
        <p>{`${group.numMemberships} Members, ${group.private=== true? 'Private': 'Public'} Group`}</p>
        <p>{`Organized By ${group.Organizer.firstName} ${group.Organizer.lastName}`}</p>
      </div>
    </div>
    <h3>About</h3>
    <div className='groupCardAbout'>
      <p>{group.about}</p>
      <div className='crud'>
      <NavLink to={`/groups/${groupId}/events/create`}>Create an Event</NavLink>
      <NavLink to={`/groups/${groupId}/update`}>Update This Group</NavLink>
      <NavLink to={`/groups/${groupId}/delete`}> Delete This Group</NavLink>
    </div>
    </div>
    <h3>Upcoming Events</h3>
  </div>)
}



export default GroupPage
