import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a259ff', '#ffbb28', '#00C49F', '#FF8042'];

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(120deg, #12001a 0%, #240046 100%)',
    color: 'white',
    fontFamily: "'Press Start 2P', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: 'hidden',
    paddingBottom: '3rem',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 2rem',
    background: 'linear-gradient(to right, #6c2ebf, #b266ff)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '2.3rem',
    fontWeight: 'bold',
    color: 'white',
  },
  logoIcon: {
    fontSize: '1.8rem',
    marginRight: '8px',
  },
  logoutBtn: {
    background: '#3f058aff',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '0.7rem 1.5rem',
    fontSize: '1rem',
    fontFamily: "'Press Start 2P', Tahoma, Geneva, Verdana, sans-serif",
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'background 0.2s',
    marginLeft: '2rem'
  },
  section: {
    maxWidth: '1500px',
    margin: '3rem auto 0 auto',
    padding: '2rem',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '20px',
    boxShadow: '0 6px 32px rgba(162, 89, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  sectionTitle: {
    color: '#a259ff',
    fontSize: '2.2rem',
    fontWeight: 800,
    marginBottom: '2rem',
    letterSpacing: '1px',
    textAlign: 'center',
  },
  chartsRow: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chartCard: {
    flex: 1,
    minWidth: 350,
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 20px rgba(162, 89, 255, 0.08)',
    border: '1px solid rgba(162, 89, 255, 0.2)',
  },
  playerList: {
    background: 'rgba(255,255,255,0.07)',
    borderRadius: '20px',
    padding: '2rem',
    marginTop: '2rem',
    boxShadow: '0 4px 20px rgba(162, 89, 255, 0.08)',
    border: '1px solid rgba(162, 89, 255, 0.2)',
  },
  playerItem: {
    color: '#c7b6f7',
    fontSize: '1.1rem',
    marginBottom: '0.7rem',
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '0.5rem',
    borderBottom: '1px solid rgba(162, 89, 255, 0.1)',
  },
  playerName: {
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerRfid: {
    flex: 1,
    textAlign: 'center',
    color: '#82ca9d',
    fontSize: '1.1rem',
  },
  playerPoints: {
    flex: 1,
    textAlign: 'center',
    color: '#a259ff',
    fontWeight: 'bold',
  },
  adminBadge: {
    backgroundColor: '#ff8042',
    color: 'white',
    padding: '0.2rem 0.5rem',
    borderRadius: '5px',
    fontSize: '0.8rem',
    marginLeft: '1rem',
  },
  loadingText: {
    color: '#a259ff',
    fontSize: '1.2rem',
    textAlign: 'center',
    padding: '2rem',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: '1.2rem',
    textAlign: 'center',
    padding: '2rem',
  },
};

const AdminDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Static data for analytics
  const staticTopPlayers = [
    { name: 'Player1', value: 150 },
    { name: 'Player2', value: 120 },
    { name: 'Player3', value: 95 },
    { name: 'Player4', value: 80 },
    { name: 'Player5', value: 65 }
  ];

  const staticPointsDistribution = [
    { name: 'Player1', value: 150 },
    { name: 'Player2', value: 120 },
    { name: 'Player3', value: 95 },
    { name: 'Player4', value: 80 },
    { name: 'Player5', value: 65 },
    { name: 'Others', value: 190 }
  ];

  // Daily Active Users data
  const dauData = [
    { day: 'Mon', users: 45 },
    { day: 'Tue', users: 52 },
    { day: 'Wed', users: 48 },
    { day: 'Thu', users: 61 },
    { day: 'Fri', users: 78 },
    { day: 'Sat', users: 89 },
    { day: 'Sun', users: 73 }
  ];

  // total balls drop data
  const sessionData = [
    { month: 'Jan', total: 25 },
    { month: 'Feb', total: 28 },
    { month: 'Mar', total: 32 },
    { month: 'Apr', total: 29 },
    { month: 'May', total: 35 },
    { month: 'Jun', total: 31 }
  ];

  // Games Played data
  const gamesData = [
    { week: 'Week 1', games: 142 },
    { week: 'Week 2', games: 158 },
    { week: 'Week 3', games: 176 },
    { week: 'Week 4', games: 164 },
    { week: 'Week 5', games: 189 },
    { week: 'Week 6', games: 203 }
  ];

  // Peak Play Times data
  const peakTimesData = [
    { hour: '6AM', activity: 5 },
    { hour: '8AM', activity: 12 },
    { hour: '10AM', activity: 18 },
    { hour: '12PM', activity: 25 },
    { hour: '2PM', activity: 35 },
    { hour: '4PM', activity: 42 },
    { hour: '6PM', activity: 58 },
    { hour: '8PM', activity: 67 },
    { hour: '10PM', activity: 45 },
    { hour: '12AM', activity: 23 }
  ];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/players/');
        console.log('Players data:', response.data); // Debug log
        setPlayers(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching players:', err);
        setError('Failed to load players. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const mostPlayedData = staticTopPlayers;
  const pointsRankingData = staticPointsDistribution;

 // Logout handler
  const handleLogout = () => {
       localStorage.clear();
    navigate('/login');
    // Show success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #00C49F, #82ca9d);
      color: white;
      padding: 1rem 2rem;
      border-radius: 10px;
      font-family: 'Press Start 2P', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 0.9rem;
      z-index: 10000;
      box-shadow: 0 4px 20px rgba(0, 196, 159, 0.3);
      animation: slideIn 0.3s ease-out;
    `;
    notification.innerHTML = '✓ Successfully logged out!';
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, 300);
    }, 3000);
  };

  // Custom tooltip styles
  const customTooltipStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid #a259ff',
    borderRadius: '8px',
    color: 'white',
    fontSize: '12px',
    padding: '8px'
  };


  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🎮</span>
          <span>ArPi Admin</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{fontSize: '1.1rem', color: '#fff', fontWeight: 'bold'}}>Dashboard</div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Analytics Section */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Analytics</div>
        <div style={styles.chartsRow}>
          {/* Bar Chart - Top 5 Players */}
          <div style={styles.chartCard}>
            <h2 style={{color: '#a259ff', fontSize: '1.3rem', marginBottom: '1rem'}}>Top 5 Players by Points</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mostPlayedData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="value" fill="#a259ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart - Points Distribution */}
          <div style={styles.chartCard}>
            <h2 style={{color: '#a259ff', fontSize: '1.3rem', marginBottom: '1rem'}}>Points Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pointsRankingData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                >
                  {pointsRankingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Second Row of Charts */}
        <div style={styles.chartsRow}>
          {/* Daily Active Users */}
          <div style={styles.chartCard}>
            <h2 style={{color: '#a259ff', fontSize: '1.3rem', marginBottom: '1rem'}}>Daily Active Users</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dauData}>
                <XAxis dataKey="day" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#00C49F" strokeWidth={3} dot={{ fill: '#00C49F', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Total Balls Drop */}
          <div style={styles.chartCard}>
            <h2 style={{color: '#a259ff', fontSize: '1.3rem', marginBottom: '1rem'}}>Total Balls Drop</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sessionData}>
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Third Row of Charts */}
        <div style={styles.chartsRow}>
          {/* Games Played */}
          <div style={styles.chartCard}>
            <h2 style={{color: '#a259ff', fontSize: '1.3rem', marginBottom: '1rem'}}>Games Played Weekly</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gamesData}>
                <XAxis dataKey="week" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="games" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Peak Play Times */}
          <div style={styles.chartCard}>
            <h2 style={{color: '#a259ff', fontSize: '1.3rem', marginBottom: '1rem'}}>Peak Play Times</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={peakTimesData}>
                <XAxis dataKey="hour" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Area type="monotone" dataKey="activity" stroke="#ffbb28" fill="#ffbb28" fillOpacity={0.7} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

     {/* Player List Section */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>All Players ({players.length})</div>
        <div style={styles.playerList}>
          {loading ? (
            <div style={styles.loadingText}>Loading players...</div>
          ) : error ? (
            <div style={styles.errorText}>{error}</div>
          ) : players.length === 0 ? (
            <div style={styles.loadingText}>No players found.</div>
          ) : (
            <div>
              {players.map(player => (
                <div key={player.id} style={styles.playerItem}>
                  <div style={styles.playerName}>
                    {player.name}
                    {player.is_admin && (
                      <span style={styles.adminBadge}>ADMIN</span>
                    )}
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', color: '#82ca9d', fontSize: '1.1rem' }}>
                    RFID: {player.rfid_number}
                  </div>
                  <div style={styles.playerPoints}>
                    {player.points || 0} pts
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;