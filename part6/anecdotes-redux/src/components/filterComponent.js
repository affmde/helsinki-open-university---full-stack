import React from "react";
import { addFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
    const handleChange = (event) => {
      const content = event.target.value
      props.addFilter(content)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input type="text" name="filterInput" onChange={handleChange} placeholder="filter"/>
      </div>
    )
  }
  

  const mapDispatchToProps = {
    addFilter,
  }
  //export default Filter
  const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
  export default ConnectedFilter