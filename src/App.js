import React from 'react';

import Table from "./Table";
import './App.css';

function App() {
  const data = React.useMemo(
    () => [
      {
        sp1: "test1",
        sp2: "xyz",
      },
      {
        sp1: "test2",
        sp2: "abc",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Spalte1",
        accessor: "sp1",
      },
      {
        Header: "Spalte2",
        accessor: "sp2",
      },
    ],
    []
  );

  return (
    <div>
      <Table columns={columns} data={data}/>
    </div>
  );
}


export default App;
