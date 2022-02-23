import React, { forwardRef, useImperativeHandle } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'

export const ToggleVisibilityComponent = forwardRef((props, ref) => {

  ToggleVisibilityComponent.displayName = 'Togglable'

  const newBlogDivDisplay = { display: props.show ? '' : 'none' }
  const createNoteBtnDisplay = { display: props.show ? 'none' : '' }

  const toggleVisibility = () => {
    props.setShow(!props.show)
  }

  useImperativeHandle(ref, () => {
    return{ toggleVisibility }})

  return(
    <div>
      <div style={createNoteBtnDisplay}>
        <Button variant="outline-secondary" onClick={() => props.setShow(true)}>Create new note</Button>
      </div>
      <div style={newBlogDivDisplay}>
        {props.children}
        <Button variant="outline-secondary" onClick={() => {props.setShow(false); document.getElementById('create-blog-form').reset()}}>Cancel</Button>
      </div>
    </div>
  )
})