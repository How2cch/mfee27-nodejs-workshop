import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import InfoByDate from './InfoByDate';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import ButtonGroup from '@mui/material/ButtonGroup';

const StockDetails = (props) => {
  const [error, setError] = useState(null);
  const [dataRaw, setDataRaw] = useState([]);
  const [data, setData] = useState(null);
  const [showType, setShowType] = useState('page');
  const [page, setPage] = useState(1);

  let { stockId } = useParams();

  const showCurrent = (date) => {
    setData(dataRaw.filter((item) => item.date === moment(date).format('YYYY-MM-DD')));
  };

  async function getData(type) {
    if (type === 'date') {
      console.log(type);
      let result = await axios.get(`http://localhost:3001/api/1.0/stock-prices/${stockId}?type=date`);
      setDataRaw(result.data);
      setData(null);
      return;
    }
    let result = await axios.get(`http://localhost:3001/api/1.0/stock-prices/${stockId}?page=${page}`);
    setDataRaw(result.data);
    setData(result.data.data);
  }

  useEffect(() => {
    (async () => {
      getData(showType);
    })();
  }, [page]);

  return (
    <>
      <ButtonGroup variant="outlined" color="secondary" className="shadow mx-6 mt-6">
        <Button
          variant={showType === 'page' ? 'contained' : 'outlined'}
          onClick={() => {
            getData('page');
            setShowType('page');
          }}
        >
          分頁瀏覽
        </Button>
        <Button
          variant={showType === 'date' ? 'contained' : 'outlined'}
          onClick={() => {
            getData('date');
            setShowType('date');
          }}
        >
          日期查詢
        </Button>
      </ButtonGroup>
      {error && <div>{error}</div>}
      {data &&
        showType === 'page' &&
        data.map((item) => {
          return (
            <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6 " key={item.date}>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{item.date}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：{item.volume}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：{item.amount}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：{item.open_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：{item.close_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：{item.delta_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：{item.high_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：{item.low_price}</h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：{item.transactions}</h2>
            </div>
          );
        })}
      {data && showType === 'page' && (
        <div className="flex justify-center mb-6">
          <Pagination
            count={dataRaw.lastPage}
            color="secondary"
            page={page}
            showFirstButton
            showLastButton
            onChange={(e, page) => {
              setPage(page);
            }}
          />
        </div>
      )}
      {showType === 'date' && <InfoByDate data={data} error={error} showCurrent={showCurrent} />}
    </>
    // <div className="flex">
    //   {error && <div>{error}</div>}
    //   <div>
    //     <Calendar
    //       className="m-6 mr-0 rounded-lg shadow border-0"
    //       style={{ border: '0px' }}
    //       activeStartDate={null}
    //       onChange={(e) => {
    //         setData(dataRaw.filter((item) => item.date === moment(e).format('YYYY-MM-DD')));
    //       }}
    //     />
    //   </div>
    //   {data !== null && data.length === 0 && (
    //     <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6 w-full">
    //       <h2 className="text-2xl font-bold mb-2 text-gray-800">該日期目前查無資料</h2>
    //     </div>
    //   )}
    //   {data === null ? (
    //     <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6 w-full">
    //       <h2 className="text-2xl font-bold mb-2 text-gray-800">請選擇日期</h2>
    //     </div>
    //   ) : (
    //     data.map((item) => {
    //       return (
    //         <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6 w-full">
    //           <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{item.date}</h2>
    //           <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：{item.volume}</h2>
    //           <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：{item.amount}</h2>
    //           <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：{item.open_price}</h2>
    //           <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：{item.close_price}</h2>
    //           <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：{item.delta_price}</h2>
    //           <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：{item.high_price}</h2>
    //           <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：{item.low_price}</h2>
    //           <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：{item.transactions}</h2>
    //         </div>
    //       );
    //     })
    //   )}
    //   {}
    // </div>
  );
};

export default StockDetails;
