const User = require("mongoose").model("User");

async function createUser(newData) {
  try {
    const user = new User(newData);
    await user.save();
    return user;
  } catch (e) {
    console.log(e);
    // throw authErr.ERROR_CREATING_USER;
  }
}

async function getUser(conditions, optionalFields = {}) {
  try {
    const user = await User.findOne(conditions, optionalFields).exec();
    return user;
  } catch (e) {
    console.log(e);
    // return authErr.ERROR_READING_USER;
  }
}

module.exports = {
  createUser,
  getUser,
};
