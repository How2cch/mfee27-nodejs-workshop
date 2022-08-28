import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const StockDetails = (props) => {
  const [error, setError] = useState(null);
  const [dataRaw, setDataRaw] = useState([]);
  const [data, setData] = useState(null);

  let { stockId } = useParams();

  useEffect(() => {
    (async () => {
      let result = await axios.get(`http://localhost:3001/api/1.0/stock-prices/${stockId}`);
      for (const item of result.data) {
        item.date = moment(item.date).format('YYYY-MM-DD');
      }
      setDataRaw(result.data);
    })();
  }, []);

  return (
    <div className="flex">
      {error && <div>{error}</div>}
      <div>
        <Calendar
          className="m-6 mr-0"
          activeStartDate={null}
          onChange={(e) => {
            setData(dataRaw.filter((item) => item.date === moment(e).format('YYYY-MM-DD')));
          }}
        />
      </div>
      {data !== null && data.length === 0 && (
        <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6 w-full">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">該日期目前查無資料</h2>
        </div>
      )}
      {data === null ? (
        <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6 w-full">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">請選擇日期</h2>
        </div>
      ) : (
        data.map((item) => {
          return (
            <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6 w-full">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{item.date}</h2>
              {/* <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：{item.}</h2> */}
              {/* <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：{item.}</h2> */}
              <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：{item.open_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：{item.close_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：{item.delta_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：{item.high_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：{item.low_price}</h2>
              {/* <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：{item.}</h2> */}
            </div>
          );
        })
      )}
      {}
    </div>
  );
};

export default StockDetails;
