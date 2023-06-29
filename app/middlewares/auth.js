const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    //! Check Header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    const payload = isTokenValid({ token });

    req.user = {
      email: payload.email,
      name: payload.name,
      id: payload.userId,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const authenticateMember = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    const payload = isTokenValid({ token });
    req.member = {
      email: payload.email,
      name: payload.name,
      id: payload.memberId,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateUser, authenticateMember };
