import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryHistory } from "../actions/libraryActions";

const LibraryHistory = () => {
  const dispatch = useDispatch();
  const { libraryHistory } = useSelector((state) => state.library);

  useEffect(() => {
    dispatch(fetchLibraryHistory());
  }, [dispatch]);

  return (
    <div>
      <h2>Library History</h2>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {libraryHistory.map((record) => (
            <tr key={record._id}>
              <td>{record.bookName}</td>
              <td>{record.borrowDate}</td>
              <td>{record.returnDate || "Not Returned"}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibraryHistory;
