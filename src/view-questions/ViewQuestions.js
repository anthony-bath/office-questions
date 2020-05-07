import React from 'react';
import { useTable } from 'react-table';
import { Table } from 'react-bootstrap';

const columns = [
  { Header: 'Season', accessor: 'season', width: 10 },
  { Header: 'Episode', accessor: 'episode', width: 10 },
  { Header: 'Question', accessor: 'text', width: 40 },
  { Header: 'Answer', accessor: 'answer', width: 40 },
];

export function ViewQuestions() {
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    const req = window.indexedDB.open('office-trivia', 1);

    req.onsuccess = function (event) {
      let db = event.target.result;

      const tx = db.transaction('questions', 'readonly');
      const store = tx.objectStore('questions');
      const getReq = store.getAll();

      getReq.onsuccess = function (event) {
        setQuestions(event.target.result);
      };
    };
  }, []);

  const data = React.useMemo(() => [...questions], [questions]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Table striped bordered hover size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
              <th {...column.getHeaderProps()} style={{ width: `${columns[i].width}%` }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
