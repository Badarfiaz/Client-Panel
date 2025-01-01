import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Complaints } from '../Redux/AddComplaints'; // Update with your thunk file path
import { Button, TextField, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';

const ComplaintForm = () => {
  const [items, setItems] = useState([
    { Order_id: '', Customer_id: '', Complaint_text: '', Resolution_status: '' }
  ]);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Complaints: ', items);
    items.forEach((item) => {
      const { Order_id, Customer_id, Complaint_text, Resolution_status } = item;

      dispatch(
        Complaints({
          Order_id: parseInt(Order_id),
          Customer_id: parseInt(Customer_id),
          Complaint_text: Complaint_text || 'No description provided',
          Resolution_status: Resolution_status || 'Pending',
        })
      );
    });

    setItems([{ Order_id: '', Customer_id: '', Complaint_text: '', Resolution_status: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Complaints</h2>
      {items.map((item, index) => (
        <div key={index} className="mb-6">
          <TextField
            type="number"
            label="Order ID"
            variant="outlined"
            fullWidth
            value={item.Order_id}
            onChange={(e) => handleChange(index, 'Order_id', e.target.value)}
            className="mb-4"
          />
          <TextField
            type="number"
            label="Customer ID"
            variant="outlined"
            fullWidth
            value={item.Customer_id}
            onChange={(e) => handleChange(index, 'Customer_id', e.target.value)}
            className="mb-4"
          />
          <TextField
            label="Complaint Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={item.Complaint_text}
            onChange={(e) => handleChange(index, 'Complaint_text', e.target.value)}
            className="mb-4"
          />
          <TextField
            label="Resolution Status"
            variant="outlined"
            fullWidth
            value={item.Resolution_status}
            onChange={(e) => handleChange(index, 'Resolution_status', e.target.value)}
          />
        </div>
      ))}

      <div className="flex justify-between items-center">
        <IconButton
          onClick={() =>
            setItems([...items, { Order_id: '', Customer_id: '', Complaint_text: '', Resolution_status: '' }])
          }
          color="primary"
          size="large"
        >
          <AddCircleOutlineIcon />
        </IconButton>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ComplaintForm;
