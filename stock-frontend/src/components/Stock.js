import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/config';

const Stock = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      let response = await axios.get(`${API_URL}/stock`);
      setData(response.data);
    })();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>
      {data.map((stock) => {
        return (
          <div key={stock.id} className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer">
            <Link to={`/stock/${stock.id}`}>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{stock.id}</h2>
              <p className="text-gray-700">{stock.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Stock;
