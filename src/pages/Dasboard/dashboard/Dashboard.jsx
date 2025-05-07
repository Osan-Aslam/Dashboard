import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [backlinks, setBacklinks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  //fetch all backlinks from api
  useEffect(() => {
    const fetchBacklinks = async () => {
      try {
        const response = await axios.get('http://207.180.203.98:5030/api/Backlinks', {
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
  //fetch all projects from api
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://207.180.203.98:5030/api/projects`, {
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
  //fetch all team Members from api
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://207.180.203.98:5030/api/team-members");
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMembers();
  }, []);

  // format value for convert it 1000 into 1k
  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num;
  };

  // for display values and its length
  const totalBacklinks = backlinks.length;
  const totalProjects = projects.length;
  const totalGuestPosts = backlinks.filter(b => b.dealType === "Guest Post").length;
  const totalLinkInsertions = backlinks.filter(b => b.dealType === "Link Insertion").length;
  const totalLostLinks = backlinks.filter(b => b.lostDate !== null).length;
  const totalDoFollow = backlinks.filter(b => b.linkType === "Follow").length;
  const totalNoFollow = backlinks.filter(b => b.linkType === "NoFollow").length;
  const totalSpent = backlinks.reduce((sum, b) => sum + (b.price || 0), 0).toFixed(2);
  const totalTeamMembers = teamMembers.length;

  // Stats for dashboard values
  const dashboardStats = [
    { value: totalBacklinks, label: 'Total Backlinks' },
    { value: totalProjects, label: 'Total Projects' },
    { value: totalTeamMembers, label: 'Team Members' },
    { value: `${formatNumber(totalSpent)}`, label: 'Total Spent' },
    { value: totalGuestPosts, label: 'Total Guest posts' },
    { value: totalLinkInsertions, label: 'Total Link Insertion' },
    { value: totalLostLinks, label: 'Total Lost Links' },
    { value: totalDoFollow, label: 'Do Follow Links' },
    { value: totalNoFollow, label: 'No Follow Links' },
  ];
  return (

    <div className="d-flex align-items-start">
      <div className="tab-content py-4">
        <div className="tab-pane fade show active">
          <h3 className='ps-2 mb-3'>Dashboard</h3>
          <div className='dashboard me-2'>
            {dashboardStats.map((stat, index) => (
              <div className="card text-center mb-3" key={index}>
                <div className="card-body">
                  <h3 className="card-title mb-0">{stat.value}</h3>
                  <p className="card-text">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
