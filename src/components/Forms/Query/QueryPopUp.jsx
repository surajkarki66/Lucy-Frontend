import {useFormContext} from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { axiosMethod } from '../../Api/Post';
import { CREATEQUERY, QUERY } from '../../Constants/ApiConstants';


const QueryPopup = ({setShowForm, data, refetch}) => {
    const {register, handleSubmit, reset} = useFormContext()

        
    useEffect(() => {
        if(data) {
            reset({
                text: data?.text,
                intent: data?.intent,
            })
        }

    }, [, data])

    const formSubmit = async(d) => {
        if(data) {
            axiosMethod({url: `${QUERY}/${data?.id}`, data: d, method: 'patch'})
        }else{
            axiosMethod({url: CREATEQUERY, data: d, method: 'post'})
        }
    }
    console.log('dsf')
    return (
        <div className="popup">
        <form className="form" onSubmit={((handleSubmit(formSubmit)))}> 
          <div className="close" onClick={() => setShowForm(false)} ><CloseIcon /></div>
          <h1>Query</h1>
          <label>Text</label>
          <textarea
            placeholder="Text"
            {...register('text')}
            minLength={2}
            maxLength={255}
            required
          />
  
          <label>intent</label>
          <textarea
            placeholder="intent"
            {...register('intent')}
            minLength={2}
            maxLength={255}
            required
          />
  
        <button type="submit">{data ? 'Update' : 'Submit'}</button>
      </form>
      </div>
    )
}

export default QueryPopup