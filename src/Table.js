import {useTable, useSortBy} from "react-table";

function Table({columns, data}){
  
	const tableInstance = useTable({columns, data}, useSortBy)
  
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
				<th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
  
  export default Table;