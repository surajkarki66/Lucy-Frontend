import "./Table.css";
import GetAppIcon from "@mui/icons-material/GetApp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "react-query";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Axios from "../../../axios-url";
import FeedbackPopup from "../../Forms/Feedback/FeedbackPopup";
import QueryPopup from "../../Forms/Query/QueryPopUp";
import ResponsePopup from "../../Forms/Response/Response";
import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import Spinner from "../../Loaders/Spinner";
import { CSVLink } from "react-csv";
import { axiosMethod } from "../../Api/Post";

const Tables = ({ content }) => {
  const { setError } = useForm();
  const [data, setData] = useState();
  const [formData, setFormData] = useState();
  const [showForm, setShowForm] = useState(false);
  const printRef = useRef();

  const methods = useForm();

  const token = localStorage.getItem("token");

  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //FORM PAGINATION HANDLER
  const [page, setPage] = React.useState(0);
  const [skip, setSkip] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const handleChangePage = (e, page) => {
    setPage(page);
    setSkip(skip + 10);
    refetch();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setSkip(0);
    refetch();
  };

  // userQuery to fetch the contents
  function useData() {
    return useQuery(
      `${content}`,
      async () => {
        return await Axios.get(
          `/${content.toLowerCase()}/get?limit=${rowsPerPage}&skip=${skip}`,
          {
            ///Dynamic fetch on content querys
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      },
      {
        enabled: false,
        onSuccess: (res) => {
          setData(res?.data);
        },
        onError: (err) => {
          if (err.response?.data) {
            setError("SubmitError", {
              type: "custom",
              message: err.response?.data?.error,
            });
          }
        },
        retry: 0,
      }
    );
  }

  const { refetch, isLoading } = useData();

  const [labels, setLabels] = useState([]); //For table headings

  useEffect(() => {
    !showForm && setFormData();
  }, [showForm]);

  useEffect(() => {
    refetch();
    // Set the labels according to content
    if (content === "Feedback") setLabels(["Name", "Email", "Message"]);
    if (content === "Query") setLabels(["Text", "Intent"]);
    if (content === "Response") setLabels(["Text", "Tag", "Link"]);
  }, [, content]);

  const deleteHandler = async (id) => {
    await axiosMethod({
      url: `/${content.toLowerCase()}/${id}`,
      method: "delete",
      purpose: "Deleted successfully",
    }).finally(() => refetch());
  };

  const editHandler = (data) => {
    setShowForm(true);
    setFormData(data);
  };

  return isLoading ? (
    <div className="loading-spinner">
      <Spinner />
    </div>
  ) : (
    <div className="listContainer">
      <div className="listTitle">Latest{content}</div>
      <TableContainer
        sx={{ maxHeight: 650 }}
        component={Paper}
        className="table print"
        ref={printRef}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {labels.map((label) => (
                <TableCell
                  className="tableCell"
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  {label}
                </TableCell>
              ))}{" "}
              {data && (
                <TableCell>
                  <CSVLink data={data} target="_blank">
                    {" "}
                    <GetAppIcon fontSize="medium" />
                  </CSVLink>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data == null ? (
              <TableRow key="Name"></TableRow>
            ) : (
              data.map((row) => {
                if (content === "Feedback") {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">
                        {row.person_name}
                      </TableCell>
                      <TableCell className="tableCell">{row.email}</TableCell>
                      <TableCell className="tableCell">{row.message}</TableCell>
                      <TableCell className="tableCell">
                        <EditIcon
                          className="icon"
                          type="submit"
                          onClick={() => editHandler(row)}
                        />
                        <DeleteIcon
                          className="icon"
                          type="submit"
                          onClick={() => deleteHandler(row?.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
                if (content === "Query") {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">{row.text}</TableCell>
                      <TableCell className="tableCell">{row.intent}</TableCell>
                      <TableCell className="tableCell">
                        <EditIcon
                          className="icon"
                          type="submit"
                          onClick={() => editHandler(row)}
                        />
                        <DeleteIcon
                          className="icon"
                          type="submit"
                          onClick={() => deleteHandler(row?.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
                if (content === "Response") {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">{row.text}</TableCell>
                      <TableCell className="tableCell">{row.tag}</TableCell>
                      <TableCell className="tableCell">{row.Link}</TableCell>
                      <TableCell className="tableCell">
                        <EditIcon
                          className="icon"
                          type="submit"
                          onClick={() => editHandler(row)}
                        />
                        <DeleteIcon
                          className="icon"
                          type="submit"
                          onClick={() => deleteHandler(row?.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Dynamic create button */}
      {content !== "Feedback" && (
        <div
          className="button-container"
          onClick={() => setShowForm((curr) => !showForm)}
        >
          <button>Create {content} </button>
        </div>
      )}
      <FormProvider {...methods}>
        {showForm && content === "Feedback" ? (
          <FeedbackPopup setShowForm={setShowForm} data={formData} />
        ) : showForm && content === "Query" ? (
          <QueryPopup
            setShowForm={setShowForm}
            data={formData}
            refetch={refetch}
          />
        ) : showForm && content === "Response" ? (
          <ResponsePopup
            setShowForm={setShowForm}
            data={formData}
            refetch={refetch}
          />
        ) : null}
      </FormProvider>
    </div>
  );
};

export default Tables;
