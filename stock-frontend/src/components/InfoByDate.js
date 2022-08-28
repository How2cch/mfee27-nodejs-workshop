import React from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';

export default function InfoByDate({ data, error, showCurrent }) {
  return (
    <div className="flex">
      <div>
        <Calendar
          className="m-6 mr-0 rounded-lg shadow border-0"
          style={{ border: '0px' }}
          activeStartDate={null}
          onChange={(date) => {
            showCurrent(date);
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
            <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6 w-full" key={item.date}>
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
        })
      )}
      {}
    </div>
  );
}
