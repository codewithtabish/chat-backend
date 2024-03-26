const validator = require('validator');

const validateUserFields = (req, res, next) => {
  const { email, password, fullName, userName } = req.body;

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
    
  }


   // Validate fullName (assuming it's a non-empty string and at least 3 characters long)
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 3) {
    return res.status(400).json({ error: 'Full name must be at least 3 characters long' });
  }

  // Validate userName (assuming it's a non-empty string and at least 3 characters long)
  if (!userName || typeof userName !== 'string' || userName.trim().length < 3) {
    return res.status(400).json({ error: 'User name must be at least 3 characters long' });
  }

  // Validate password
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

 

  // All fields are valid, proceed to the next middleware or route handler
  next();
};


module.exports = {validateUserFields};
