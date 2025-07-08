// UserList.js
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modalType, setModalType] = useState("add");
  const [modalHeading, setModalHeading] = useState("Add new user");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      alert("Failed to fetch users: " + err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setModalType("add");
    setModalHeading("Add new user");
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    setModalType("edit");
    setModalHeading("Update user details");
    setSelectedUser(user);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user: " + err.message);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const url =
        modalType === "add"
          ? "http://localhost:5000/api/users"
          : `http://localhost:5000/api/users/${selectedUser.id}`;
      const method = modalType === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      fetchUsers(); 
    } catch (error) {
      alert("Failed to save user: " + error.message);
    }
  };

  return (
    <div className="container m-4 p-4">
      <div className="d-flex justify-content-between">
        <h2 className="mb-3">User List</h2>
        <button
          type="button"
          className="btn btn-primary mb-3"
          data-bs-toggle="modal"
          data-bs-target="#UserFormModal"
          onClick={handleAdd}
        >
          <IoPersonAddSharp /> Add
        </button>
      </div>

      <table className="table table-responsive text-center">
        <thead className="table-primary">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.mobile}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-warning mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#UserFormModal"
                  onClick={() => handleEdit(user)}
                >
                  <FaUserEdit size={18} /> Edit
                </button>
                <button
                  className="btn btn-sm bg-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  <MdDeleteForever size={20} className="text-light" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserForm
        modalType={modalType}
        modalHeading={modalHeading}
        userData={selectedUser}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserList;
