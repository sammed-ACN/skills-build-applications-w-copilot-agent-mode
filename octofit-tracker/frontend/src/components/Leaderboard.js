import React, { useEffect, useState } from 'react';

const MEDALS = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>&#127942; Leaderboard</span>
        <span className="badge octofit-badge rounded-pill">{entries.length}</span>
      </div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">Error: {error}</div>}
        {loading && <div className="text-center p-4"><div className="spinner-border text-primary" role="status" /></div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover table-striped octofit-table mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr><td colSpan={3} className="text-center text-muted py-3">No entries found.</td></tr>
                ) : entries.map((e, i) => (
                  <tr key={e._id || i}>
                    <td>{MEDALS[i] || i + 1}</td>
                    <td>{e.user}</td>
                    <td><span className="badge bg-success fs-6">{e.score}</span></td>
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

export default Leaderboard;
