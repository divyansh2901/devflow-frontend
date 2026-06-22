import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(
          "/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        DevFlow Dashboard
      </h1>

      {user ? (
        <div className="mt-6">
          <h2 className="text-xl">
            Welcome, {user.name}
          </h2>

          <p>{user.email}</p>
        </div>
      ) : (
        <p className="mt-6">
          Loading...
        </p>
      )}
    </div>
  );
}

export default Dashboard;