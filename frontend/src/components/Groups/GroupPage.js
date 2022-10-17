import React from 'react'
import { useParams} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { thunkLoadOneGroup } from '../../store/group'



const GroupPage = () => {
  const dispatch = useDispatch()
  const { groupId } = useParams()
  const group = useSelector(state => state.groups)

  useEffect(() => {
    dispatch(thunkLoadOneGroup(groupId))
  }, [dispatch, groupId])


  return (
  <div>
    <h1>{group.name}</h1>
    <div>

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
