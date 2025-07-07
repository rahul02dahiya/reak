import React from "react";
import Form from "./Form";

const UserList = () => {
  return (
    <>
      <div className="container m-4 p-4">
        <table className="table table-responsive text-center">
          <thead className="table-primary">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Email</th>
              <th scope="col">Action buttons <button className="btn btn-sm btn-primary mx-2 fs-6" data-bs-toggle="modal" data-bs-target="#exampleModal"> add <Form/></button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
              <div>
              <button type="button" class="btn btn-warning mx-2">Warning</button>
              <button type="button" class="btn btn-danger mx-2">Danger</button>
              </div>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
