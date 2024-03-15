import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    setActiveFilter("All");
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      fireDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact Deleted Successfully");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    fireDb
      .child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };
  const handleReset = () => {
    setActiveFilter("All");
    setSort(false);
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  };

  const filterData = (value) => {
    setActiveFilter(value);
    fireDb
      .child("contacts")
      .orderByChild("status")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
        else
        {
          setData({});
        }
      });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Task</th>
            <th style={{ textAlign: "center" }}>Description</th>
            <th style={{ textAlign: "center" }}>Status</th>
            {!sort && <th style={{ textAlign: "center" }}>Action</th>}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].description}</td>
                  <td>{data[id].status}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <label>Sort By:</label>
      <select className="dropdown" name="colValue" onChange={handleChange}>
        <option>Please Select</option>
        <option value="name">Name</option>
        <option value="description">Description</option>
        <option value="status">Status</option>
      </select>
      <button className="btn btn-reset" onClick={handleReset}>
        Reset
      </button>
      <br />
      <label>Status:</label>
      <button className={`btn ${activeFilter === "To Do" ? "btn-active" : "btn-inactive"}`}
              onClick={() => filterData("To Do")}>
        To Do
      </button>
      <button
        className={`btn ${activeFilter === "In Progress" ? "btn-active" : "btn-inactive"}`}
        onClick={() => filterData("In Progress")}
      >
        In Progress
      </button>
      <button
        className={`btn ${activeFilter === "Done" ? "btn-active" : "btn-inactive"}`}
        onClick={() => filterData("Done")}
      >
        Done
      </button>
      <button
        className={`btn ${activeFilter === "All" ? "btn-active" : "btn-inactive"}`}
        onClick={handleReset}
      >
        All
      </button>
    </div>
  );
};

export default Home;
