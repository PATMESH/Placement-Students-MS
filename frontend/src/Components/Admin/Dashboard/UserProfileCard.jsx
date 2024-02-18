import React, { useState } from "react";
import { Modal, Descriptions, Tag } from "antd";
import "../../../Css/usercard.css";
import UserDetailsModal from "./UserDetailsModal";

const Card = ({ user, details , singleUser , setSingleUser , setDetails }) => {

  const showDetails = () => {
    setDetails(true);
  };

  const handleCancel = () => {
    setSingleUser("");
    setDetails(false);
  };

  return (
    <div className="user-card">
      <img
        src={
          "https://static.vecteezy.com/system/resources/previews/018/742/015/original/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png"
        }
        alt="User Avatar"
      />
      <h2>{user.name}</h2>
      <p>{user.role}</p>
      <ul>
        <li>{user.email}</li>
        <li>{user.phoneNumber}</li>
        <li>
          {user.degree}- {user.department}
        </li>
      </ul>
      <a href="#" onClick={()=>{showDetails();setSingleUser(user)}}>
        View Details
      </a>
    </div>
  );
};

export default Card;
