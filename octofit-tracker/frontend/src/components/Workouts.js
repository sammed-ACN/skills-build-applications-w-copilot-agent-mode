import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>&#127947; Workouts</span>
        <span className="badge octofit-badge rounded-pill">{workouts.length}</span>
      </div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">Error: {error}</div>}
        {loading && <div className="text-center p-4"><div className="spinner-border text-primary" role="status" /></div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover table-striped octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr><td colSpan={3} className="text-center text-muted py-3">No workouts found.</td></tr>
                ) : workouts.map((w, i) => (
                  <tr key={w._id || i}>
                    <td>{i + 1}</td>
                    <td><strong>{w.name}</strong></td>
                    <td>{w.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
