// Function to get logged-in user data from localStorage
export const getUser = () => {

  // Read "user" from browser localStorage
  const user = localStorage.getItem("user");

  /*
    If user exists:
    Convert JSON string back into JavaScript object

    If user does not exist:
    Return null
  */
  return user ? JSON.parse(user) : null;
};



// Function to save user data and token in localStorage
export const setUserData = (user, token) => {

  /*
    Convert JavaScript object into JSON string
    and save it in localStorage

    Key = "user"
  */
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  /*
    Save authentication token

    Key = "token"
  */
  localStorage.setItem(
    "token",
    token
  );
};



// Function to logout user
export const logout = () => {

  /*
    Remove user information
    from localStorage
  */
  localStorage.removeItem("user");

  /*
    Remove login token
    from localStorage
  */
  localStorage.removeItem("token");
};