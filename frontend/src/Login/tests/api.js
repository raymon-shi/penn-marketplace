const axios = require('axios');

// Login Form
const login = async (event, email, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    const { data } = await axios.post(
      '/account/login',
      {
        email,
        password,
      },
      config,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('There was an error in /account/login');
  }
};

const failedLogin = async (email) => {
  try {
    const { data } = await axios.post('/account/failedLogin', { email });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('There was an error in /account/failedLogin');
  }
};

const resettingPassword = async (email, password) => {
  try {
    const { data } = await axios.post('/account/resetpassword', { email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('There was an issue resetting your password! Check the username and password');
  }
};

const signup = async (
  email,
  firstName,
  lastName,
  password,
  month,
  day,
  year,
  major,
  school,
  classYear,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  // signup route -> login route -> navigate to homepage
  try {
    const { data } = await await axios.post('/account/signup', {
      email,
      firstName,
      lastName,
      password,
      month,
      day,
      year,
      major,
      school,
      classYear,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('There was an error in /account/signup');
  }
};

module.exports = {
  login,
  failedLogin,
  resettingPassword,
  signup,
};
