const Notification = ({ message, errorMessage }) => {
  const messageStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 20,
  }

  const errorMessageStyle = {
    color: "red",
    fontStyle: "italic",
    fontSize: 20,
  }

  if (message === null && errorMessage === null) {
    return null
  }

  return (
    <div>
      <p style={message ? messageStyle : errorMessageStyle}>{message ? message : errorMessage}</p>
    </div>
  )
}

export default Notification