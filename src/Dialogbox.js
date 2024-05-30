import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import "../src/App.css";
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className='btn-Added' onClick={handleClickOpen}>Add todos</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div  style={{display:"flex",justifyContent:"space-between"}}>
            <h1 style={{fontFamily:"serif"}}>Add your Todos</h1>
            <div>
              <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div>
          </div>
          <DialogContentText id="alert-dialog-description">
            <input type="text" placeholder="Enter todo here" id="todoInput" className="todo-Input"></input>
            <button className="add-Todo-Button" onClick={() => props.addFunction()} >Add ToDo</button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}