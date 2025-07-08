import "./loading.css"

interface ILoadingBar {
  percentage?: number
  active: boolean
}

const LoadingBar = ({ percentage = 0, active }: ILoadingBar) => {
  return (
    <>
      {active && (
        <div className="loading-bar-container">
          {percentage === 0 ? (
            <div className="loading-bar-animated"></div>
          ) : (
            <div className="loading-bar" style={{ width: `${percentage}%` }}></div>
          )}
        </div>
      )}
    </>
  )
}

export default LoadingBar

