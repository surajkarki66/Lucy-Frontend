import { useFormContext } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

const FeedbackPopUp = ({ setShowForm, data }) => {
  const { register, reset } = useFormContext();
  useEffect(() => {
    if (data) {
      reset({
        name: data?.person_name,
        email: data?.email,
        message: data?.message,
      });
    }
  }, [, data]);

  return (
    <div className="popup">
      <form className="form">
        <div className="close" onClick={() => setShowForm(false)}>
          <CloseIcon />
        </div>
        <h1>Feedback</h1>
        <label>Person Name</label>
        <input
          type="text"
          disabled
          placeholder="Write your full name"
          {...register("name")}
          minLength={2}
          maxLength={255}
          required
        />

        <label>Email</label>
        <input
          type="email"
          disabled
          placeholder="Write your email"
          {...register("email")}
          required
        />

        <label>Message</label>
        <textarea
          disabled
          placeholder="Write your feedback message"
          {...register("message")}
          required
        ></textarea>
      </form>
    </div>
  );
};

export default FeedbackPopUp;
