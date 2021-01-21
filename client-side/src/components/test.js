/*import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [x, setX] = useState('');
  const [texthere, setTexthere] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (texthere === '') {
      setX('required');
      setError('error');
    } else {
      setX('done');
    }
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <div>
        <TextField
          error={texthere === '' ? error : null}
          helperText={x}
          required={true}
          isRequired="true"
          id="standard-required"
          label="Required"
          value={texthere}
          onChange={(e) => {
            setTexthere(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
*/
