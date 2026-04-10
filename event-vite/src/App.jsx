import React, { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import AdminPage from "./components/AdminPage.jsx";
import UserPage from "./components/UserPage.jsx";
import { eventAPI } from "./services/api.js";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedName = localStorage.getItem("userName");
    const savedRole = localStorage.getItem("userRole");

    if (token && savedName && savedRole) {
      setUserName(savedName);
      setUserRole(savedRole);
      setPage(savedRole === "admin" ? "admin" : "user");
      fetchEvents();
    }
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getAll();
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (role, name, token) => {
    setUserName(name);
    setUserRole(role);
    setPage(role === "admin" ? "admin" : "user");

    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);

    fetchEvents();
  };

  const handleLogout = () => {
    setUserName("");
    setUserRole("");
    setPage("login");

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
  };

  const addEvent = async (event) => {
    try {
      const response = await eventAPI.create(event);
      setEvents([response.data, ...events]);
      return { success: true };
    } catch (err) {
      console.error("Error creating event:", err);
      return {
        success: false,
        error: err.response?.data?.msg || "Failed to create event",
      };
    }
  };

  const deleteEvent = async (id) => {
    try {
      await eventAPI.delete(id);
      setEvents(events.filter((e) => e._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Error deleting event:", err);
      return {
        success: false,
        error: err.response?.data?.msg || "Failed to delete event",
      };
    }
  };

  if (page === "login") {
    return <Login onLogin={handleLogin} />;
  }

  if (page === "admin") {
    return (
      <AdminPage
        events={events}
        addEvent={addEvent}
        deleteEvent={deleteEvent}
        onLogout={handleLogout}
        userName={userName}
        loading={loading}
      />
    );
  }

  return (
    <UserPage
      events={events}
      onLogout={handleLogout}
      userName={userName}
      loading={loading}
    />
  );
}
