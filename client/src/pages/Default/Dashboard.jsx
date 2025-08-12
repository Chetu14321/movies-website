import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/auth/verify", {
          withCredentials: true
        });
        setUser(userResponse.data.user);

        const coursesResponse = await axios.get("/api/movies/getall");
        setTotalCourses(coursesResponse.data.totalCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <p className="text-center mt-5">Loading your dashboard...</p>;
  }

  return (
    <div className="container py-5">
      {/* Welcome Message */}
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="text-primary border-bottom border-white pb-2 d-inline-block">
            Welcome, {user.name}! to kannada movies
          </h2>
          <p className="text-muted mt-2">Email: {user.email}</p>
        </div>
      </div>

      {/* User Info */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <div className="card p-4 shadow rounded-4 border-white border">
            <h5 className="mb-3 text-center text-secondary">User Information</h5>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
          </div>
        </div>
      </div>

      {/* Total Courses */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow rounded-4 text-center border-white border">
            <h5 className="text-secondary mb-3">Total Available Courses</h5>
            <p className="display-6 text-success"></p>
            <p>Explore and start Watching the movies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
