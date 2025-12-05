import { useEffect, useState } from "react";

function CricketDashboard() {
  const [matches, setMatches] = useState([]);

  async function fetchData() {
  try {
    const API_KEY = import.meta.env.VITE_CRICKET_API_KEY;
    const res = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
    );
    const data = await res.json();

    if (data.data && data.data.length > 0) {
      setMatches(data.data);
    } else {
      const local = await fetch("/sample.json");
      const sample = await local.json();
      setMatches(sample.data);
    }
  } catch (error) {
    const local = await fetch("/sample.json");
    const sample = await local.json();
    setMatches(sample.data);
  }
}

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 60000); 
    return () => clearInterval(timer);
  }, []);

  return (
  <div className="container">
    <img src="/public/head_logo.jpg" alt="Cricket Logo" />
    <h1 className="title">LIVE CRICKET SCORES</h1>

    {matches.length === 0 && <p>No live matches</p>}

    {matches.map((m, i) => (
      <div key={i} className="card">
        <div className="match-name">{m.name}</div>
        <div className="status">{m.status}</div>

        {m.score?.map((s, j) => (
          <div key={j} className="score">
            <strong>{s.inning || "Inning"}:</strong> {s.r}/{s.w} in {s.o} overs
          </div>
        ))}
      </div>
    ))}

    <div className="footer">Auto-refresh every 1 minute</div>
  </div>
);

}

export default CricketDashboard;
