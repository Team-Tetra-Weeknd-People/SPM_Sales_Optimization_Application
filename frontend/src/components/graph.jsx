import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Customized,
  Rectangle,
} from 'recharts';



// using Customized gives you access to all relevant chart props
const CustomizedRectangle = (props) => {
  const { formattedGraphicalItems } = props;
  // get first and second series in chart
  const firstSeries = formattedGraphicalItems[0];

  // render custom content using points from the graph
  return firstSeries?.props?.points.map((firstSeriesPoint,) => {
    return (
      <Rectangle
        key={firstSeriesPoint.payload.name}
      />
    )
  })
};

const Graph = (props) => {
  const data = [
    {
      name: props.cost,
      Profit: 0,
    },
    {
      name: props.msrp,
      Profit: 100,
    },
    {
      name: props.level3,
      Profit: 5,
    },
    {
      name: props.level4,
      Profit: 0,
    },
    
  ];

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis hide={true}/>
        <Legend />
        <Line type="monotone" dataKey="Profit" stroke="#568463" />
        <Customized component={CustomizedRectangle} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;