import React from "react";

import jwt_decode from "jwt-decode";
import dateFormat from "dateformat";
import { toast } from "react-toastify";

const UserTable = ({
  users,
  setSelectedDelete,
  setSelectedEdit,
  selectedEdit,
  setOpenDelete,
  setOpenEdit,
}) => {
  // decodes the token and use it to take the id of the current user
  // and later use it to prevent the user delete him self
  const token = localStorage.getItem("x-auth-token");
  const decoded = jwt_decode(token);

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>User since</th>
          <th>Actions</th>
        </tr>
        {users.map((user) => {
          return (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{dateFormat(user.created, "d mmm, HH:MM")}</td>
              <td>
                <div>
                  <img
                    src="/icons/edit.svg"
                    alt=""
                    onClick={() => {
                      setOpenEdit(true);
                      setSelectedEdit({ ...selectedEdit, ...user });
                    }}
                  />
                  {user._id === decoded._id ? (
                    <img
                      src="/icons/trash.svg"
                      alt=""
                      onClick={() => toast.error("You can't delete yourself.")}
                    />
                  ) : (
                    <img
                      src="/icons/trash.svg"
                      alt=""
                      onClick={() => {
                        setOpenDelete(true);
                        setSelectedDelete(user._id);
                      }}
                    />
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
