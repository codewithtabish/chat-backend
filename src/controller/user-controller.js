const User = require('../models/user-model'); // Import the User model

const signup = async (req, res,next) => {
    try {

        // Extract user data from request body
        const { userName, fullName, email, password } = req.body;

        // Check if user already exists with the provided email
        const existingUser = await User.findOne({ $or:[{userName},{email}]});
        if (existingUser) {
         return res.status(400).json({ error: "Invalid credentials. Please try again." });

        }

        // Create a new user instance
        const newUser = new User({
            userName,
            fullName,
            email,
            password // This should be hashed before saving in production
        });

        // Save the new user to the database
        await newUser.save();



    const deepCopy=JSON.parse(JSON.stringify(newUser))
    delete deepCopy.password

        // Respond with success message
        res.status(201).json({ message: "User signed up successfully.",
      user: deepCopy});
    } catch (error) {
        next(error)
    }
}



const signIn = async (req, res,next) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body

    // Check if the user exists
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password. Please try again.' });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password. Please try again.' });
    }

    // If user and password are valid, generate a JSON Web Token (JWT)
    const token =await user.generateAuthToken()

    const deepCopy=JSON.parse(JSON.stringify(user))

    deepCopy.token=token

    delete deepCopy.password

    // Send back the user   token as response
  res.status(200).json({
  status: true,
  message: 'User authenticated successfully',
  deepCopy


});



  } catch (error) {
    next(error)
  }
};





module.exports = {
    signup,
    signIn
};
