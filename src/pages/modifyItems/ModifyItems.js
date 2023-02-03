import React from 'react'
import {useLocation} from 'react-router-dom';

export default function ModifyItems() {
    const location = useLocation();

  return (
    <div>ModifyItems

<p>Hello <b style={{textTransform: "capitalize"}}> {location.state.user.name}</b></p>
    </div>
  )
}
