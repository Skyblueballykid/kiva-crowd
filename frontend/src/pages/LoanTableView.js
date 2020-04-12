import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Table, Popconfirm, Form } from 'antd';
import EditableCell from '../components/table/EditableCell';
import { StyledDiv } from './LoanTableView.styles';

const { REACT_APP_API } = process.env;

const LoanTableView = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${REACT_APP_API}/api/loan/`);
      const { results } = res.data;
      console.log(results);
      setData(results);
    };
    fetchData();
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
      editable: false,
    },
    {
      title: 'Loan Name',
      dataIndex: 'loan_name',
      width: '12%',
      editable: true,
    },
    {
      title: 'Loan Amount',
      dataIndex: 'loan_amount',
      width: '8%',
      editable: true,
      render: (amount) => `$ ${amount}`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '5%',
      editable: true,
    },
    {
      title: 'Loan Use',
      dataIndex: 'loan_use',
      width: '38%',
      editable: true,
    },
    {
      title: 'Sector Name',
      dataIndex: 'sector_name',
      width: '8%',
      editable: true,
    },
    {
      title: 'Country Name',
      dataIndex: 'country_name',
      width: '8%',
      editable: true,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      width: '5%',
      editable: true,
    },
    {
      title: 'Posted Time',
      dataIndex: 'posted_time',
      width: '10%',
      editable: true,
      render: (date) => format(new Date(date), 'MM/dd/yyyy')
    },
    {
      title: 'Raised Time',
      dataIndex: 'raised_time',
      width: '10%',
      editable: true,
      render: (date) => format(new Date(date), 'MM/dd/yyyy')
    },
    {
      title: 'Lender Term',
      dataIndex: 'lender_term',
      width: '7%',
      editable: true,
    },
    {
      title: 'Total Lenders',
      dataIndex: 'num_lenders_total',
      width: '7%',
      editable: true,
    },
    {
      title: 'Repayment Interval',
      dataIndex: 'repayment_interval',
      width: '7%',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <StyledDiv>
      <Form form={form} component={false}>
        <Table
          scroll={{ x: 1800 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 20,
            // onChange: cancel,
          }}
        />
      </Form>
    </StyledDiv>
  );
};

export default LoanTableView;
