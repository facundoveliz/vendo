import React, { useState, useEffect } from "react";
import { getUsers } from "../../api/users";
import { Edit, Delete } from "./Windows";
import Loader from "react-loader-spinner";

import UserTable from "./UserTable";

const UserList = () => {
  useEffect(() => {
    getUsersRequest();
  }, []);

  const [users, setUsers] = useState([]);

  // if the 'open...' state is true, it will show the edit/delete window
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // this passes the selected user to the window
  const [selectedEdit, setSelectedEdit] = useState({
    _id: "",
    name: "",
    email: "",
  });

  // this passes the id of the selected user to delete
  const [selectedDelete, setSelectedDelete] = useState(false);

  const [loading, setLoading] = useState(false);

  const getUsersRequest = async () => {
    setLoading(true);
    setUsers(await getUsers());
    setLoading(false);
  };

  return (
    <div className="table">
      <div className="table-title">
        <h1>Users</h1>
      </div>
      {loading ? (
        <Loader
          type="Oval"
          color="#627884"
          height={200}
          width={200}
          className="loading"
        />
      ) : (
        <UserTable
          users={users}
          setSelectedDelete={setSelectedDelete}
          setSelectedEdit={setSelectedEdit}
          selectedEdit={selectedEdit}
          setOpenDelete={setOpenDelete}
          setOpenEdit={setOpenEdit}
        />
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
};

export default UserList;
