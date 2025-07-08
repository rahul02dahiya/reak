// UserForm.js
import React, { useEffect, useState } from "react";

const UserForm = ({ modalType, modalHeading, userData, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });

  useEffect(() => {
    if (modalType === "edit" && userData) {
      setFormData(userData);
    } else {
      setFormData({ name: "", mobile: "", email: "" });
    }
  }, [modalType, userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    const closeBtn = document.querySelector("#UserFormModal .btn-close");
    if (closeBtn) closeBtn.click();
  };

  return (
    <div
      className="modal fade"
      id="UserFormModal"
      tabIndex="-1"
      aria-labelledby="UserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="UserModalLabel">
              {modalHeading}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body text-start">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  User name
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name here"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile number
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter 10 digit mobile number"
                  pattern="[6-9][0-9]{9}"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email here"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
