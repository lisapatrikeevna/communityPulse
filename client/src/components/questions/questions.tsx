import { ChangeEvent, useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import cl from './question.module.scss'
import { useCreateQuestionsMutation } from "../../services/questionsWrap/questions.servies.ts";


// questions.tsx
const Questions = () => {
  const [question, setQuestion] = useState('');
  const [addQuestion, {isLoading, isError }] = useCreateQuestionsMutation()
  // const addNewQuestion = async () => {
  //   try {
  //     // Вызовите функцию addQuestion с переданными данными
  //     await addQuestion({ text: question });
  //     // Очистить вопрос после добавления
  //     // setQuestion('');
  //   } catch (err) {
  //     console.error(`Error while adding question: ${err}`);
  //   }
  // };
  const addNewQuestion = async () => {
    try {
      console.log('Sending question:', question); // Лог для проверки, что данные отправляются
      const response = await addQuestion({ text: question });
      console.log('Response from server:', response);
    } catch (err) {
      console.error(`Error while adding question: ${err}`);
    }
  };

  return <>
    <Paper className={cl.wrapp}>
      <p>add Questions </p>
      <Box className={cl.inputWrap}>
        <TextField
          className={cl.newQuestion}
          required
          id="outlined-required"
          label="Required"
          value={question}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)}
        />
        <Button className={cl.addQuestion} variant="outlined" startIcon={<SendIcon/>} disabled={isLoading} onClick={addNewQuestion}>
          Send
        </Button>
      </Box>
      {isError && <p className={cl.error}>An error occurred while sending the question.</p>}
    </Paper>
  </>
};

export default Questions;















