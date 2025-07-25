const prisma = require('../utils/db');

exports.createUser = async (userData) => {
  return await prisma.user.create({ data: userData });
};

exports.findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
}; 