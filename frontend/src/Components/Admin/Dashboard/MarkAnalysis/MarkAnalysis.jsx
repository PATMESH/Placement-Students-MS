import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Button, Select } from "antd";
import { useDropzone } from "react-dropzone";
import BarChartComponent from "./BarChart";
import PieChartComponent from "./PieChart";
import "./analysis.css";

const { Option } = Select;

const MarkAnalysis = () => {
  const [excelData, setExcelData] = useState(null);
  const [showCharts, setShowCharts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [xAxisData, setXAxisData] = useState(null);
  const [chartType, setChartType] = useState("");
  const [pieChartColumns, setPieChartColumns] = useState([]);
  const [barChartXAxis, setBarChartXAxis] = useState("");
  const [barChartYAxes, setBarChartYAxes] = useState([]);

  useEffect(() => {
    if (excelData && barChartXAxis) {
      setXAxisData(
        [...new Set(excelData.map((student) => student[barChartXAxis])).filter(value => value != null)].sort()
      );
    }
  }, [excelData, barChartXAxis]);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    setLoading(true);
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(jsonData);
      setShowCharts(true);
    };
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    reader.readAsArrayBuffer(file);
  };

  const onBack = () => {
    setShowCharts(false);
    setExcelData(null);
    setChartType("");
    setPieChartColumns([]);
    setBarChartXAxis("");
    setBarChartYAxes([]);
  };

  const [operation, setOperation] = useState("average");
  const [threshold, setThreshold] = useState(40);

  const calculateAverageMark = (xAxis, test) => {
    let totalMark = 0;
    let count = 0;
    excelData.forEach((student) => {
      if (student[barChartXAxis] === xAxis) {
        totalMark += parseFloat(student[test]);
        count++;
      }
    });
    if (totalMark < 0) return 0;
    return (totalMark / count).toFixed(2);
  };

  const countAboveThreshold = (xAxis, test) => {
    let count = 0;
    excelData.forEach((student) => {
      if (student[barChartXAxis] === xAxis) {
        const m = parseFloat(student[test]);
        if (m >= threshold) count++;
      }
    });
    return count;
  };

  const countBelowThreshold = (xAxis, test) => {
    let count = 0;
    excelData.forEach((student) => {
      if (student[barChartXAxis] === xAxis) {
        const m = parseFloat(student[test]);
        if (m <= threshold) count++;
      }
    });
    return count;
  };

  const calculateHighestMark = (xAxis, test) => {
    let highestMark = -Infinity;
    excelData.forEach((student) => {
      if (student[barChartXAxis] === xAxis) {
        const mark = parseFloat(student[test]);
        if (mark > highestMark) {
          highestMark = mark;
        }
      }
    });
    if(highestMark===-Infinity)return 0;
    return highestMark.toFixed(2);
  };

  const calculateLowestMark = (xAxis, test) => {
    let lowestMark = Infinity;
    excelData.forEach((student) => {
      if (student[barChartXAxis] === xAxis) {
        const mark = parseFloat(student[test]);
        if (mark < lowestMark) {
          lowestMark = mark;
        }
      }
    });
    if (lowestMark < 0) return 0;
    return lowestMark === Infinity ? 0 : lowestMark.toFixed(2);
  };

  const createPieChartData = (column) => {
    const isNumericColumn = !isNaN(excelData[0][column]);
  
    if (isNumericColumn) {
      const counts = {};
  
      excelData.forEach((student) => {
        const mark = parseFloat(student[column]);
        const range = Math.floor(mark / 10) * 10;
        counts[range] = (counts[range] || 0) + 1;
      });
  
      return Object.entries(counts).map(([range, count]) => ({
        range: `${range}-${+range + 9}`,
        count,
      }));
    } else {
      const counts = {};

      excelData.forEach((student) => {
        const value = student[column];
        counts[value] = (counts[value] || 0) + 1;
      });

      console.log(Object.entries(counts).map(([value, count]) => ({
        value,
        count,
      })));

      return Object.entries(counts).map(([value, count]) => ({
        value,
        count,
      }));
    }
  };

  const isNumericData = (columnName) => {
    const firstItem = excelData[0][columnName];
    return typeof firstItem === 'number' && !isNaN(firstItem);
  };
  

  function getXAxisShort(xAxisName) {
    if(!xAxisName)return null;
    if (typeof xAxisName === "number") return xAxisName;
    if (xAxisName === "Biotechnology") return "Bio Tech";
    if (xAxisName === "Information Technology") return "IT";
    if (xAxisName.length <= 10) {
      return xAxisName;
    } else if (xAxisName.length > 10 && xAxisName.length <= 23) {
      const firstWord = xAxisName.split(" ")[0];
      return firstWord;
    } else {
      const capitalLetters = xAxisName.match(/[A-Z]/g).join("");
      return capitalLetters;
    }
  }

  const generateBarChartData = () => {
    if (!excelData || !xAxisData || barChartYAxes.length === 0) return [];
    return xAxisData.map((xAxis) => ({
      [barChartXAxis]: getXAxisShort(xAxis),
      ...barChartYAxes.reduce(
        (acc, yAxis) => ({
          ...acc,
          [yAxis]:
            operation === "min"
              ? calculateLowestMark(xAxis, yAxis)
              : operation === "max"
              ? calculateHighestMark(xAxis, yAxis)
              : operation === "above"
              ? countAboveThreshold(xAxis, yAxis)
              : operation === "below"
              ? countBelowThreshold(xAxis, yAxis)
              : operation === "average"
              ? calculateAverageMark(xAxis, yAxis)
              : calculateAverageMark(xAxis, yAxis),
        }),
        {}
      ),
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        alert("Only Excel files (.xlsx) are allowed.");
        return;
      }
      handleFileChange(file);
    },
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
          <circle
            className="pl__ring pl__ring--a"
            cx="120"
            cy="120"
            r="105"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 660"
            strokeDashoffset="-330"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--b"
            cx="120"
            cy="120"
            r="35"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 220"
            strokeDashoffset="-110"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--c"
            cx="85"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--d"
            cx="155"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
        </svg>
      </div>
    );
  }

  return (
    <div className="App11" style={{ width: "100%" }}>
      <div className="center11">
        {!showCharts ? (
          <div {...getRootProps()} className="custom-dropzone">
            <input {...getInputProps()} />
            <p className="dropzone-text1">Maximum file size: 1MB</p>
            <button className="select-button">Select</button>
            <p className="dropzone-text">Drag and drop your file here</p>
            <p className="dropzone-text1">Accepted file type: .xlsx</p>
          </div>
        ) : (
          <div>
            <nav aria-label="breadcrumb" className="main-breadcrumb">
              <ol className="breadcrumb">
                <Button onClick={onBack} style={{ fontWeight: "bold" }}>
                  &larr; Back
                </Button>
              </ol>
            </nav>
            <div>
              <h2>Select Chart Type</h2>
              <Select
                value={chartType}
                onChange={(value) => setChartType(value)}
                style={{ width: 200 }}
              >
                <Option value="">Select Chart Type</Option>
                <Option value="pie">Pie Chart</Option>
                <Option value="bar">Bar Chart</Option>
              </Select>
            </div>

            {chartType === "pie" && excelData && excelData.length > 0 && (
              <div>
                <h3>Select Columns for Pie Chart</h3>
                <Select
                  mode="multiple"
                  value={pieChartColumns}
                  onChange={(values) => setPieChartColumns(values)}
                  style={{ width: '30%' }}
                >
                  {Object.keys(excelData[0]).map((column, index) => (
                    <Option key={index} value={column}>
                      {column}
                    </Option>
                  ))}
                </Select>
              </div>
            )}

            {chartType === "bar" && excelData && excelData.length > 0 && (
              <div>
                <h3>Select X-Axis Column</h3>
                <Select
                  value={barChartXAxis}
                  onChange={(value) => setBarChartXAxis(value)}
                  style={{ width: 200 }}
                >
                  <Option value="">Select X-Axis Column</Option>
                  {Object.keys(excelData[0]).map((column, index) => (
                    <Option key={index} value={column}>
                      {column}
                    </Option>
                  ))}
                </Select>
                <h3>Select Y-Axes Columns</h3>
                <Select
                  mode="multiple"
                  value={barChartYAxes}
                  onChange={(values) => setBarChartYAxes(values)}
                  style={{ marginBottom: "20px", minWidth:'30%' }}
                >
                  {Object.keys(excelData[0]).map((column, index) => (
                    <Option key={index} value={column}>
                      {column}
                    </Option>
                  ))}
                </Select>
              </div>
            )}

            {chartType === "pie" && pieChartColumns.length > 0 && (
              <div className="pie-charts">
                {pieChartColumns.map((column) => (
                  <div key={column} className="pie-chart">
                    <h3>{isNumericData(column) ? `${column} Performance` : `${column} Count`}</h3>
                    <PieChartComponent
                      data={createPieChartData(column)}
                      title={column}
                    />
                  </div>
                ))}
              </div>
            )}

            {chartType === "bar" &&
              barChartXAxis &&
              barChartYAxes.length > 0 && (
                <div className="bar-chart" style={{ width: "100%" }}>
                  <BarChartComponent
                    data={generateBarChartData()}
                    xAxis={barChartXAxis}
                    yAxes={barChartYAxes}
                    operation={operation}
                    setOperation={setOperation}
                    threshold={threshold}
                    setThreshold={setThreshold}
                  />
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkAnalysis;
