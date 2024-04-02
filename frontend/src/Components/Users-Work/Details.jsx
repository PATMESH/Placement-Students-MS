import React, { useEffect, useState } from "react";
import "../../Css/details.css";
import { Modal, Button } from "antd";
import Select from "react-select";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MultiStepForm = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  useEffect(()=>{
    if(!email){
      navigate("/");
    }
  })
  const [formData, setFormData] = useState({
    name: "",
    email: email,
    registerNumber: "",
    fatherName: "",
    address: "",
    phoneNumber: null,
    dob: "",
    gender: "",

    tenthMark: "",
    twelfthMark: "",
    degree: "",
    department: "",
    year: "",
    currentCgpa: "",

    project1: "",
    project2: "",
    project3: "",
    project4: "",
    project5: "",
    skills: [],

    portfolioLink: "",
    githubLink: "",
    linkedinProfile: "",
    hackerrankLink:"",
    leetcodeLink:"",
    resumeLink: "",
  });

  const skillOptions = [
    { value: "js", label: "JavaScript" },
    { value: "java", label: "Java" },
    { value: "node", label: "Node.js" },
    { value: "reactjs", label: "React.js" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "ml", label: "Machine Learning" },
    { value: "python", label: "Python" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "angular", label: "Angular" },
    { value: "vuejs", label: "Vue.js" },
    { value: "sql", label: "SQL" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "swift", label: "Swift" },
    { value: "android", label: "Android" },
    { value: "ios", label: "iOS" },
    { value: "typescript", label: "TypeScript" },
    { value: "csharp", label: "C#" },
    { value: "docker", label: "Docker" },
    { value: "kotlin", label: "Kotlin" },
    { value: "git", label: "Git" },
    { value: "mongodb", label: "MongoDB" },
    { value: "redux", label: "Redux" },
    { value: "graphql", label: "GraphQL" },
    { value: "angularjs", label: "AngularJS" },
    { value: "rust", label: "Rust" },
    { value: "scala", label: "Scala" },
    { value: "go", label: "Go" },
    { value: "spring", label: "Spring Framework" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "laravel", label: "Laravel" },
    { value: "wordpress", label: "WordPress" },
    { value: "express", label: "Express.js" },
    { value: "jquery", label: "jQuery" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "storybook", label: "Storybook" },
    { value: "jenkins", label: "Jenkins" },
    { value: "aws", label: "Amazon Web Services (AWS)" },
    { value: "azure", label: "Microsoft Azure" },
    { value: "heroku", label: "Heroku" },
    { value: "netlify", label: "Netlify" },
    { value: "redux-saga", label: "Redux Saga" },
    { value: "nextjs", label: "Next.js" },
    { value: "gatsby", label: "Gatsby" },
    { value: "springboot", label: "Spring Boot" },
    { value: "reactnative", label: "React Native" },
    { value: "pythondjango", label: "Python Django" },
    { value: "kiwi", label: "Kiwi" },
    { value: "express", label: "Express" },
    { value: "firebase", label: "Firebase" },
    { value: "mysql", label: "MySQL" },
    { value: "jsp", label: "JSP" },
    { value: "dart", label: "Dart" },
    { value: "flutter", label: "Flutter" },
    { value: "linux", label: "Linux" },
    { value: "go", label: "Go" },
    { value: "php", label: "PHP" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "dotnet", label: ".NET" },
  ];

  const departmentOptions = [
    { value: "CSE", label: "Computer Science and Engineering" },
    { value: "EEE", label: "Electrical and Electronics Engineering" },
    { value: "ECE", label: "Electronics and Communication Engineering" },
    { value: "IT", label: "Information Technology" },
    { value: "MECH", label: "Mechanical Engineering" },
    { value: "CIVIL", label: "Civil Engineering" },
    { value: "BIO-MEDICAL", label: "Biomedical Engineering" },
    { value: "BIO-TECH", label: "Biotechnology" },
    { value: "CSBS", label: "Computer Science and Business Systems" },
    { value: "AIDS", label: "Artificial Intelligence and Data Science" },
  ];

  const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "Final Year" },
  ];

  const degreeOptions = [
    { value: "B.Tech", label: "Bachelor of Technology" },
    { value: "B.E", label: "Bachelor of Engineering" }
  ];
  

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleReset = () => {
    setSuccessModalVisible(false);
    setStep(0);
    setFormData(null)
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSillChange = (selectedOptions) => {
    const selectedLabels = selectedOptions.map((option) => option.label);
    setSelectedOptions(selectedLabels);
    setFormData({ ...formData, ["skills"]: selectedLabels });
  };

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    for (const key in formData) {
      if (!formData[key]) {
          toast.warning('Please fill all the data...');
          return;
      }
  }

    await fetch("http://localhost:8000/addDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setSuccessModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (successModalVisible) {
        try {
          const response = await fetch("http://localhost:8000/find", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          });
          
          const data = await response.json();
          const { message, id } = data;
          setTimeout(() => {
            navigate(`/profile/${id}`);
          }, 2000);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
  
    fetchData();
  }, [successModalVisible, email, navigate]);
  

  return (
    <div id="details">
      <form id="msform" onSubmit={handleSubmit}>

      <ul id="progressbar">
        <li onClick={()=>setStep(1)} style={{cursor:'pointer'}} className={step === 1 ||step === 2 || step === 3 || step === 4 ? "active" : ""}>Personal</li>
        <li onClick={()=>setStep(2)} style={{cursor:'pointer'}} className={step === 2 || step === 3 || step === 4 ? "active" : ""}>Educational</li>
        <li onClick={()=>setStep(3)} style={{cursor:'pointer'}} className={step === 3 || step === 4 ? "active" : ""}>Projects</li>
        <li onClick={()=>setStep(4)} style={{cursor:'pointer'}} className={step === 4 ? "active" : ""}>socials</li>
      </ul>

        {step === 1 && (
          <fieldset>
            <h2 className="fs-title">Personal Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth (dd-mm-yyyy)"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <div className="gender-input">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="button"
              className="next action-button"
              onClick={nextStep}
            >
              Next
            </button>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <h2 className="fs-title">Educational Details</h2>
            <input
              type="text"
              name="tenthMark"
              placeholder="10th Mark"
              value={formData.tenthMark}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="twelfthMark"
              placeholder="12th Mark"
              value={formData.twelfthMark}
              onChange={handleChange}
              required
            />
            <Select
              className="select"
              options={degreeOptions}
              value={degreeOptions.find(
                (option) => option.value === formData.degree
              )}
              onChange={(selectedOption) =>
                setFormData({ ...formData, degree: selectedOption.value })
              }
              placeholder="Select Degree"
            />
            <Select
              className="select"
              options={departmentOptions}
              value={departmentOptions.find(
                (option) => option.value == formData.department
              )}
              onChange={(selectedOption) => {
                const newFormData = { ...formData, department: selectedOption.value };
                setFormData(newFormData);
              }}
              placeholder="Select department..."
            />
            <Select
              className="select"
              options={yearOptions}
              value={yearOptions.find(
                (option) => option.value === formData.year
              )}
              onChange={(selectedOption) =>
                setFormData({ ...formData, year: selectedOption.value })
              }
              placeholder="Select Year"
            />
            <input
              type="text"
              name="registerNumber"
              placeholder="Register Number"
              value={formData.registerNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="currentCgpa"
              placeholder="Current CGPA"
              value={formData.currentCgpa}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="previous action-button"
              onClick={prevStep}
            >
              Previous
            </button>
            <button
              type="button"
              className="next action-button"
              onClick={nextStep}
            >
              Next
            </button>
          </fieldset>
        )}
        {step === 3 && (  
          <fieldset>
            <h2 className="fs-title">Projects and Skills</h2>

            <input
              type="text"
              name="project1"
              placeholder="project1"
              value={formData.project1}
              onChange={handleChange}
            />
            <input
              type="text"
              name="project2"
              placeholder="project2"
              value={formData.project2}
              onChange={handleChange}
            />
            <input
              type="text"
              name="project3"
              placeholder="project3"
              value={formData.project3}
              onChange={handleChange}
            />
            <input
              type="text"
              name="project4"
              placeholder="project4"
              value={formData.project4}
              onChange={handleChange}
            />
            <input
              type="text"
              name="project5"
              placeholder="project5"
              value={formData.project5}
              onChange={handleChange}
            />

            <Select
              options={skillOptions}
              isMulti
              value={skillOptions.filter((option) =>
                selectedOptions.includes(option.label)
              )}
              onChange={handleSillChange}
              placeholder="Add your Skills"
              maxMenuHeight={150}
            />

            <button
              type="button"
              className="previous action-button"
              onClick={prevStep}
            >
              Previous
            </button>
            <button
              type="button"
              className="next action-button"
              onClick={nextStep}
            >
              Next
            </button>
          </fieldset>
        )}
        {step === 4 && (
          <fieldset>
            <h2 className="fs-title">Social Profiles</h2>
            <input
              type="text"
              name="portfolioLink"
              placeholder="Portfolio Link"
              value={formData.portfolioLink}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="githubLink"
              placeholder="GitHub Link"
              value={formData.githubLink}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="linkedinProfile"
              placeholder="LinkedIn Profile"
              value={formData.linkedinProfile}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="resumeLink"
              placeholder="Resume Link"
              value={formData.resumeLink}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="leetcodeLink"
              placeholder="Leetcode Link"
              value={formData.leetcodeLink}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="hackerrankLink"
              placeholder="Hackerrank Link"
              value={formData.hackerrankLink}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="previous action-button"
              onClick={prevStep}
            >
              Previous
            </button>
            <button type="submit" className="submit action-button">
              Submit
            </button>
          </fieldset>
        )}
      </form>

      <Modal
        visible={successModalVisible}
        title={
          <div>
            <CheckCircleOutlined
              style={{ color: "#52c41a", fontSize: "24px", marginRight: "8px" }}
            />
            Success!
          </div>
        }
        onCancel={() => setSuccessModalVisible(false)}
        footer={[
          <Button key="reset" onClick={handleReset}>
            Reset
          </Button>,
        ]}
      >
        <p>Your form has been submitted successfully!</p>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        />
    </div>
  );
};

export default MultiStepForm;
