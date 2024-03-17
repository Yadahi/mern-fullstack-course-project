import React from "react";
import UserList from "../components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "John",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    places: 3,
  },
];
const Users = () => {
  return <UserList items={USERS} />;
};

export default Users;
