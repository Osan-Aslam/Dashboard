import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [backlinks, setBacklinks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchBacklinks = async () => {
      try {
        const response = await axios.get('http://207.180.203.98:5059/api/Backlinks', {
          headers: {
            'Accept': 'text/plain',
          },
        });
        // console.log('Response: ', response.data);
        setBacklinks(response.data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    fetchBacklinks();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://207.180.203.98:5059/api/projects`, {
          headers: {
            'Accept': '*/*',
          }
        });
        // console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://207.180.203.98:5059/api/team-members");        
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMembers();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num;
  };

  const totalBacklinks = backlinks.length;
  const totalProjects = projects.length;
  const totalGuestPosts = backlinks.filter(b => b.dealType === "Guest Post").length;
  const totalLinkInsertions = backlinks.filter(b => b.dealType === "Link Insertion").length;
  const totalLostLinks = backlinks.filter(b => b.lostDate !== null).length;
  const totalDoFollow = backlinks.filter(b => b.linkType === "Follow").length;
  const totalNoFollow = backlinks.filter(b => b.linkType === "Nofollow").length;
  const totalSpent = backlinks.reduce((sum, b) => sum + (b.price || 0), 0).toFixed(2);
  const totalTeamMembers = teamMembers.length;
  return (

    <div className="d-flex align-items-start">
      <div className="tab-content py-4">
        <div className="tab-pane fade show active">
          <h3 className='ps-2 mb-3'>Dashboard</h3>
          <div className='dashboard me-2'>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">{totalBacklinks}</h3>
                <p className="card-text">Total Backlinks</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">{totalProjects}</h3>
                <p className="card-text">Total Projects</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">{totalTeamMembers}</h3>
                <p className="card-text">Team Members</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">${formatNumber(totalSpent)}</h3>
                <p className="card-text">Total Spent</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">{totalGuestPosts}</h3>
                <p className="card-text">Total Guest posts</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">{totalLinkInsertions}</h3>
                <p className="card-text">Total Link Insertion</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">{totalLostLinks}</h3>
                <p className="card-text">Total Lost Links</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">{totalDoFollow}</h3>
                <p className="card-text">Do Follow Links</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">{totalNoFollow}</h3>
                <p className="card-text">No Follow Links</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">250</h3>
                <p className="card-text">Total Guest posts</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">250</h3>
                <p className="card-text">Total Guest posts</p>
              </div>
            </div>
            <div className="card text-center mb-3">
              <div className="card-body">
                <h3 className="card-title mb-0">250</h3>
                <p className="card-text">Total Guest posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
