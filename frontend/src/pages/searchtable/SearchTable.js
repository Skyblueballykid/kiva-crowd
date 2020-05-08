/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint no-script-url: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Popconfirm, Form } from 'antd';

import EditableCell from '../../components/table/EditableCell';
import { StyledDiv } from './SearchTable.styles';
import COLUMNS from './SearchTable.columns';
import query from '../../components/applayout/AppLayout';

const { REACT_APP_API } = process.env;

const SearchTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');


useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get(`${REACT_APP_API}/api/loan/search?search={query}`);
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
      } else {
        newData.push(row);
        setData(newData);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

    
const columns = [
  ...COLUMNS,
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
            title: col.title
          }),
        };
      });
    
      return (
        <StyledDiv>
          <Form form={form} component={false}>
            <Table
              scroll={{ x: 1900 }}
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
                defaultPageSize: 20,
                showSizeChanger: false,
              }}
            />
          </Form>
        </StyledDiv>
      );
    };
    
    export default SearchTable;
    