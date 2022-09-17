import {useFormContext} from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const QueryPopup = ({setShowForm, data}) => {
    const {register, handleSubmit, reset} = useFormContext()

        
    useEffect(() => {
        if(data) {
            reset({
                text: data?.text,
                indent: data?.indent,
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
  
          <label>Indent</label>
          <textarea
            placeholder="Indent"
            {...register('indent')}
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