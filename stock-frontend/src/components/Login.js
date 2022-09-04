import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/config';

const Login = () => {
  const [user, setUser] = useState({ email: 'howardchen1617@gmail.com', password: 'aaaaaaaa' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${API_URL}/auth/login`, user);
      console.log(result.data);
    } catch (error) {
      console.error('error', error);
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center"
      onSubmit={handleSubmit}
    >
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">登入帳戶</h2>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          Email
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in">
        登入
      </button>
    </form>
  );
};

export default Login;
