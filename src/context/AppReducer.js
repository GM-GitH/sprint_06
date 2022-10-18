export default function appReducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { id: 1, name: "William Johanson", email: "email@example.com", auth: true };

    case "UPDATE_USER": {
      //   const updatedUser = action.payload;
      //   const updatedUsersList = state.usersList.map((user) => {
      //     if (user.id === updatedUser.id) {
      //       updatedUser.auth = user.auth;
      //       return updatedUser;
      //     }
      //     return user;
      //   });
      //   return {
      //     ...state,
      //     usersList: updatedUsersList,
      //   };
      // }
      return { id: 1, name: "William Johanson", email: "email@example.com", auth: true };
    }

    case "USER_LOGOUT":
      // return {
      //   ...state,
      //   usersList: state.usersList.filter((user) => user.id !== action.payload),
      // };
      return { id: null, name: null, email: null, auth: false };

    case "TOGGLE_AUTH":
      return { ...state, auth: !state.auth };
    default:
      return state;
  }
}
