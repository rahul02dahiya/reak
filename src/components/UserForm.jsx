import React, { useEffect, useState } from "react";

  const UserForm = ({ modalType, modalHeading, userData, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
  const [error, setError] = useState("");

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

  const handleReset = ()=>{
    if (modalType === "add") {
    setFormData({ name: "", mobile: "", email: "" });
    }
    setError(""); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(formData.name.length>2 && /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.name))) {
      setError("Please enter a valid name")
      return
    }

    if(!(/^[6-9][0-9]{9}$/.test(formData.mobile))){
      setError("Please enter a valid mobile 10 digit number")
      return
    }

     setError(""); 
     try {
    await onSubmit(formData);
    const closeBtn = document.querySelector("#UserFormModal .btn-close");
    if (closeBtn) closeBtn.click();
  } catch (err) {
    const msg = err?.response?.data?.message || "Something went wrong";
    setError(msg)
  }
  };

  return (
    <div
      className="modal fade"
      id="UserFormModal"
      tabIndex="-1"
      aria-labelledby="UserModalLabel"
      aria-hidden="true"
      data-bs-backdrop="false"
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
              onClick={handleReset}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body text-start">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
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
                onClick={handleReset}
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