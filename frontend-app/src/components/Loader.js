import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

function Loader() {
  return (
    <Spinner 
        animation='border'
        variant='secondary'
        role='status'
        // style={{
        //     height:'1oopx',
        //     width:'100px',
        //     margin:'auto',
        //     display:'block'
        // }}
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}

export default Loader
