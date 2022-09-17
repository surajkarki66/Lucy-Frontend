import {useFormContext} from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const FeedbackPopUp = ({setShowForm, data}) => {
    const {register, handleSubmit, reset} = useFormContext()
    console.log(data)
    useEffect(() => {
        if(data) {
            reset({
                name: data?.name,
                email: data?.email,
                message: data?.message
            })
        }

    }, [, data])

    const formSubmit = (data) => {
        console.log(data)
        if(data) {
            //update api
        }else{
            //create api
        }
    }
    return (
        <div className="popup">
        <form className="form" onSubmit={((handleSubmit(formSubmit)))}> 
          <div className="close" onClick={() => setShowForm(false)} ><CloseIcon /></div>
          <h1>Feedback</h1>
          <label>Person Name</label>
          <input
            type="text"
            placeholder="Write your full name"
            {...register('name')}
            minLength={2}
            maxLength={255}
            required
          />
  
          <label>Email</label>
          <input
            type="email"
            placeholder="Write your email"
            {...register('email')}
            required
          />
  
          <label>Message</label>
          <textarea
            placeholder="Write your feedback message"
            {...register('message')}
            required
          ></textarea>
  
          <button type="submit">{data ? 'Update' : 'Submit'}</button>
      </form>
      </div>
    )
}

export default FeedbackPopUp