import React from 'react'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { thunkLoadEvents } from '../../store/event'
import github from '../../assets/gitLogo.png'
import linkedin from '../../assets/linkedinLogo.png'
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
    <div className='splash-footer'>
        <div className='splash-footer-company'>
          <div className='splash-footer-bold'>
            Company
          </div>
          <div className='splash-footer-light'>
            App Academy
          </div>
        </div>
        <div className='splash-footer-developer'>
          <div className='splash-footer-bold'>
            Developer
          </div>
          <div className='splash-footer-light'>
            Jarrod Mishima
           <a target="_blank" href="https://github.com/MishTails">
            <img className='git' src={github}></img>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/jarrod-mishima-50abb0172/">
            <img className='linkedin' src={linkedin}></img>
            </a>
          </div>
        </div>
        <div className='splash-footer-features'>
          <div className='splash-footer-bold'>
            Site
          </div>
          <div className='splash-footer-light'>
            Meetup Clone
          </div>
        </div>
        <div className='splash-footer-other'>
          <div className='splash-footer-language'>
            <div className='splash-footer-bold'>
              Language
            </div>
            <div className='splash-footer-light'>
              English
           </div>
          </div>

        </div>
      </div>
    </div>

  )
}



export default HomeIndex
