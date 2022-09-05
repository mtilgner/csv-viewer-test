import React, {useState} from 'react';
import Papa from "papaparse";

import Table from "./Table";
import './App.css';

function App() {
  //   const data = React.useMemo(
  //   () => [
  //     {
  //       sp1: "test1",
  //       sp2: "xyz",
  //     },
  //     {
  //       sp1: "test2",
  //       sp2: "abc",
  //     },
  //   ],
  //   []
  // );

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Spalte1",
  //       accessor: "sp1",
  //     },
  //     {
  //       Header: "Spalte2",
  //       accessor: "sp2",
  //     },
  //   ],
  //   []
  // );

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const parseFile = (file) => {
    const result = Papa.parse(file, {delimiter: ",", header: true});
    // Spaltenueberschriften konvertieren fuer react-table
    const cols = result.meta.fields.map((field) => {return {Header: field, accessor: field}});
    setColumns(cols);
    setData(result.data);
  };

  const handleFileChange = (e) => {
    if(e.target.files.length){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        parseFile(reader.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        type="File"
        name="csvFileDialog"
        id="csvFileDialog"
        onChange={handleFileChange}
      />
      <Table columns={columns} data={data}/>
    </div>
  );
}


export default App;
