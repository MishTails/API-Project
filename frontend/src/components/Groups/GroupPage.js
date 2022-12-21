import React from 'react'
import { useParams, NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadGroups, thunkLoadOneGroup } from '../../store/group'
import { thunkPostMember, thunkRemoveMember } from '../../store/membership'
import "../Navigation/Navigation.css"

const GroupPage = () => {
  const dispatch = useDispatch()
  const { groupId } = useParams()
  let session = useSelector(state => state.session.user)
  const group = useSelector(state => state.groups.singleGroup)
  const ImageGroup = useSelector(state => state.groups.allGroups)
  const GroupImages = useSelector(state => state.GroupImages)

  useEffect(() => {
    dispatch(thunkLoadOneGroup(groupId))
    dispatch(thunkLoadGroups())
  }, [dispatch, groupId,])


  if (!group || !ImageGroup) {
    return null
  }

  if (!session) {
    session = {id: "not logged in"}
  }

  // if (!group.GroupImages[0]) {
  //   group.GroupImages[0] = {url: null}
  // }

  return (
  <div className='groupCardFull'>
    <div className='groupDetailCard'>
      <div>
          <img className="groupPageImage" src={ImageGroup[groupId].previewImage?ImageGroup[groupId].previewImage:GroupImages[groupId]} alt="myImage" width={200}></img>
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
        {<NavLink to={`/groups`}> Join this Group</NavLink>}
        {<NavLink to={`/groups`}> Leave this Group</NavLink>}
    </div>
    </div>
  </div>)
}



export default GroupPage
