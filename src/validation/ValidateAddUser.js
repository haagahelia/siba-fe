import dao from "../ajax/dao";

export default async function ValidateAddUser(values) {
  const errors = {};
  const { email, isAdmin, isPlanner, isStatist } = values;

  const isDuplicateUser = async function () {
    try {
      const { data } = await dao.fetchAllUsers();
      const userList = data || [];
      return userList.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      return false;
    }
  };

  if (!email) {
    errors.email = "Email required";
  } else if (await isDuplicateUser()) {
    errors.email = "The email address already exists.";
  }

  if (
    !email.trim() ||
    !values.password.trim() ||
    (isAdmin === 0 && isPlanner === 0 && isStatist === 0)
  ) {
    errors.general = "Please provide valid email and password, and select at least one role.";
  }

  return errors;
}