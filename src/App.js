import React, {useState} from 'react';
import Papa from "papaparse";

import Table from "./Table";
import './App.css';

function App() {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const parseFile = (file) => {
    const result = Papa.parse(file, {delimiter: ",", header: true});

    // Spaltenueberschriften konvertieren fuer react-table
    const columnHeaders = result.meta.fields.map((field) => {
      return {Header: field, accessor: field};
    });

    // Leerzeile filtern
    const dataFiltered = result.data.filter((row) => row.id != "");

    // Datum konvertieren in deutsches Format (nur Spalte "birthday")
    const dataConverted = dataFiltered.map((row) => {
      let date = new Date(row.birthday);
      let birthdayConverted = date?.toLocaleDateString("de-DE", {dateStyle: "medium"});
      return Object.assign({}, row, {birthday: birthdayConverted});
    });

    setColumns(columnHeaders);
    setData(dataConverted);
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
