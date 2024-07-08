const ToastMessage = ({ message , isError }) => {
    return (
      <p className={!isError ? "toast-message" : 'error-message'}>{message}</p>
    )
  }
  
  export default ToastMessage