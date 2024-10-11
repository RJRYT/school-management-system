import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeesHistory } from "../actions/feesActions";

const FeesHistory = () => {
  const dispatch = useDispatch();
  const { feesHistory } = useSelector((state) => state.fees);

  useEffect(() => {
    dispatch(fetchFeesHistory());
  }, [dispatch]);

  return (
    <div>
      <h2>Fees History</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Fee Type</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {feesHistory.map((record) => (
            <tr key={record._id}>
              <td>{record.studentId}</td>
              <td>{record.feeType}</td>
              <td>{record.amount}</td>
              <td>{record.paymentDate}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeesHistory;
