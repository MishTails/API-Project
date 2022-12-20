import React from 'react'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { thunkLoadEvents } from '../../store/event'
import "./index.css"


const HomeIndex = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(thunkLoadEvents())
  }, [dispatch])

  return (
    <div className='fullsite'>
    <link href="./index.css" rel="stylesheet"/>
    <div>
      <h1>Welcome to Catchup, a Pokemon Site based on Meetup</h1>
      <img src='https://media.tenor.com/_B4QaT_C3WsAAAAM/bulbasaur-pokemon.gif'></img>
    </div>

    </div>

  )
}



export default HomeIndex
