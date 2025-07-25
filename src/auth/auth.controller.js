const authService = require('./auth.service');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.signup({ name, email, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if(!bearer) {
      throw { status: 401, message: 'Unauthorized' };
    }
    if(bearer.split(' ')[0] !== 'Bearer') {
      throw { status: 401, message: 'Unauthorized' };
    }
    const token = bearer.split(' ')[1];
    const result = await authService.logout(token);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 