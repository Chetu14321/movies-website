import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    thumbnailUrl: "",
    duration: "",
    rating: "",
    video: null,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const usersRes = await axios.get("/api/auth/count");
      const moviesRes = await axios.get("/api/movies/count");

      setTotalUsers(usersRes.data.count);
      console.log(usersRes.data.count) // ✅ updated from .length
      setTotalMovies(moviesRes.data.length);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
      setFormData({ ...formData, video: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      await axios.post("/api/movies", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Movie added successfully");
      setShowForm(false);
      fetchCounts();
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Error adding movie.");
    }
  };

  return (
    <div className="container mt-5"> {/* ✅ mt-5 for top margin */}
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <h3 className="display-4 text-danger border-bottom pb-2">
            Admin Dashboard
          </h3>
          <p className="lead text-muted">Manage users and movies efficiently.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="row text-center">
        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-primary">Total Users</h5>
              <h1 className="display-6">{totalUsers}</h1>
              
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-success">Total Movies</h5>
              <h2 className="display-6">{totalMovies}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Add Movie Button */}
      <div className="row mt-4">
        <div className="col-md-12 text-center">
          <button
            className="btn btn-outline-danger btn-lg"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "+ Add New Movie"}
          </button>
        </div>
      </div>

      {/* Add Movie Form */}
      {showForm && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h4 className="mb-3 text-danger">Add New Movie</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Genre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Thumbnail URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="thumbnailUrl"
                      value={formData.thumbnailUrl}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Video File</label>
                    <input
                      type="file"
                      className="form-control"
                      name="video"
                      accept="video/*"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button className="btn btn-danger" type="submit">
                    Submit Movie
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
