import "./Table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "react-query";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API, VERSION } from "../../Constants/ApiConstants";
import FeedbackPopup from "../../Forms/Feedback/FeedbackPopup";
import QueryPopup from "../../Forms/Query/QueryPopUp";
import ResponsePopup from "../../Forms/Response/Response";
import Spinner from "../../Loaders/Spinner";
import { axiosMethod } from "../../Api/Post";


const Tables = ({content}) => {
  const { setError } = useForm();
  const [data, setData] = useState();
  const [formData, setFormData] = useState()
  const [showForm, setShowForm] = useState(false)
  const printRef = useRef();
  
  const methods  = useForm()
  
  const token = localStorage.getItem('tokan')
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


  // userQuery to fetch the contents
  function useData() {
    return useQuery(
      `${content}`,
      async () => {
        return await axios.get(API + VERSION + `/${content.slice(0, -1).toLowerCase()}/get`, { ///Dynamic fetch on content querys
          headers: {
            "Content-Type": "application/json",
          },
        });
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

    const [labels , setLabels] = useState([]) //For table headings

    useEffect(() => {
      !showForm && setFormData()
    }, [showForm])  


  useEffect(() => {
    refetch();
    // Set the labels according to content
    if(content === 'Feedbacks') setLabels(['Name', 'Email', 'Message'])
    if(content === 'Querys') setLabels(['Text', 'Indent'])
    if(content === 'Responses') setLabels(['Text', 'Tag', 'Link'])

  }, [, content]);

  const deleteHandler = async (id) => {
      axiosMethod({url: API + VERSION + `/${content.slice(0, -1).toLowerCase()}/${id}`,  method: 'delete'}).finally(() => refetch())
  };

  const editHandler = (data) => {
    // Show popup models with default data.
    setShowForm(true)
    setFormData(data)
  }
  return (
    isLoading ? <div className="loading-spinner"><Spinner /></div> : (
      <div className="listContainer">
      <div className="listTitle">Latest {content}</div>
      <TableContainer component={Paper} className="table print" ref={printRef}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {labels.map(label => <TableCell className="tableCell">{label}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data == null ? (
              <TableRow key="Name"></TableRow>
            ) : (
              data.map((row) => {
                if (content === 'Feedbacks')
                {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">{row.person_name}</TableCell>
                      <TableCell className="tableCell">{row.email}</TableCell>
                      <TableCell className="tableCell">{row.message}</TableCell>
                      <TableCell className="tableCell">
                        <EditIcon className="icon" type="submit" onClick={() => editHandler(row)}/>
                        <DeleteIcon className="icon" type="submit" onClick={() => deleteHandler(row?.id)} />
                      </TableCell>
                    </TableRow>
                  )
                }
                if (content === 'Querys')
                {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">{row.text}</TableCell>
                      <TableCell className="tableCell">{row.indent}</TableCell>
                      <TableCell className="tableCell">
                        <EditIcon className="icon" type="submit" onClick={() => editHandler(row)}/>
                        <DeleteIcon className="icon" type="submit" onClick={() => deleteHandler(row)} />
                      </TableCell>
                    </TableRow>
                  )
                }
                if (content === 'Responses')
                {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">{row.text}</TableCell>
                      <TableCell className="tableCell">{row.tag}</TableCell>
                      <TableCell className="tableCell">{row.Link}</TableCell>
                      <TableCell className="tableCell">
                        <EditIcon className="icon" type="submit" onClick={() => editHandler(row)}/>
                        <DeleteIcon className="icon" type="submit" onClick={() => deleteHandler(row?.id)} />
                      </TableCell>
                    </TableRow>
                  )
                }
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Dynamic create button */}
      {content !== 'Feedbacks' && <div className="button-container" onClick={() => setShowForm(curr => !showForm)}>
        <button >Create {content.slice(0, -1)} </button>
      </div>}
      <FormProvider {...methods}>
        {showForm && content === 'Feedbacks' ? <FeedbackPopup setShowForm={setShowForm} data={formData} /> : showForm && content === 'Querys' ? <QueryPopup setShowForm={setShowForm} data={formData} refetch={refetch}/> : showForm && content==='Responses' ? <ResponsePopup setShowForm={setShowForm} data={formData} refetch={refetch}/>: null}
      </FormProvider>
    </div>
    )
  );
};

export default Tables;
