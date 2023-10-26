import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"; // Import the icons you want to use

// A super simple expandable component.
const ExpandedComponent = ({ data }) => (
  // <pre>{JSON.stringify(data, null, 2)}</pre>
  <div className="container p-20">
    <div className="row">
      <div className="col-6">
        <button className="btn btn-primary mr-2">Edit</button>
      </div>
      <div className="col-6">
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
);

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.privilege,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => {
      if (row.phone === "") {
        return "Not Available";
      }
      return row.phone;
    },
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Status",
    cell: (row) => (
      <div className="d-flex align-items-center">
        <FontAwesomeIcon
          icon={row.status === "0" ? faTimes : faCheck}
          className={row.status === "0" ? "text-danger" : "text-success"}
        />
        <p
          className={`mb-0 ml-2 ${
            row.status === "0" ? "text-danger" : "text-success"
          }`}
        >
          {row.status === "0" ? "Not Assigned" : "Assigned"}
        </p>
      </div>
    ),
    sortable: (row) => row.status,
  },
];

const Tables = () => {
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Define the URL of your API endpoint (api.php)
    const apiUrl = "http://localhost/booksembassy/link/connect.php";

    // Make a GET request to the API endpoint
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Data contains the JSON response from the API
        setDatas(data);
        console.log(data);
      })
      .catch((error) => {
        const errorMessage =
          "An error occurred while processing your request. Please try again later or contact support if the issue persists.";

        setError(errorMessage);
      });
  }, []);

  if (error) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (datas.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={datas}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      highlightOnHover={true}
      pointerOnHover={true}
      pagination
      paginationPerPage={15}
    />
  );
};

export default Tables;
