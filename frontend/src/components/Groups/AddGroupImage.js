import React from 'react'
import {useHistory, useParams,} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { thunkLoadGroups, thunkPostGroupImage } from '../../store/group'
import "../Navigation/Navigation.css"



const AddGroupImage = () => {
  const dispatch = useDispatch()
  const { groupId } = useParams()
  const history = useHistory()

  let groups

  const [image, setImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = []
    if (image.length === 0) {
      errors.push("Image is required")
    }
    setValidationErrors(errors)
  }, [image])

  useEffect(() => {
    dispatch(thunkLoadGroups())
  }, [dispatch])

  const groupsObj = useSelector(state => state.groups.allGroups)

  if(groupsObj) {
    groups = Object.values(groupsObj)
    console.log(groups)
  }
  if (!groupsObj) {
    return null
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    let preview = {
      groupId,
      url: image,
      preview: true
    }
  await dispatch(thunkPostGroupImage(preview))

    history.push(`/groups/${groupId}`)
  }

  return (
    <form className="form"
      onSubmit={submitHandler}
    >
      <h2>Add an Image</h2>
      <ul className="errors">
        {validationErrors.length > 0 && validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Image
        <input
          type="text"
          name="image"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
      </label>
      <button
      className='formButton'
        type="submit"
        disabled={!!validationErrors.length}
      >
        Submit
      </button>
    </form>
  );
}

export default AddGroupImage
