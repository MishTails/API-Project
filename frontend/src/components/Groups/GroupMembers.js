import React from 'react'
import {useHistory, useParams,} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { thunkLoadGroups, thunkPostGroupImage} from '../../store/group'
import { thunkLoadMembers } from '../../store/membership'
import "../Navigation/Navigation.css"
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'



const GroupMembers = () => {
  const dispatch = useDispatch()
  const { groupId } = useParams()
  const history = useHistory()

  let groups
  let members
  const [image, setImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    dispatch(thunkLoadGroups())
    dispatch(thunkLoadMembers(groupId))
  }, [dispatch])

  const membersObj = useSelector(state=> state.memberships.allMembers)
  const groupsObj = useSelector(state => state.groups.allGroups)

  if(groupsObj) {
    groups = Object.values(groupsObj)
  }
  if (!groupsObj) {
    return null
  }
  if (membersObj) {
    members = Object.values(membersObj)
  }
  if (!membersObj) {
    return null
  }

  return (
    <div className='fullGroupMembers'>
      <div className='memberCard'>Group Members <NavLink className="backbutton" to={`/groups/${groupId}`}>Go Back</NavLink></div>
      <div className='memberCard'>

        {members && members.map(member => {
          return <div className='groupMemberRow'>
            <div className='groupMemberRowName'>
            {member.firstName} {member.lastName}
            </div>
            <div className='groupMemberRowStatus'>
            {member.Memberships[0].status}
            </div>
            <NavLink className="groupMemberNavlink" to={`/groups/${groupId}/members/${member.id}/edit`}>Edit</NavLink>
            </div>
        })}
      </div>
    </div>


  );
}

export default GroupMembers
