
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkLoadGroups, thunkLoadOneGroup, thunkRemoveGroup } from '../../store/group'

const GroupDelete = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const groupsObj = useSelector(state => state.groups.allGroups)
  const {groupId} = useParams()


  useEffect(() => {
    dispatch(thunkLoadGroups())
  }, [dispatch])
  if (!groupsObj) {
    return null
  }
  const deleteGroup = async () => {

    const myDelete = await dispatch(thunkRemoveGroup(groupId))
    history.push(`/groups`)
  }
  const goBack = () => {
    dispatch(thunkLoadOneGroup(groupId))
    history.push(`/groups/${groupId}`)
  }

  return (
    <div>
      <h2 className='textInput'>Are you sure you want to Delete this Group?</h2>
      <button
        className='formButton'
        onClick={deleteGroup}
        type="submit"
      >
        Yes
      </button>

      <button
        className='formButton'
        onClick={goBack}
        type="submit"
      >
        No
      </button>
    </div>
  );
}

export default GroupDelete
