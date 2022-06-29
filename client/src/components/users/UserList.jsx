import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

import { getUsers } from '../../api/users';
import { Edit, Delete } from './Windows';

import UserTable from './UserTable';

function UserList() {
  const [users, setUsers] = useState([]);

  // if the 'open...' state is true, it will show the edit/delete window
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // this passes the selected user to the window
  const [selectedEdit, setSelectedEdit] = useState({
    _id: '',
    name: '',
    email: '',
  });

  // this passes the id of the selected user to delete
  const [selectedDelete, setSelectedDelete] = useState(false);

  const [loading, setLoading] = useState(false);

  const getUsersRequest = async () => {
    setLoading(true);
    setUsers(await getUsers());
    setLoading(false);
  };

  useEffect(() => {
    getUsersRequest();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1>Users</h1>
      {loading ? (
        <Loader type="Oval" color="#627884" height={200} width={200} />
      ) : (
        <div>
          <div className="dashboard-buttons">
            <button
              type="submit"
              onClick={() => toast('Feature not available yet.', {
                icon: '🤧',
              })}
            >
              Add New
            </button>
            <div>
              <NavLink to="/admin">
                <button type="button">Return</button>
              </NavLink>
            </div>
          </div>
          <UserTable
            users={users}
            setSelectedDelete={setSelectedDelete}
            setSelectedEdit={setSelectedEdit}
            selectedEdit={selectedEdit}
            setOpenDelete={setOpenDelete}
            setOpenEdit={setOpenEdit}
          />
        </div>
      )}
      <div>
        {openEdit ? (
          <Edit
            setOpenEdit={setOpenEdit}
            selectedEdit={selectedEdit}
            getRequest={getUsersRequest}
          />
        ) : null}
      </div>
      <div>
        {openDelete ? (
          <Delete
            setOpenDelete={setOpenDelete}
            selectedDelete={selectedDelete}
            getRequest={getUsersRequest}
          />
        ) : null}
      </div>
    </div>
  );
}

export default UserList;
