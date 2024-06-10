import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  Select,
  SelectItem
} from "@nextui-org/react";
import axiosClient from '../../configs/axiosClient';

const GlobalTable = ({ columns, dataEndpoint }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default number of rows per page

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(dataEndpoint);
      setData(response.data);
      setTotalPages(Math.ceil(response.data.count / rowsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / rowsPerPage));
  }, [data, rowsPerPage]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1); // Reset to first page whenever rows per page changes
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = data.slice(start, end);

  return (
    <div>
      <div className="flex flex-col justify-between items-end mb-4 my-2">
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>
      <Table aria-label="Example table with pagination">
        <TableHeader>
          {columns.map((column, index) => (
            <TableColumn key={index}>{column}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{item[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="py-2 px-2 flex justify-between my-2 items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GlobalTable;
