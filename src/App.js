import React from 'react';

import {useTable} from "react-table";

import './App.css';

function App() {
  return (
    <div>
      <Table />
    </div>
  );
}

function Table(){
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

  const tableInstance = useTable({columns, data})

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return(
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return(
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
