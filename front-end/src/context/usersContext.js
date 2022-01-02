import { createContext, useState } from "react";
export const UsersContext = createContext([]);

export const UsersProvider = (props) => {
  const [allUserslist, setAllUsersList] = useState([]);

  const handleDeleteUserContext = (_id) => {
    const userListAfterDeletion = allUserslist.filter((element) =>  element._id !== _id  )
    setAllUsersList(userListAfterDeletion);
  };

  const handleUpdateUserContext = (_id, values) => {
    const userListAfterUpdate = allUserslist.filter((element) =>  element._id !== _id  )
    setAllUsersList([
      {
        _id: _id,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
      },
      ...userListAfterUpdate,
    ]);
  };


  return (
    <UsersContext.Provider
      value={{allUserslist, setAllUsersList, handleDeleteUserContext, handleUpdateUserContext}}
    >
      {props.children}
    </UsersContext.Provider>
  );
};
