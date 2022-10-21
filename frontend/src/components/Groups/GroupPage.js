import React from 'react'
import { useParams} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadGroups, thunkLoadOneGroup } from '../../store/group'
import { NavLink } from 'react-router-dom'



const GroupPage = () => {
  const dispatch = useDispatch()
  const { groupId } = useParams()
  const group = useSelector(state => state.groups.singleGroup)
  const allGroups = useSelector(state => state.groups.allGroups)
  const session = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(thunkLoadOneGroup(groupId))
    dispatch(thunkLoadGroups())
  }, [dispatch, groupId,])


  if (!group || !allGroups) {
    return null
  }

  // if (!group.GroupImages[0]) {
  //   group.GroupImages[0] = {url: null}
  // }

  return (
  <div className='groupCardFull'>


    <div className='groupDetailCard'>
      <div>
          {/* i need to figure out how to make this load in asynchronously */}

          <img className="groupPageImage" src={allGroups[groupId].previewImage} alt={allGroups[groupId].previewImage ? allGroups[groupId].previewImage: 'no'} width={200}></img>
      </div>
      <div className='bubbleBorder'>
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
        {session.id===group.organizerId ? <NavLink to={`/groups/${groupId}/addImage`}>Add an Image</NavLink>: ""}
        {session.id===group.organizerId ? <NavLink to={`/groups/${groupId}/events/create`}>Create an Event</NavLink> : ""}
        {session.id===group.organizerId ? <NavLink to={`/groups/${groupId}/update`}>Update This Group</NavLink> : ""}
        {session.id===group.organizerId ? <NavLink to={`/groups/${groupId}/delete`}> Delete This Group</NavLink> : ""}
    </div>
    </div>
  </div>)
}



export default GroupPage
