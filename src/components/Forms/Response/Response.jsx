import { useFormContext } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import Axios from "axios";
import { CREATERESPONSE, RESPONSE } from "../../Constants/ApiConstants";
import { useEffect } from "react";
import { axiosMethod, sendPost } from "../../Api/Post";

const ResponsePopup = ({ setShowForm, data, refetch }) => {
  const { register, handleSubmit, reset } = useFormContext();
  const token = localStorage.getItem("token");
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  useEffect(() => {
    if (data) {
      reset({
        tag: data?.tag,
        link: data?.link,
        text: data?.text,
      });
    }
  }, [, data]);

  const formSubmit = async (d) => {
    let sucess;
    if (data) {
      sucess = await axiosMethod({
        url: `${RESPONSE}/${data?.id}`,
        data: d,
        method: "patch",
        purpose: "Response updated successfully",
      });
    } else {
      sucess = await axiosMethod({
        url: CREATERESPONSE,
        data: d,
        method: "post",
        purpose: "Response created successfulyy",
      });
    }
    if (sucess) {
      refetch();
      setShowForm(false);
    }
  };
  return (
    <div className="popup">
      <form className="form" onSubmit={handleSubmit(formSubmit)}>
        <div className="close" onClick={() => setShowForm(false)}>
          <CloseIcon />
        </div>
        <h1>Response</h1>

        <label>Tag</label>
        <input
          type={"text"}
          placeholder="Tag"
          {...register("tag")}
          minLength={2}
          maxLength={255}
          required
        />

        <label>Link</label>
        <input
          type={"text"}
          placeholder="Link"
          {...register("link")}
          minLength={5}
          maxLength={255}
        />
        <label>Text</label>
        <textarea
          placeholder="Text"
          {...register("text")}
          minLength={5}
          maxLength={255}
          required
        />

        <button type="submit">{data ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default ResponsePopup;
