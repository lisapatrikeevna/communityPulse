import clsx from 'clsx';
import { css, styled } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import cl from "./question.module.scss";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { QuestionType } from "../../services/questionsWrap/questions.servies.ts";

type propsType = {
  open: boolean
  handleClose: () => void
  question:QuestionType
  updateQuestion:(body:QuestionType) => void
}

const UpdateModal = ({open, handleClose, question, ...props}: propsType) => {
  const [inputValue, setInputValue] = useState(question.text);
  // useEffect(() => {setInputValue(question.text)},[])
  const handleUpdate = () => {
    props.updateQuestion({...question, text: inputValue} )
    setInputValue('')
    handleClose()
  }



  return (<Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description"
    open={open} onClose={handleClose} slots={{ backdrop: StyledBackdrop }}>
    <ModalContent sx={{width: 400}}>
      
      <h2 id="unstyled-modal-title" className="modal-title">
        Update Text Question with id {question.id} 
      </h2>
      <TextField
        className={cl.newQuestion}
        required
        id="outlined-required"
        label="change Question text"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)}
      />
      <Stack direction="row" spacing={2}>
        <IconButton onClick={handleUpdate}>
          <EditIcon/>
        </IconButton>
        <Button onClick={handleClose}>
          close
        </Button>
      </Stack>

    </ModalContent>
  </Modal>);
};

export default UpdateModal;

const Backdrop = forwardRef<HTMLDivElement, {open?: boolean; className: string}>((props, ref) => {
  const {open, className, ...other} = props;
  return (<div
      className={clsx({'base-Backdrop-open': open}, className)}
      ref={ref}
      {...other}
    />);
});

const blue = {
  200: '#99CCFF', 300: '#66B2FF', 400: '#3399FF', 500: '#007FFF', 600: '#0072E5', 700: '#0066CC',
};

const grey = {
  50: '#F3F6F9', 100: '#E5EAF2', 200: '#DAE2ED', 300: '#C7D0DD', 400: '#B0B8C4', 500: '#9DA8B7', 600: '#6B7A90', 700: '#434D5B', 800: '#303740', 900: '#1C2025',
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(({theme}) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
    }

    & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
    }
`,);





