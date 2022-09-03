import React from 'react';

export default function StockDataList({ pageData }) {
  return pageData.data.map((item) => {
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
  });
}
