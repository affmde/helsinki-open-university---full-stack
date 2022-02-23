import React, { forwardRef, useImperativeHandle } from 'react'

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
        <button onClick={() => props.setShow(true)}>Create new note</button>
      </div>
      <div style={newBlogDivDisplay}>
        {props.children}
        <button onClick={() => {props.setShow(false); document.getElementById('create-blog-form').reset()}}>Cancel</button>
      </div>
    </div>
  )
})