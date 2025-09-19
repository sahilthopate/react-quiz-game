import './Error.css';

export default function Error({ onRetry }) {
  return (
    <div className="error-container">
      <div className="error-card">
        <span className="error-icon">⚠️</span>
        <p className="error-text">
          Oops! There was an error while fetching question data.
        </p>
        {onRetry && (
          <button className="btn btn-light retry-btn" onClick={onRetry}>
            🔄 Try Again
          </button>
        )}
      </div>
    </div>
  );
}
