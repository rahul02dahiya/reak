import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUserEdit, FaRegFrownOpen } from "react-icons/fa";
import UserForm from "./UserForm";

const UserList = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [users, setUsers] = useState([]);
  const [modalType, setModalType] = useState("add");
  const [modalHeading, setModalHeading] = useState("Add new user");
  const [selectedUser, setSelectedUser] = useState([]);

  const fetchUsers = async () => {
    try {
      console.log(baseURL)
      const response = await fetch(`${baseURL}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data?data:[]);
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
      const response = await fetch(`${baseURL}/users/${id}`, {
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
    const url =
      modalType === "add"
        ? `${baseURL}/users`
        : `${baseURL}/users/${selectedUser.id}`;
    const method = modalType === "add" ? "POST" : "PUT";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.message || "Something went wrong";
      console.log("this one : ", message);
      throw {
        response: {
          data: { message },
        },
      };
    }

    fetchUsers();
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
          {users.length!==0 ? (
            users.map((user) => (
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
            ))
          ) : (
            <tr ><th colSpan={5}><h3 className="m-4"> <FaRegFrownOpen className="mb-1"/> No users found, please add </h3></th></tr>
          )}
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
