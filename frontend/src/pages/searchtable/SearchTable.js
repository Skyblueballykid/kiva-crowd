/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint no-script-url: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Popconfirm, Form } from 'antd';
import PropTypes from 'prop-types';

import EditableCell from '../../components/table/EditableCell';
import { StyledDiv } from './SearchTable.styles';
import COLUMNS from './SearchTable.columns';

const { REACT_APP_API } = process.env;

const SearchTable = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [loading, setLoading] = useState(false);


useEffect(() => {
    let query = "";
    if (props.location.state && props.location.state.query) {
      query = `?search=${props.location.state.query}`;
    }
    const fetchData = async () => {
        setLoading(true);
        const res = await axios.get(`${REACT_APP_API}/api/loan/search${query}`);
        const { results } = res.data;
        console.log(results);
        setData(results);
        setLoading(false);
    };
    fetchData();
    }, [props.location.state]);
  

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
              loading={loading}
            />
          </Form>
        </StyledDiv>
      );
    };

    SearchTable.propTypes = {
      location: PropTypes.shape({
        state: PropTypes.shape({
          query: PropTypes.string
        })
      }).isRequired
    };
    
    export default SearchTable;
    