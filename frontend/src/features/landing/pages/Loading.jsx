import "../loading.scss"

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-page">
      {/* Animated background shapes */}
      <div className="loading-bg-shapes">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
      </div>

      {/* Centered content */}
      <div className="loading-content">
        {/* Spinner */}
        <div className="loading-spinner">
          <div className="spinner-ring spinner-ring--outer"></div>
          <div className="spinner-ring spinner-ring--inner"></div>
          <div className="spinner-dot"></div>
        </div>

        {/* Message */}
        <p className="loading-message">{message}</p>

      </div>
    </div>
  )
}

export default Loading