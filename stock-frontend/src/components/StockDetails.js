import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import InfoByDate from './InfoByDate';
import StockPagination from './StockPagination';
import StockDataList from './StockDataList';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { API_URL } from '../utils/config';

const StockDetails = (props) => {
  const [error, setError] = useState(null);
  const [pageDataRaw, setPageDataRaw] = useState([]);
  const [dateDataRaw, setDateDataRaw] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [dateData, setDateData] = useState(null);
  const [showType, setShowType] = useState('page');
  const [page, setPage] = useState(1);

  let { stockId } = useParams();

  const showCurrent = (date) => {
    setDateData(dateDataRaw.filter((item) => item.date === moment(date).format('YYYY-MM-DD')));
  };

  async function getData(type, page) {
    if (type === 'date') {
      if (dateData) return;
      let result = await axios.get(`${API_URL}/stock/${stockId}?type=date`);
      setDateDataRaw(result.data);
      setDateData(null);
      return;
    }
    let result = await axios.get(`${API_URL}/stock/${stockId}?page=${page}`);
    let newPageData = JSON.parse(JSON.stringify(pageDataRaw));
    newPageData[page - 1] = result.data;
    setPageDataRaw(newPageData);
    setPageData(newPageData[page - 1]);
  }

  useEffect(() => {
    if (pageDataRaw[page - 1]) return setPageData(pageDataRaw[page - 1]);
    getData(showType, page);
  }, [page]);

  return (
    <>
      <ButtonGroup variant="outlined" color="secondary" className="shadow mx-6 mt-6">
        <Button
          variant={showType === 'page' ? 'contained' : 'outlined'}
          onClick={() => {
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
      {pageData && showType === 'page' && <StockDataList pageData={pageData} />}
      {pageData && showType === 'page' && <StockPagination pageData={pageData} setPage={setPage} />}
      {showType === 'date' && <InfoByDate data={dateData} error={error} showCurrent={showCurrent} />}
    </>
  );
};

export default StockDetails;
