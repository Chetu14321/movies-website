import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showMovies, setShowMovies] = useState(false);
  const [userList, setUserList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    thumbnailUrl: "",
    duration: "",
    rating: "",
    video: "",
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const usersRes = await axios.get("/api/auth/count");
      const moviesRes = await axios.get("/api/movies/count/total");
      setTotalUsers(usersRes.data.count);
      setTotalMovies(moviesRes.data.count);
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/auth/getall");
      setUserList(res.data);
      setShowUsers(!showUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get("/api/movies/getall");
      setMovieList(res.data);
      setShowMovies(!showMovies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/movies/add", formData);
      alert("Movie added successfully!");
      setShowForm(false);
      fetchCounts();
      setFormData({
        title: "",
        description: "",
        genre: "",
        thumbnailUrl: "",
        duration: "",
        rating: "",
        video: "",
      });
    } catch (err) {
      console.error("Error adding movie:", err);
      alert("Error adding movie.");
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="row mb-4 text-center">
        <h3 className="display-4 text-danger border-bottom pb-2">Admin Dashboard</h3>
        <p className="lead text-muted">Manage users and movies efficiently.</p>
      </div>

      {/* Stats */}
      <div className="row text-center">
        <div className="col-md-6 mb-4" onClick={fetchUsers} style={{ cursor: 'pointer' }}>
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-primary">Total Users</h5>
              <h1 className="display-6">{totalUsers}</h1>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4" onClick={fetchMovies} style={{ cursor: 'pointer' }}>
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-success">Total Movies</h5>
              <h2 className="display-6">{totalMovies}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* List of Users */}
      {showUsers && (
        <div className="row mb-4">
          <div className="col">
            <h4>All Users</h4>
            <ul className="list-group">
              {userList.map((u) => (
                <li key={u._id} className="list-group-item">
                  {u.name || u.email || u._id}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* List of Movies */}
      {showMovies && (
        <div className="row mb-4">
          <div className="col">
            <h4>All Movies</h4>
            <ul className="list-group">
              {movieList.map((m) => (
                <li key={m._id} className="list-group-item">
                  {m.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Add Movie Section */}
      <div className="row mt-4">
        <div className="col text-center">
          <button
            className="btn btn-outline-danger btn-lg"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "+ Add New Movie"}
          </button>
        </div>
      </div>
      {showForm && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            {/* Add Movie Form */}
            <div className="card border-0 shadow">
              <div className="card-body">
                <h4 className="mb-3 text-danger">Add New Movie</h4>
                <form onSubmit={handleSubmit}>
                  {/* form fields */}
                  {/* ... same as before */}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
