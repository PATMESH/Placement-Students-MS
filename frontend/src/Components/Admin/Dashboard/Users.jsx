// Users.js
import React, { useEffect, useState } from 'react';
import UserProfileCard from './UserProfileCard';
import '../../../Css/usercard.css';
import UserDetailsModal from './UserDetailsModal';

const Users = ({ filter }) => {
  const [users, setUsers] = useState([]);
  const [details,setDetails] = useState(false);
  const [singleUser , setSingleUser] = useState();

  useEffect(() => {
    const fetchUsers = () => {
      fetch("http://localhost:8000/users")
        .then((data) => data.json())
        .then((data) => setUsers(data));
    };

    fetchUsers();
  }, []);

  const filteredUsers = filter === 'All' ? users : users.filter(user => user.department === filter);

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'start',
    height: '100%',
    padding: '10px',
    overflow: 'auto',
  };

  const onBack=()=>{
    setDetails(false);
  }

  if(details){
    return (
      <UserDetailsModal user={singleUser} onBack={onBack}/>
    );
  }
  return (
    <div className="responsive-card-container" style={cardContainerStyle}>
      {filteredUsers.map(user => (
        <div key={user.id} className="responsive-card">
          <UserProfileCard user={user} details={details} singleUser={singleUser} setSingleUser={setSingleUser} setDetails={setDetails}></UserProfileCard>
        </div>
      ))}
    </div>
  );
};

export default Users;
