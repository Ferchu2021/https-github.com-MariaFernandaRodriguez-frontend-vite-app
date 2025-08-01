import React from "react";
import PropTypes from "prop-types";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Charts.css";

const PieChart = ({
  data,
  dataKey = "value",
  nameKey = "name",
  title,
  height = 300,
  showLegend = true,
  showTooltip = true,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"],
  className = "",
}) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p style={{ color: payload[0].color }}>
            Valor: {payload[0].value}
          </p>
          <p style={{ color: payload[0].color }}>
            Porcentaje: {((payload[0].value / data.reduce((sum, item) => sum + item[dataKey], 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  title: PropTypes.string,
  height: PropTypes.number,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default PieChart; 