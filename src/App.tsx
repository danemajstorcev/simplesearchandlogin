import React, { useEffect, useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
const App = () => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (username) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
  }, [username]);

  const handleLogin = (username: string) => {
    localStorage.setItem("username", username);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    setUsers([]);
    setSearch("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      {username ? (
        <div>
          <header>
            <h1>
              Welcome, <span>{username}</span>
            </h1>
            <button onClick={handleLogout}>Logout</button>
          </header>
          <div className="users">
            <input
              type="text"
              placeholder="Search users"
              value={search}
              onChange={handleSearch}
            />
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id}>
                  {user.name} - <a href={`mailto:${user.email}`}>Email me</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem(
              "username"
            ) as HTMLInputElement;
            if (input.value) {
              handleLogin(input.value);
            }
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="please enter your username here..."
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
