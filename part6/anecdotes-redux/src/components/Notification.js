import { connect } from "react-redux"

const Notification = (props) => {
  const notification = props.notification
  
  return (
    <div style={notification.data.style}>
      {notification.data.content}
    </div>
  )
}

const mapStateToProps = (state) =>{
  return{
    notification: state.notification
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications
