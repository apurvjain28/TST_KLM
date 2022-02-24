import "./App.css";
import { useCallback, useState } from "react";

const DUMMY_DATA = [
  {
    Username: "booker12",
    Identifier: "9012",
    "First Name": "Rachel",
    "Last Name": "Booker",
  },
  {
    Username: "grey07",
    Identifier: "2070",
    "First Name": "Laura",
    "Last Name": "Grey",
  },
  {
    Username: "johnson81",
    Identifier: "4081",
    "First Name": "Craig",
    "Last Name": "Johnson",
  },
  {
    Username: "jenkins46",
    Identifier: "9346",
    "First Name": "Mary",
    "Last Name": "Jenkins",
    VIP: "false",
  },
  {
    Username: "smith79",
    Identifier: "5079",
    "First Name": "Jamie",
    "Last Name": "Smith",
    VIP: "true",
  },
];

const extractUniqueHeaders = (data) => {
  let allKeys = [];
  data.map((item) => {
    return allKeys.push(...Object.keys(item));
  });
  return [...new Set(allKeys)];
};
let headers = extractUniqueHeaders(DUMMY_DATA);

function sortData(tableData, sortKey, sortOrder) {
  const sortedData = tableData.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (sortOrder === "ASC") {
    return sortedData.reverse();
  } else {
    return sortedData;
  }
}

function App() {
  const [sortKey, setSortKey] = useState("Identifier");
  const [sortOrder, setSortOrder] = useState("DSC");

  const sortedData = useCallback(
    () => sortData(DUMMY_DATA, sortKey, sortOrder),
    [sortKey, sortOrder]
  );

  const changeSort = (header) => {
    setSortOrder(sortOrder === "ASC" ? "DSC" : "ASC");
    setSortKey(header);
  };

  return (
    <table border="1" cellPadding="5" align="center">
      <thead>
        <tr align="center">
          {headers.map((row) => {
            return (
              <td key={row}>
                {row}{" "}
                <button type="button" onClick={() => changeSort(row)}>
                  ▲
                </button>
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedData().map((item, index) => {
          return (
            <tr key={index} align="center">
              {Object.keys(item).map((key) => {
                return <td>{item[key]}</td>;
              })}
              {/* <td>{item[headers[0]]}</td>
              <td>{item[headers[1]]}</td>
              <td>{item[headers[2]]}</td>
              <td>{item[headers[3]]}</td>
              <td>{item[headers[4]]}</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
