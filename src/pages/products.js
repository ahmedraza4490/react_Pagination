import React, { useState, useEffect } from "react";
import "./table1.css";
import axios from "axios";
import TablePagination from '@mui/material/TablePagination';

const ROWS_PER_PAGE = 8;

export default function Products() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios("https://mocki.io/v1/91bacb89-ce9e-4b58-a703-04dcd050605e").then(
      (res) => {
        setOriginalData(res.data);
        setFilteredData(res.data);
      }
    );
  };

  const filterItem = (query) => {
    const updatedList = originalData.filter((curElem) => {
      return (
        curElem.name.toLowerCase().includes(query.toLowerCase()) ||
        curElem.code.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredData(updatedList);
    setCurrentPage(0);
  };

  const filterByDateRange = (startDate, endDate) => {
        const StartDate = new Date(startDate).toLocaleDateString('en-GB').replace(/\//g, '-');
        const EndDate = new Date(endDate).toLocaleDateString('en-GB').replace(/\//g, '-');
        
        const updatedList = originalData.filter((curElem) => {
          return curElem.date >= StartDate && curElem.date <= EndDate;
        });
        
        setFilteredData(updatedList);
        setCurrentPage(0);
      };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setCurrentPage(0);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div className="products">
      <h4 style={{ textDecoration: "underline", fontFamily: "Poppins" }}>
        Inventory Records Page
      </h4>

      <input
        className="search-input"
        type="text"
        placeholder="Search by name or code"
        onChange={(event) => filterItem(event.target.value)}
      />

       <div className="date-range-inputs">
        <input
          className="start-date-input"
          type="date"
          onChange={(event) => {
            const startDate = event.target.value;
            const endDate = document.querySelector(".end-date-input").value;
            filterByDateRange(startDate, endDate);
          }}
          style={{ fontFamily: "Poppins", fontWeight: "normal" }}
        />
  
        <span className="date-range-separator">to</span>
  
        <input
          className="end-date-input"
          type="date"
          onChange={(event) => {
            const startDate = document.querySelector(".start-date-input").value;
            const endDate = event.target.value;
            filterByDateRange(startDate, endDate);
          }}
          style={{ fontFamily: "Poppins", fontWeight: "normal" }}
        />
      </div> 

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Assigned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice(startIndex, endIndex)
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.code}</td>
                  <td>{item.assigned}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

<TablePagination
          // rowsPerPageOptions={[5, 10, 25]}
          rowsPerPageOptions={[]}
          component="div"
          count={filteredData.length}
          rowsPerPage={ROWS_PER_PAGE}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />


    </div>
  );
}


