import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("ListTask");
  const location = useLocation();
  const [search, setSearch] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("ListTask");
    } else if (location.pathname === "/add") {
      setActiveTab("AddTask");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?name=${search}`);
    setSearch("");
  };
  return (
    <div className="header">
      <p className="logo">To Do App</p>
      <div className="header-right">
        <form onSubmit={handleSubmit} style={{ display: "inline" }}>
          <input
            type="text"
            className="inputField"
            placeholder="Search Task ..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <Link to="/">
          <p
            className={`${activeTab === "ListTask" ? "active" : ""}`}
            onClick={() => setActiveTab("ListTask")}
          >
            List Task
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddTask" ? "active" : ""}`}
            onClick={() => setActiveTab("AddTask")}
          >
            Add Task
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
