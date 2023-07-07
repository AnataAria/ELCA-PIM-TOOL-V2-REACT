import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProjectList from "./ProjectList";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Space, Button } from "antd";

const ProjectPage = () => {
  const { projectId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [groupid, setGroupid] = useState([
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ]);
  const [formData, setFormData] = useState({
    id: 1,
    groupId: 1,
    projectNumber: 1,
    name: "",
    customer: "",
    status: "NEW",
    startDate: "",
    endDate: "",
    version: 1,
    employeeVisa: [],
  });
  useEffect(() => {
    if (projectId) {
      const getData = async () => {
        const data = await fetch(
          `http://localhost:9090/api/v1/project?projectId=${projectId}`
        )
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            setFormData(responseData);
          })
          .catch((error) => toast(error));
      };
      getData();
    }
  }, [projectId]);

  const throwsErrorToScreen = (message) => {
    const errorList = message.split("\n");
    errorList.forEach((error) => {
      toast(error);
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "employeeVisa" ? value.split(",") : value,
    }));
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectId) {
      try {
        const response = await fetch("http://localhost:9090/api/v1/project", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Project update successfully!");
          toast("Project update successfully!");

          // Perform any additional actions upon successful submission
        } else {
          console.log("Failed to create project.");
          const errorRes = await response.json();
          const errorMes = errorRes.message;
          toast(errorMes);
          throwsErrorToScreen(errorRes.errors);
          setRedirect(true);
          // Handle error cases
        }
      } catch (error) {
        console.log("Error:", error);
        // Handle error cases
      }
    } else {
      try {
        const response = await fetch("http://localhost:9090/api/v1/project/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Project created successfully!");
          toast("Project created successfully!");

          // Perform any additional actions upon successful submission
        } else {
          console.log("Failed to create project.");
          const errorRes = await response.json();
          const errorMes = errorRes.message;
          toast(errorMes);
          throwsErrorToScreen(errorRes.errors);
          setRedirect(true);
          // Handle error cases
        }
      } catch (error) {
        console.log("Error:", error);
        // Handle error cases
      }
    }
  };
  return (
    <div>
      {projectId ? (
        <h2 style={{ fontWeight: 600, color: "#666666" }}>Edit Project</h2>
      ) : (
        <h2 style={{ fontWeight: 600, color: "#666666" }}>New Project</h2>
      )}
      <div className="line" />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="project-number">
            Project number <span style={{ color: "red" }}>*</span>
          </label>
          {projectId ? (
            <input
              type="text"
              id="project-number"
              name="projectNumber"
              value={formData.projectNumber}
              onChange={handleChange}
              readOnly
            />
          ) : (
            <input
              type="text"
              id="project-number"
              name="projectNumber"
              value={formData.projectNumber}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="project-name">
            Project name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="project-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="customer">
            Customer <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="group">
            Group <span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="groupId"
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
          >
            {groupid.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="member">Members</label>
          <input
            type="text"
            id="member"
            name="employeeVisa"
            value={formData.employeeVisa.join(",")}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">
            Status <span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="NEW">New</option>
            <option value="FIN">Finished</option>
            <option value="INP">In progress</option>
            <option value="PLA">Planned</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="start-date">
            Start date <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            id="start-date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          <label htmlFor="end-date" style={{ marginLeft: 20 }}>
            End date
          </label>
          <input
            type="date"
            id="end-date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="line" />
        <div className="form-group" style={{ marginTop: 38, display: "flex" }}>
          <Link to={"/"}>
            <Button>Cancel</Button>
          </Link>
          <Button type="primary" htmlType="submit">
            {projectId ? "Update" : "Create"}
          </Button>
        </div>
      </form>
      {redirect && <Link to="/" />}
    </div>
  );
};

export default ProjectPage;
