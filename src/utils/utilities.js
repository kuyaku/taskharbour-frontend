import {
  COLORS,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "./constants";

export const getRandomColor = () => {
  const random_idx = Math.floor(Math.random() * COLORS.length);
  return COLORS[random_idx];
};

export const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const isValidPassword = (password) => {
  return PASSWORD_REGEX.test(password);
};

export const isValidUsername = (username) => {
  return USERNAME_REGEX.test(username);
};

export const getUserInitials = (username, first_name, last_name) => {
  let name = "";
  if (first_name !== "") {
    name += first_name[0];
  }

  if (last_name !== "") {
    name += last_name[0];
  } else {
    name += first_name[1];
  }

  if (name === "undefined") {
    name = username.substring(0, 2);
  }
  return name.toUpperCase();
};

export const check_if_admin = (user, creator, team) => {
  if (user.username === creator.username) return true;
  else if (team.name) {
    const admin = team.members.find(
      (item) => item.is_admin && item.username === user.username
    );
    if (admin) {
      return true;
    }
  }
  return false;
};
