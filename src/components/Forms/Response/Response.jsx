import {useFormContext} from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close';
import { Axios } from 'axios';
import { CREATERESPONSE } from '../../Constants/ApiConstants';
import { useEffect } from 'react';

const ResponsePopup = ({setShowForm, data}) => {
    const {register, handleSubmit, reset} = useFormContext()
    useEffect(() => {
        if(data) {
            reset({
                Tag: data?.Tag,
                Link: data?.Link,
                text: data?.text
            })
        }

    }, [, data])

    const formSubmit = async(data) => {
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
          <h1>Response</h1>
  
          <label>Tag</label>
          <input
            type={'text'}
            placeholder="Tag"
            {...register('tag')}
            minLength={2}
            maxLength={255}
            required
          />

            <label>Link</label>
            <input
                type={'text'}
                placeholder="Link"
                {...register('link')}
                minLength={2}
                maxLength={255}
                required
            />
          <label>Text</label>
          <textarea
            placeholder="Text"
            {...register('text')}
            minLength={2}
            maxLength={255}
            required
          />
  
        <button type="submit">{data ? 'Update' : 'Submit'}</button>
      </form>
      </div>
    )
}

export default ResponsePopup