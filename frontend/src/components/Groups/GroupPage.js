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

  console.log("this is the group", group)

  if (!group) {
    return null
  }
  return (
  <div>
    <h1>{group.name}</h1>
    <NavLink to={`/groups/${groupId}/events/create`}>Create an Event</NavLink>
    <div>

      {/* i need to figure out how to make this load in asynchronously */}
      <img src = {group.GroupImages[1].url} alt="pokeball"></img>
    </div>
    <div>
      <h2>Details</h2>
      <p>{group.about}</p>
    </div>
    <div>
      <div>

      </div>
      <p>{group.private=== true? 'private': 'public'} </p>
    </div>
  </div>)
}



export default GroupPage
