import React, { useState } from 'react'
import './style.css'

const ThemeChanger = () => {

    const [theme, setTheme] = useState(true)

    const handleTheme =()=>{
     const body =  document.querySelector('body')
     if(body.classList.contains('dark')){
        body.classList.remove('dark')
        body.classList.add('light')
     }else{
        body.classList.remove('light')
        body.classList.add('dark')
     }
       setTheme(!theme)
    }
    
   

  return (
    <div className='theme-button'>
        <i className={theme ? 'bi bi-moon' : 'bi bi-sun'}onClick={handleTheme}></i>
    </div>
  )
}

export default ThemeChanger