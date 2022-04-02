/* eslint-disable no-console */
const axios = require('axios');

// penn api stuff
const init = {
  method: 'GET',
  headers: {
    'Authorization-Bearer': 'UPENN_OD_enPs_1005844',
    'Authorization-Token': 'gi2md86hljr7tgm7fcbp79np2n',
  },
};

const isPennStudent = async (req, res, next) => {
  const {
    firstName, lastName, email, major,
  } = req.body;

  // check if email ends in upenn.edu, best we can do :(
  if (!email.endsWith('upenn.edu')) {
    return res.send(`The user with name: ${firstName} ${lastName} and email: ${email} is not a Penn student or is not saved in the Penn directory`);
  }

  const baseURL = `https://esb.isc-seo.upenn.edu/8091/open_data/directory?first_name=${firstName}&last_name=${lastName}`;

  try {
    const response = await axios.get(baseURL, init);
    if (response.data.result_data.length > 0) {
      for (let i = 0; i < response.data.result_data.length; i += 1) {
        // check if names and majors match
        if (response.data.result_data[i].list_name.includes(`${lastName}, ${firstName}`) && response.data.result_data[i].list_title_or_major.includes(major)) {
          console.log(response.data.result_data);
          return next();
        }
      }
    }
    return undefined;
  } catch (error) {
    return next(new Error(`There is an error in Penn student verification with error message: ${error}`));
  }
};

module.exports = isPennStudent;
