import { ChangeEvent, useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Questions = () => {
  const [question, setQuestion] = useState('');
  // useCreateQuestionsMutation



  return (<Paper>                                 ˚
    <TextField
      required
      id="outlined-required"
      label="Required"
      defaultValue="Hren wam"
      value={question}
      onChange={(e:ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)}
    />
    <Button variant="outlined" startIcon={<SendIcon />}>
      Delete
    </Button>
  </Paper>);
};

export default Questions;