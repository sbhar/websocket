import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import Moment from 'react-moment';
import WebSocket from 'isomorphic-ws';

const MyTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://websocket.b4a.app:8080');

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      // Update the state to include the new data
      // Ensure that newData is an array before updating the state
      if (Array.isArray(newData)) {
        setData((prevData) => [...prevData, ...newData]);
      } else {
        // If newData is not an array, wrap it in an array before updating the state
        setData((prevData) => [...prevData, newData]);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      // Use Moment component to format the date
      render: (text) => <Moment format="YYYY-MM-DD HH:mm:ss">{text}</Moment>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    // ... other columns
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default MyTable;
