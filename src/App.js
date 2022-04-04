import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css';

const App = () => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  //Fetch Data from API 
  const getData = () => {
    let headersList = {
      "Accept": "application/json",
      "Content-type": "application/json"
    }

    let reqOptions = {
      url: "https://jsonplaceholder.typicode.com/photos",
      method: "GET",
      headers: headersList,
    }

    axios.request(reqOptions).then(function (response) {
      const data = response.data;
      // console.log(data);
      const sliceData = data.slice(offset, offset + perPage);
      const postDatas = sliceData.map((postData) => (
        <div key={postData.id}>
          <p>{postData.id}</p>
          <p>{postData.title}</p>
          <img src={postData.thumbnailUrl} alt='Image' />
        </div>
      ))
      setData(postDatas);
      setPageCount(Math.ceil(data.length / perPage));
    }).catch(error => {
      console.warn(error);
    })

  }
  useEffect(() => {
    getData();
  }, [offset]);

  const handlePageClickHandler = (e) => {
    const selectedPage = e.selected;
    // console.log(selectedPage);
    setOffset(selectedPage + 1)

  }
  return (
    <>
      {data}
      <ReactPaginate previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClickHandler}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </>
  )
}

export default App