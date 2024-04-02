import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Dropdown, Button, Menu } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCamera, faEdit, faFileAlt, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { id } = useParams();
  const [imgFile, setImgFile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const[imgupload, SetImgUpload] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/${id}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const userData = await response.json();
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id,loading]);

  if (!user) {
    return (
      <div className="loading-container">
        <LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} />
      </div>
    );
  }


  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    console.log(file);
    SetImgUpload(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };


  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={()=>navigate(`/edit-details/${id}`)} style={{color:'blue'}}>Edit Details <FontAwesomeIcon icon={faEdit}/> </Menu.Item>
      <Menu.Item key="2" onClick={()=>SetImgUpload(true)} style={{color:'darkviolet'}}>Upload Profile <FontAwesomeIcon icon={faUser}/></Menu.Item>
      <Menu.Item key="3" onClick={()=>navigate("/")} style={{color:'red'}}>Logout <FontAwesomeIcon icon={faRightFromBracket}/></Menu.Item>
    </Menu>
  );


  return (
    <div className="profile-container" style={{ padding: "14px" }}>
      <div className="profile-main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card" style={{ backgroundColor: "white", padding:'4px'}}>
              <div className="card-body">
                <div style={{
                  position: 'absolute', 
                  top: 15, 
                  right: 15, 
                  fontWeight: 'bold'}}>
                    <Dropdown overlay={menu}>
                      <Button style={{ fontWeight: 'bold' }}>
                      <FontAwesomeIcon icon={faBars}/>
                      </Button>
                    </Dropdown>
                  </div>
                <div className="d-flex flex-column align-items-center text-center">
                {imgupload ? (
                    <div className="rounded-circle img-upload" onClick={handleClick}>
                      <FontAwesomeIcon icon={faCamera}/>
                    </div>
                  ) : (
                    imgFile instanceof Blob ? (
                      <img
                        src={URL.createObjectURL(imgFile)}
                        alt="Admin"
                        className="rounded-circle"
                        style={{height:'80px', width:'80px', objectFit: 'cover'}}
                      />
                    ) : (
                      <img
                        src={
                          user.gender === "Male"
                            ? "https://bootdey.com/img/Content/avatar/avatar7.png"
                            : "https://bootdey.com/img/Content/avatar/avatar8.png"
                        }
                        alt="Admin"
                        className="rounded-circle"
                        width="80"
                        height="80"
                      />
                    )
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="file-input"
                    style={{ display: 'none' }} 
                  />
                  <div className="mt-2">
                    <h5 style={{ fontWeight: "bold" }}>
                      {user.name.toUpperCase()}
                    </h5>
                    <p
                      className="text-secondary mb-3"
                      style={{ fontWeight: "bold" }}
                    >
                      Full Stack Developer
                    </p>
                    <span
                      className="text-muted font-size-sm mb-1"
                      style={{ fontWeight: "bold" }}
                    >
                      {user.email}
                    </span>
                    <div className="mt-3"></div>
                    <span
                      className="text-secondary"
                      style={{ fontWeight: "bold" }}
                    >
                      {user.phoneNumber}
                    </span>
                    <div className="mt-4"></div>
                    <button
                      className="btn btn-primary"
                      onClick={() => window.open(user.resumeDriveLink)}
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="file-icon" /> Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3" style={{padding:'12px'}}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-globe mr-2 icon-inline"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Website
                  </h6>
                  <a
                    href={user.portfolioLink}
                    class="text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "2px" }}
                  >
                    {user.portfolioLink.length > 22 ? `${user.portfolioLink.substring(0, 22)}...` : user.portfolioLink}
                  </a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      id="Github"
                      width={24}
                      height={24}
                    >
                      <path
                        fill="#a63ebf"
                        d="M31.999 1.646C14.881 1.646 1 15.579 1 32.771c0 13.749 8.881 25.415 21.204 29.53 1.549.287 2.114-.674 2.114-1.5 0-.738-.027-2.695-.042-5.293-8.625 1.883-10.444-4.172-10.444-4.172-1.408-3.596-3.44-4.551-3.44-4.551-2.816-1.932.212-1.895.212-1.895 3.11.219 4.747 3.209 4.747 3.209 2.768 4.756 7.258 3.381 9.024 2.584.279-2.01 1.082-3.383 1.967-4.16-6.882-.787-14.118-3.455-14.118-15.38 0-3.397 1.207-6.176 3.19-8.354-.321-.787-1.384-3.95.222-8.234 0 0 2.604-.836 8.525 3.19 2.473-.69 5.125-1.035 7.762-1.049 2.631.014 5.285.358 7.762 1.049 5.916-4.026 8.516-3.19 8.516-3.19 1.69 4.284.627 7.447.227 8.234 1.988 2.178 3.188 4.956 3.188 8.354 0 11.955-7.248 14.585-14.154 15.357 1.113.961 2.104 2.859 2.104 5.764 0 4.162-.037 7.516-.037 8.537 0 .834.559 1.803 2.131 1.496C54.127 58.174 63 46.516 63 32.771 63 15.579 49.119 1.646 31.999 1.646z"
                        class="color3e77bf svgShape"
                      ></path>
                      <path
                        fill="#a63ebf"
                        d="M31.999 1.646C14.881 1.646 1 15.579 1 32.771c0 13.749 8.881 25.415 21.204 29.53 1.549.287 2.114-.674 2.114-1.5 0-.738-.027-2.695-.042-5.293-8.625 1.883-10.444-4.172-10.444-4.172-1.408-3.596-3.44-4.551-3.44-4.551-2.816-1.932.212-1.895.212-1.895 3.11.219 4.747 3.209 4.747 3.209 2.768 4.756 7.258 3.381 9.024 2.584.279-2.01 1.082-3.383 1.967-4.16-6.882-.787-14.118-3.455-14.118-15.38 0-3.397 1.207-6.176 3.19-8.354-.321-.787-1.384-3.95.222-8.234 0 0 2.604-.836 8.525 3.19 2.473-.69 5.125-1.035 7.762-1.049 2.631.014 5.285.358 7.762 1.049 5.916-4.026 8.516-3.19 8.516-3.19 1.69 4.284.627 7.447.227 8.234 1.988 2.178 3.188 4.956 3.188 8.354 0 11.955-7.248 14.585-14.154 15.357 1.113.961 2.104 2.859 2.104 5.764 0 4.162-.037 7.516-.037 8.537 0 .834.559 1.803 2.131 1.496C54.127 58.174 63 46.516 63 32.771 63 15.579 49.119 1.646 31.999 1.646z"
                        class="color3e77bf svgShape"
                      ></path>
                      <path
                        fill="#6c1182"
                        d="M48.312 14.642c1.641 4.238.594 7.366.275 8.147 1.988 2.178 3.188 4.956 3.188 8.354 0 11.955-7.248 14.585-14.154 15.357 1.113.961 2.104 2.859 2.104 5.764 0 4.162-.037 7.516-.037 8.537 0 .834.559 1.803 2.131 1.496C54.127 58.174 63 46.516 63 32.771c0-3.695-.644-7.237-1.821-10.525-4.274-4.5-9.031-7.497-12.867-7.604zM25.122 48.166c.348-.702.773-1.248 1.22-1.643-3.772-.432-7.646-1.439-10.381-4.218 2.104 3.502 5.53 5.095 9.161 5.861z"
                        class="color114c82 svgShape"
                      ></path>
                      <path
                        fill="#c048dd"
                        d="M2.614 34.869c0-17.192 13.881-31.125 22.999-31.125 9.505 0 18.007 4.299 23.692 11.061C51.69 6.845 42.452 1.646 31.999 1.646 14.881 1.646 1 15.579 1 32.771A31.04 31.04 0 0 0 8.344 52.87a31.03 31.03 0 0 1-5.73-18.001z"
                        class="color6ca9ea svgShape"
                      ></path>
                      <path
                        fill="#540866"
                        d="M41.339 54.363c0-2.904-.991-4.805-2.104-5.766 6.906-.77 14.155-3.402 14.155-15.356 0-3.398-1.2-6.175-3.19-8.353.322-.787 1.387-3.951-.227-8.234 0 0-.322-.099-.987-.061.726 3.23-.052 5.54-.319 6.196 1.988 2.178 3.188 4.956 3.188 8.354 0 11.955-7.248 14.585-14.154 15.357 1.113.961 2.104 2.859 2.104 5.764 0 4.162-.037 7.516-.037 8.537 0 .734.437 1.571 1.615 1.551.008-1.407.036-4.394.036-7.989z"
                        class="color083e66 svgShape"
                      ></path>
                      <path
                        fill="#6c1182"
                        d="M15.683 54c.651 1.34 2.839 4.55 8.611 3.874-.008-.706-.014-1.497-.018-2.366-4.453.972-7.082-.174-8.593-1.508z"
                        class="color114c82 svgShape"
                      ></path>
                      <path
                        fill="#c048dd"
                        d="M16.796 49.924a7.655 7.655 0 0 0-1.113-1.318c.351.521.724.958 1.113 1.318z"
                        class="color6ca9ea svgShape"
                      ></path>
                    </svg>
                    &nbsp;&nbsp;Github
                  </h6>
                  <a
                    href={user.githubLink}
                    class="text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "2px" }}
                  >
                    {user.githubLink.length > 22 ? `${user.githubLink.substring(0, 22)}...` : user.githubLink}
                  </a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      viewBox="0 0 24 24"
                      id="leetcode"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#B3B1B0"
                        d="M22,14.355c0-0.742-0.564-1.345-1.26-1.345H10.676c-0.696,0-1.26,0.604-1.26,1.345c0,0.742,0.564,1.346,1.26,1.346H20.74C21.436,15.701,22,15.098,22,14.355L22,14.355z"
                      ></path>
                      <path
                        fill="#9C9A99"
                        d="M22,14.355H9.416l0,0c0,0.742,0.564,1.346,1.26,1.346H20.74C21.436,15.701,22,15.098,22,14.355L22,14.355L22,14.355z"
                      ></path>
                      <path
                        fill="#C98F1B"
                        d="M4.781,14.355H4.735c0.015,0.736,0.315,1.474,0.897,2.068c1.229,1.336,2.639,2.65,3.96,3.974l0.204,0.198c0.469,0.223,0.473,1.25,0.182,1.671c-0.31,0.449-0.71,0.729-1.271,0.729c-0.02,0-0.041,0-0.062-0.001c-0.2-0.007-0.364-0.087-0.53-0.181c-0.035-0.02-0.07-0.04-0.104-0.062C8.963,23.593,10.221,24,11.599,24c1.484,0,2.83-0.511,3.804-1.494l2.589-2.637c0.51-0.514,0.492-1.365-0.039-1.9c-0.272-0.275-0.627-0.413-0.978-0.413c-0.332,0-0.659,0.124-0.906,0.374l-2.676,2.607c-0.462,0.467-1.102,0.662-1.808,0.662c-0.706,0-1.346-0.195-1.81-0.662l-4.297-4.363C5.024,15.716,4.79,15.052,4.781,14.355L4.781,14.355z"
                      ></path>
                      <path
                        fill="#060605"
                        d="M4.735,14.355H1.918c0.006,1.485,0.595,2.945,1.739,4.101c1.324,1.336,2.657,2.663,3.984,3.996c0.113,0.114,0.236,0.215,0.37,0.3c0.034,0.021,0.068,0.042,0.104,0.062c0.166,0.094,0.33,0.174,0.53,0.181c0.021,0.001,0.041,0.001,0.062,0.001c0.561,0,0.961-0.28,1.271-0.729c0.291-0.421,0.286-1.368-0.182-1.671l-0.204-0.198c-1.321-1.324-2.652-2.638-3.96-3.974C5.05,15.83,4.75,15.091,4.735,14.355L4.735,14.355z"
                      ></path>
                      <path
                        fill="#E7A41F"
                        d="M3.483,18.187l4.312,4.361C8.767,23.527,10.113,24,11.599,24c1.484,0,2.83-0.511,3.804-1.494l2.589-2.637c0.51-0.514,0.492-1.365-0.039-1.9c-0.53-0.535-1.375-0.553-1.884-0.039l-2.676,2.607c-0.462,0.467-1.102,0.662-1.808,0.662c-0.706,0-1.346-0.195-1.81-0.662l-4.297-4.363c-0.463-0.468-0.697-1.15-0.697-1.863c0-0.713,0.234-1.357,0.697-1.824l4.285-4.38c0.464-0.468,1.116-0.645,1.822-0.645c0.707,0,1.347,0.195,1.808,0.662l2.676,2.606c0.51,0.515,1.354,0.497,1.885-0.038c0.531-0.536,0.549-1.386,0.039-1.901l-2.589-2.635c-0.648-0.646-1.471-1.116-2.392-1.33l-0.033-0.006l2.447-2.504c0.512-0.514,0.494-1.366-0.037-1.901c-0.53-0.535-1.376-0.553-1.887-0.038L3.483,10.476C2.509,11.458,2,12.814,2,14.312S2.509,17.206,3.483,18.187L3.483,18.187z"
                      ></path>
                      <path
                        fill="#070706"
                        d="M8.115,22.814c-0.176-0.097-0.332-0.219-0.474-0.361c-1.327-1.333-2.66-2.66-3.984-3.996c-1.988-2.009-2.222-4.936-0.785-7.32c0.234-0.37,0.529-0.694,0.839-1.004c3.208-3.214,6.415-6.43,9.623-9.644c0.625-0.626,1.497-0.652,2.079-0.066c0.559,0.562,0.527,1.455-0.077,2.065c-0.77,0.776-1.54,1.55-2.31,2.325c-0.041,0.122-0.14,0.2-0.226,0.287c-0.863,0.877-1.751,1.73-2.6,2.619c-0.111,0.115-0.262,0.186-0.372,0.225c-1.423,1.423-2.862,2.83-4.265,4.272c-1.136,1.167-1.096,2.938,0.068,4.128c1.229,1.336,2.639,2.65,3.96,3.974l0.204,0.198c0.469,0.223,0.473,1.25,0.182,1.671c-0.321,0.466-0.739,0.75-1.333,0.728C8.445,22.987,8.281,22.907,8.115,22.814L8.115,22.814z"
                      ></path>
                      <path
                        fill="#EAB03C"
                        d="M13.021,4.826c-0.044,0.115-0.138,0.19-0.221,0.273c-0.863,0.877-1.751,1.73-2.6,2.619c-0.111,0.115-0.262,0.186-0.372,0.225c-1.423,1.423-2.862,2.83-4.265,4.272c-0.58,0.596-0.853,1.349-0.827,2.102h0.046C4.781,14.368,4.78,14.339,4.78,14.31c0-0.713,0.234-1.357,0.697-1.824l4.285-4.38c0.464-0.468,1.116-0.645,1.822-0.645c0.707,0,1.347,0.195,1.808,0.662l2.676,2.606c0.248,0.251,0.576,0.375,0.908,0.375c0.35,0,0.705-0.138,0.977-0.413c0.531-0.536,0.549-1.386,0.039-1.901l-2.589-2.635C14.757,5.51,13.938,5.041,13.021,4.826L13.021,4.826z M14.4,0c-0.194,0.001-0.386,0.045-0.562,0.132C14.021,0.049,14.212,0.005,14.4,0L14.4,0z"
                      ></path>
                      <path
                        fill="#272726"
                        d="M14.432,0c-0.01,0-0.021,0-0.031,0c-0.189,0.004-0.379,0.049-0.562,0.132c-0.178,0.081-0.349,0.2-0.504,0.356c-3.208,3.214-6.416,6.43-9.623,9.644c-0.31,0.31-0.604,0.634-0.839,1.004c-0.652,1.025-0.966,2.151-0.954,3.262h2.818c-0.026-0.753,0.248-1.506,0.827-2.102c1.402-1.442,2.842-2.849,4.265-4.272c0.111-0.119,0.261-0.189,0.372-0.225c0.849-0.889,1.737-1.742,2.6-2.619c0.083-0.084,0.177-0.159,0.221-0.273c0.002-0.005,0.003-0.009,0.005-0.014c0.77-0.775,1.54-1.549,2.31-2.325c0.604-0.61,0.637-1.503,0.077-2.065C15.133,0.14,14.786,0,14.432,0L14.432,0z"
                      ></path>
                    </svg>
                    &nbsp;&nbsp;Leetcode
                  </h6>
                  <a
                    href={user.leetcodeLink}
                    class="text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "2px" }}
                  >
                    {user.leetcodeLink.length > 22 ? `${user.leetcodeLink.substring(0, 22)}...` : user.leetcodeLink}
                  </a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      viewBox="0 0 24 24"
                      id="hackerrank"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#2FC363"
                        d="M11.999,0C10.626,0,2.195,4.818,1.514,6c-0.683,1.182-0.687,10.819,0,12c0.685,1.181,9.114,6,10.485,6c1.37,0,9.8-4.823,10.487-6c0.687-1.176,0.687-10.83,0-12C21.799,4.83,13.371,0,11.999,0L11.999,0z M14.84,19.415v0.002c-0.188,0-1.938-1.677-1.8-1.814c0.041-0.041,0.296-0.069,0.832-0.086c0-1.23,0.027-3.215,0.044-4.046c0.002-0.095-0.021-0.161-0.021-0.273h-3.787c0,0.333-0.022,1.697,0.064,3.416c0.012,0.213-0.074,0.279-0.271,0.278c-0.48-0.001-0.96-0.005-1.441-0.004c-0.194,0-0.278-0.073-0.271-0.286c0.043-1.567,0.141-3.938-0.008-9.969V6.483C7.724,6.468,7.404,6.438,7.364,6.397C7.225,6.26,9,4.583,9.187,4.583c0.188,0,1.951,1.677,1.813,1.814c-0.041,0.041-0.374,0.07-0.795,0.086v0.148c-0.113,1.207-0.096,3.731-0.124,4.941h3.803c0-0.214,0.019-1.629-0.057-3.922c-0.005-0.159,0.046-0.242,0.199-0.244c0.524-0.004,1.049-0.006,1.574-0.003c0.164,0.001,0.217,0.08,0.214,0.252c-0.173,8.967-0.032,8.341-0.032,9.86c0.42,0.016,0.796,0.045,0.838,0.086C16.757,17.737,15.027,19.415,14.84,19.415L14.84,19.415z"
                      ></path>
                      <path
                        fill="#DEDEDE"
                        d="M9.187,4.583C9,4.583,7.225,6.26,7.364,6.397c0.041,0.041,0.36,0.07,0.817,0.086v0.149c0.149,6.031,0.051,8.402,0.008,9.969c-0.007,0.214,0.077,0.286,0.271,0.286c0.067,0,0.134,0,0.201,0c0.413,0,0.826,0.003,1.24,0.004c0.001,0,0.003,0,0.004,0c0.194,0,0.279-0.067,0.268-0.278c-0.087-1.719-0.064-3.083-0.064-3.416H12v-1.626h-1.919c0.028-1.209,0.011-3.734,0.124-4.941V6.483C10.626,6.468,10.959,6.438,11,6.397C11.138,6.26,9.374,4.583,9.187,4.583L9.187,4.583z"
                      ></path>
                      <path
                        fill="#29AA56"
                        d="M11.999,0C10.626,0,2.195,4.818,1.514,6c-0.683,1.182-0.687,10.819,0,12c0.685,1.181,9.114,6,10.485,6l0,0H12V13.198h-1.892c0,0.333-0.022,1.697,0.064,3.416c0.012,0.211-0.073,0.278-0.268,0.278c-0.001,0-0.002,0-0.004,0c-0.413-0.001-0.826-0.004-1.24-0.004c-0.067,0-0.134,0-0.201,0c-0.194,0-0.278-0.073-0.271-0.286c0.043-1.567,0.141-3.938-0.008-9.969V6.483C7.724,6.468,7.404,6.438,7.364,6.397C7.225,6.26,9,4.583,9.187,4.583c0.188,0,1.951,1.677,1.813,1.814c-0.041,0.041-0.374,0.07-0.795,0.086v0.148c-0.113,1.207-0.096,3.731-0.124,4.941H12L11.999,0L11.999,0L11.999,0z"
                      ></path>
                    </svg>
                    &nbsp;&nbsp;Hackerrank
                  </h6>
                  <a
                    href={user.hackerrankLink}
                    class="text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "2px" }}
                  >
                   {user.hackerrankLink.length > 22 ? `${user.hackerrankLink.substring(0, 22)}...` : user.hackerrankLink}
                  </a>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                  <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                  </svg>
                    &nbsp;&nbsp;LinkedIn
                  </h6>
                  <a
                    href={user.linkedinProfile}
                    class="text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "2px" }}
                  >
                    {user.linkedinProfile.length > 22 ? `${user.linkedinProfile.substring(0, 22)}...` : user.linkedinProfile}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body" style={{ backgroundColor: "white" }}>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Register Number</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.registerNumber}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Date of Birth</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.dateOfBirth}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">10th percentage</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {" "}
                    {(user.tenthMark / 5).toFixed(2)}%{" "}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">12th percentage</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {" "}
                    {(user.twelfthMark / 6).toFixed(2)}%
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Degree & Dept</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.degree} & {user.department}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">CGPA</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.currentCgpa}
                  </div>
                </div>
              </div>
            </div>

            <div className="row gutters-sm">
              <div className="col-sm-6 mb-2">
                <div className="card h-100">
                  <div
                    className="card-body"
                    style={{ backgroundColor: "white" }}
                  >
                    <h6 className="d-flex align-items-center justify-content-between mb-3">
                      <i className="material-icons text-info mr-2">Skills</i>
                      <button class="cssbuttons-io-button" onClick={()=>navigate("/learning")}>
                        Learn new skills
                        <div class="icon">
                          <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </button>

                    </h6>
                    <div style={{ display: "flex", flexWrap: "wrap"}}>
                      {user.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          style={{padding: "8px", margin:'2px'}}
                        >
                          <Button>{skill}</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-2">
                <div className="card h-100">
                  <div
                    className="card-body"
                    style={{ backgroundColor: "white" }}
                  >
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">Projects</i>
                    </h6>
                    {user.projectNames.map((proj, index) => (
                      <div key={index}>
                        <small>{proj}</small>
                        <div
                          className="progress mb-3"
                          style={{ height: "2px" }}
                        >
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "100%"}}
                            aria-valuenow="80"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
