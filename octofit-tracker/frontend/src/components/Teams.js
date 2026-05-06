import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>&#128101; Teams</span>
        <span className="badge octofit-badge rounded-pill">{teams.length}</span>
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
                  <th>Team Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan={3} className="text-center text-muted py-3">No teams found.</td></tr>
                ) : teams.map((t, i) => (
                  <tr key={t._id || i}>
                    <td>{i + 1}</td>
                    <td>{t.name}</td>
                    <td>
                      {Array.isArray(t.members)
                        ? t.members.map((m, j) => (
                            <span key={j} className="badge bg-secondary me-1">{m}</span>
                          ))
                        : t.members}
                    </td>
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

export default Teams;
