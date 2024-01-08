import { useFormContext } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { axiosMethod } from "../../Api/Post";
import { CREATEINTENT, INTENT } from "../../Constants/ApiConstants";
import Axios from "../../../axios-url";

const IntentPopup = ({ setShowForm, data, refetch }) => {
  const { register, handleSubmit, reset } = useFormContext();
  const token = localStorage.getItem("token_lucy");
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    if (data) {
      reset({
        title: data?.title,
        intent_no: data?.intent_no
      });
    }
  }, [, data]);

  const formSubmit = async (d) => {
    if (data) {
      await axiosMethod({
        url: `${INTENT}/${data?.title}`,
        data: d,
        method: "patch",
        purpose: "Intent updated successfully",
      }).finally(() => {
        refetch();
        setShowForm(false);
      });
    } else {
      await axiosMethod({
        url: CREATEINTENT,
        data: d,
        method: "post",
        purpose: "Intent created successfully",
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
        <h1>INTENT</h1>
        
        <label>Title</label>
        <textarea
          placeholder="Title"
          {...register("title")}
          minLength={3}
          maxLength={255}
          required
        />
        <label>Intent No.</label>
        <input
          placeholder="Intent Number"
          {...register("intent_no")}
          type="number"
          required
        />

        <button type="submit">{data ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default IntentPopup;
