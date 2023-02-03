import React from 'react'
import {useLocation} from 'react-router-dom';

export default function Home() {
  const location = useLocation();

  return (
    <div>Home
        <p>Hello <b style={{textTransform: "capitalize"}}> {location.state.user.name}</b></p>
    </div>
  )
}
