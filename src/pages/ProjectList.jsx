import React, { useEffect, useState } from "react";
import { Table, Space, Switch, Input, Select, Button } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Number",
    dataIndex: "projectNumber",
    render: (text) => <Link to={"/projects/" + text}>{text}</Link>,
  },
  {
    title: "Name",
    className: "column-money",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Customer",
    dataIndex: "customer",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
  },
  {
    title: "Delete",
    dataIndex: "projectNumber",
    key: "x",
    render: (id) => <Button danger>Delete</Button>,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
const ProjectList = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchFprm, setSerchFormData] = useState({
    status: "",
    search: "",
  });

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/v1/project?deleteId=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Project deleted successfully!");
        toast("Project deleted successfully!");

        // Perform any additional actions upon successful deletion
      } else {
        console.log("Failed to delete project.");
        const errorRes = await response.json();
        const errorMes = errorRes.message;
        toast(errorMes);
        // Handle error cases
      }
    } catch (error) {
      console.log("Error:", error);
      // Handle error cases
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSerchFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(searchFprm);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://localhost:9090/api/v1/projects`)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          setData(responseData);
        })
        .catch((error) => toast(error));
      getData();
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9090/api/v1/project", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Project search successfully!");
        toast("Project search successfully!");

        // Perform any additional actions upon successful submission
      } else {
        console.log("Failed to create project.");
        const errorRes = await response.json();
        const errorMes = errorRes.message;
        toast(errorMes);
        // Handle error cases
      }
    } catch (error) {
      console.log("Error:", error);
      // Handle error cases
    }
  };
  // useEffect(() => {
  //   fetch("http://localhost:9090/api/v1/projects?")
  //     .then((response) =>
  //       response.json().then((responseData) => {
  //         setData(responseData);
  //       })
  //     )
  //     .catch((error) => toast(error));
  // }, []);
  useEffect(() => {
    fetch("http://localhost:9090/api/v1/projects/")
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setData(responseData);
      })
      .catch((error) => toast(error));
  }, []);
  return (
    <>
      {!loading && (
        <div>
          <h1>Project List</h1>
          <form onSubmit={handleSubmit}>
            <Space>
              <Input
                type="text"
                placeholder="Project Number, Name or Custom Name"
                name="search"
                value={searchFprm.search}
                onChange={handleChange}
              />
              <Select
                defaultValue="disabled"
                style={{ width: 120 }}
                options={[
                  { value: "NEW", label: "New" },
                  { value: "FIN", label: "Finished" },
                  { value: "INP", label: "In progress" },
                  { value: "PLA", label: "Planed" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
                name="status"
                value={searchFprm.status}
                onChange={(value) => handleChange("status", value)}
              />
              <Button size={10} type="primary">
                Search
              </Button>
            </Space>
          </form>

          <Table
            columns={columns}
            rowSelection={{
              ...rowSelection,
              checkStrictly,
            }}
            dataSource={data}
          />
        </div>
      )}
    </>
  );
};

export default ProjectList;
