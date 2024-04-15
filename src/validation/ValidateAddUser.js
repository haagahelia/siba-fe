import dao from "../ajax/dao";
import { requiredFieldErrorMessageFunction } from "./Validate_GenericRegexps";

export default async function ValidateAddUser(values) {
  const errors = {};
  const { email, password, isAdmin, isPlanner, isStatist } = values;
  const validateEmailFormat = (email) => {
    // Regular expression for email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isDuplicateUser = async () => {
    try {
      const { data } = await dao.fetchAllUsers();
      const userList = data || [];
      return userList.some(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      return false;
    }
  };

  if (!email) {
    errors.email = requiredFieldErrorMessageFunction("Email");
  } else if (!validateEmailFormat(email)) {
    errors.email = "Invalid email address format.";
  } else if (await isDuplicateUser()) {
    errors.email = "The email address already exists.";
  }

  if (!password) {
    errors.password = requiredFieldErrorMessageFunction("Password");
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (isAdmin === 0 && isPlanner === 0 && isStatist === 0) {
    errors.roles = "Please select at least one role.";
  }

  if (
    !email.trim() ||
    !password.trim() ||
    (isAdmin === 0 && isPlanner === 0 && isStatist === 0)
  ) {
    errors.general =
      "Please provide valid email and password, and select at least one role.";
  }

  return errors;
}
