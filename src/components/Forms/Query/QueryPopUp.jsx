import { useFormContext } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { axiosMethod } from "../../Api/Post";
import { CREATEQUERY, QUERY } from "../../Constants/ApiConstants";
import Axios from "../../../axios-url";

const QueryPopup = ({ setShowForm, data, refetch }) => {
  const { register, handleSubmit, reset } = useFormContext();
  const token = localStorage.getItem("token");
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    if (data) {
      reset({
        text: data?.text,
        intent: data?.intent,
      });
    }
  }, [, data]);

  const formSubmit = async (d) => {
    if (data) {
      await axiosMethod({
        url: `${QUERY}/${data?.id}`,
        data: d,
        method: "patch",
        purpose: "Query updated successfully",
      }).finally(() => {
        refetch();
        setShowForm(false);
      });
    } else {
      await axiosMethod({
        url: CREATEQUERY,
        data: d,
        method: "post",
        purpose: "Query created successfully",
      }).finally(() => {
        refetch();
        setShowForm(false);
      });
    }
  };
  return (
    <div className="popup">
      <form className="form" onSubmit={handleSubmit(formSubmit)}>
        <div className="close" onClick={() => setShowForm(false)}>
          <CloseIcon />
        </div>
        <h1>Query</h1>
        <label>Text</label>
        <textarea
          placeholder="Text"
          {...register("text")}
          minLength={5}
          maxLength={255}
          required
        />

        <label>Intent</label>
        <textarea
          placeholder="Intent"
          {...register("intent")}
          minLength={3}
          maxLength={255}
          required
        />

        <button type="submit">{data ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default QueryPopup;
