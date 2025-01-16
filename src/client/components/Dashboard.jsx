import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const Dashboard = ({ userData, communities, handleLogout, numberOfPosts }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="name-image" style={{display:'flex', flexDirection:'row'
        }}>
          <Avatar
            name={userData.name}
            size="100"
            round={true}
            style={{marginBottom:'2%'}}
            className="post-avatar"
          />
          <h1>Welcome, <span style={{color:'#06ba63'}}>{userData.name || "User"}</span>!</h1>
          
        </div>
      
        <Link to="/me" className="logout">
          My Profile <CgProfile size={25} />
        </Link>
        <div className="logout" onClick={handleLogout}>
          Logout <BiLogOutCircle size={25} />
        </div>
        <h3 className="email"><MdEmail /> {userData.email}</h3>
      </header>
      <main className="dashboard-content">
        <div className="communities-stats-container">
          <div className="communities-section">
            <h3>Your Communities</h3>
            <ul className="community-list">
              {communities.map((community) => (
                <li key={community.id} className="community-item">
                  {community.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="stats-section">
            <div className="stat">
              <h1 className="stat-number">{numberOfPosts}</h1>
              <p className="stat-label">Posts</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
