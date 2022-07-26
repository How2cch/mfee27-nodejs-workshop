import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/config';

const Register = () => {
  const [user, setUser] = useState({
    email: 'howardchen1617@gmail.com',
    name: '陳家豪',
    password: 'aaaaaaaa',
    confirmPassword: 'aaaaaaaa',
  });

  const handleEdit = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    setUser({ ...user, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      for (const key in user) {
        formData.append(key, user[key]);
      }
      let response = await axios.post(`${API_URL}/auth/register`, formData);
      console.log(response.data);
      // if (response.data.status === 'ok') alert(response.data.message);
    } catch (err) {
      console.error('register', err);
      // if (err.response.data.error) return alert('資料欄位錯誤');
      // alert(err.response.data.message);
    }
  };
  return (
    <form
      className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">註冊帳戶</h2>
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
          onChange={handleEdit}
          required
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          姓名
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleEdit}
          required
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleEdit}
          required
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-32">
          確認密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleEdit}
          required
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="photo" className="flex mb-2 w-32">
          圖片
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="file"
          id="photo"
          name="photo"
          onChange={(e) => {
            handleUpload(e);
          }}
        />
      </div>
      <button className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in">註冊</button>
    </form>
  );
};

export default Register;
