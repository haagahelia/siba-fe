import UserList from "./UserList";

export default function UserListContainer({
  getAllUsers,
  allUsersList,
  paginateUsers,
}) {
  return (
    <div>
      <UserList
        getAllUsers={getAllUsers}
        allUsersList={allUsersList}
        paginateUsers={paginateUsers}
      />
    </div>
  );
}
