import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

const { Option } = Select;

const ResponsiveBarChart = ({ data, xAxis, yAxes, operation, setOperation,threshold, setThreshold}) => {

  return (
    <div style={{ width: '100%', height: 500,display:'flex',flexDirection:'column' , justifyContent:"center",alignItems:'center'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px',width:'100%' }}>
        <Select
          value={operation}
          onChange={value => setOperation(value)}
          style={{ width: 200 }}
        >
          <Option value="average">Average</Option>
          <Option value="min">Minimum</Option>
          <Option value="max">Maximum</Option>
          <Option value="above">Above {threshold}%</Option>
          <Option value="below">Below {threshold}%</Option>
        </Select>
        {(operation === 'above' || operation === 'below') && (
          <input
            type="number"
            value={threshold}
            onChange={e => setThreshold(e.target.value)}
            style={{ width: 100 }}
          />
        )}
      </div>
      <ResponsiveContainer width="98%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          {yAxes.map((yAxis, index) => (
            <Bar
              key={index}
              dataKey={yAxis}
              fill={COLORS[index % COLORS.length]}
              name={yAxis}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000','#4477aa','#bb55cc','#339977'];

export default ResponsiveBarChart;