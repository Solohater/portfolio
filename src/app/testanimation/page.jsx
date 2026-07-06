'use client'

import React from 'react'
import {motion} from 'framer-motion'

const TestPage = () => {

    const variants = {
        variant1:{
            x: 300, y:200, opacity:0.5 
        },
        variant2:{
            x: 100, y:-200, rotation: 90 
        }
    }
  return (
    <div className='h-full flex items-center  justify-center'>
        <motion.div 
        className='w-60 h-60 bg-red-400 rounded' 
        initial={{ x: -100 }}
        variants={variants}
        animate="variant2"
        transition={{delay:2, duration:4}}
        ></motion.div>
    </div>
  )
}

export default TestPage