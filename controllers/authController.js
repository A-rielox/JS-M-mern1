const register = async (req, res) => {
   res.send('register route de jobify');
};

const login = async (req, res) => {
   res.send('login route de jobify');
};

const updateUser = async (req, res) => {
   res.send('update user route de jobify');
};

export { register, login, updateUser };
