
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkPutGroup, thunkLoadGroups } from '../../store/group'
import "../Navigation/Navigation.css"
const EditGroupMember = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const {groupId, memberId} = useParams()
  const [status, setStatus] = useState('')


  const groupsObj = useSelector(state => state.groups.allGroups)
  let groups

  useEffect(() => {
    dispatch(thunkLoadGroups())
  }, [dispatch])

  useEffect(() => {
    // setName(groupsObj[groupId].name)
  }, [groupId, groupsObj])

  if(groupsObj) {
    groups = Object.values(groupsObj)
    console.log(groups)
  }
  if (!groupsObj) {
    return null
  }



  const submitHandler = async (e) => {
    e.preventDefault()
    let group = {
      memberId,
      status
    }
    console.log(group)
    // await dispatch(thunkPutGroup(group))
    history.push('/groups')
  }

  return (
    <form
      className="form"
      onSubmit={submitHandler}
    >
      {console.log(groupId, memberId)}
      <h2>Edit Member Status</h2>
      <label>
        Name
        <select name="status" id="status" onChange={e => setStatus(e.target.value)} >
          <option value="nope">--select a status--</option>
          <option value="pending">pending</option>
          <option value="co-host">co-host</option>
          <option value="member">member</option>
        </select>
      </label>


      <button
      className='formButton'
        type="submit"
        disabled={status===''}
      >
        Submit
      </button>
    </form>
  );
}

export default EditGroupMember
