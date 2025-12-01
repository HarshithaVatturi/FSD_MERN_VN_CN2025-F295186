import React, { useEffect, useState } from "react";
import axios from "axios";

function EighteenQ() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // 0,1,2,3 for 20 users (5 per page)

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users?limit=20")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const pageSize = 5;
  const startIndex = page * pageSize;
  const currentUsers = users.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(users.length / pageSize);

  return (
    <div>
      <h2>Pagination – 5 Users per Page</h2>

      <ul>
        {currentUsers.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} – {user.email}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
          style={{ marginRight: "10px" }}
        >
          Prev
        </button>

        <span>
          Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages - 1}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EighteenQ;
