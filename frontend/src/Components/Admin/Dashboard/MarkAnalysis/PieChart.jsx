import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = ({ data }) => {

  if (!Array.isArray(data)) {
    console.error('Data is not an array');
    return null;
  }

  const isNumericData = data.some(item => 'range' in item);
   const dataLength = data.length;

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="count"
        nameKey={isNumericData ? 'range' : 'value'}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `${value}`} />
      {dataLength <= 12 && <Legend />}
    </PieChart>
  );
};

export default PieChartComponent;
