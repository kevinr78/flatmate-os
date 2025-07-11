import User from "../models/User.js";
import House from "../models/House.js";

const checkIfUserExists = async (options) => {
  const user = await User.findOne(options);
  if (!user) {
    return null;
  }
  return user;
};

export { checkIfUserExists };
