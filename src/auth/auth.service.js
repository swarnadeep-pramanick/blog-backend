const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('./auth.repository');
require('dotenv').config();
const redisClient = require('../services/redisClient');

// Utility function to hide password from user object
function hidePassword(user) {
  if (!user) return user;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

exports.signup = async ({ name, email, password }) => {
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw { status: 400, message: 'Email already exists' };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await authRepository.createUser({ name, email, password: hashedPassword });
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { ...hidePassword(user), token };
};

exports.login = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw { status: 401, message: 'Invalid credentials' };
  }
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { ...hidePassword(user), token };
};

exports.logout = async (token) => {
  // Add the token to a blacklist with an expiration matching the token's expiry
  if(!token) {
    throw { status: 401, message: 'Unauthorized' };
  }
  const decoded = jwt.decode(token);
  if (decoded && decoded.exp) {
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    await redisClient.set(`blacklist_${token}`, 'true', 'EX', expiresIn);
  }
  return { message: 'Logged out successfully' };
}; 