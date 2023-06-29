const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    email: user.email,
  };
};

const createTokenMember = (member) => {
  return {
    name: member.name,
    memberId: member._id,
    email: member.email,
  };
};

module.exports = { createTokenUser, createTokenMember };
