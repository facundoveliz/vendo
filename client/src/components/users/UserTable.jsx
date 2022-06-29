import React from 'react';

import toast from 'react-hot-toast';
import jwt from 'jwt-decode';
import dateFormat from 'dateformat';

import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function UserTable({
  users,
  setSelectedDelete,
  setSelectedEdit,
  selectedEdit,
  setOpenDelete,
  setOpenEdit,
}) {
  // decodes the token and use it to take the id of the current user
  // and later use it to prevent the user delete him self
  const token = localStorage.getItem('x-auth-token');
  const decoded = jwt(token);

  return (
    <div className="dashboard-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User since</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <p>{user.name}</p>
                <p className="dashboard-role">
                  {user.isAdmin ? 'Admin' : 'User'}
                </p>
              </td>
              <td>
                <p>{user.email}</p>
              </td>
              <td>
                <p>{dateFormat(user.created, 'mmm dd, yyyy')}</p>
              </td>
              <td>
                <FiEdit2
                  onClick={() => {
                    setOpenEdit(true);
                    setSelectedEdit({ ...selectedEdit, ...user });
                  }}
                />
                <FiTrash2
                  onClick={() => (user._id === decoded._id
                    ? toast.error("You can't delete yourself!")
                    : (setOpenDelete(true), setSelectedDelete(user._id)))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
