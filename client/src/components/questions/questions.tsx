import { ChangeEvent, useState } from "react";
import { Button, Paper, Stack, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import cl from './question.module.scss'
import { useCreateQuestionsMutation } from "../../services/questionsWrap/questions.servies.ts";


// questions.tsx
const Questions = () => {
  const [question, setQuestion] = useState('');
  const [categoryId, setCategoryId] = useState<number|null>();
  const [addQuestion, {isLoading, isError}] = useCreateQuestionsMutation()
  const addNewQuestion = () => {
    // Вызовите функцию addQuestion с переданными данными
    typeof categoryId=='number'&& addQuestion({text: question, category_id: categoryId})
    .then((res) => {
      console.log("removeCat", res);
      // Очистить после добавления
      setQuestion('')
      setCategoryId(null)
    })
    .catch(err => {
      console.error(`Error while adding question: ${err}`);
    })
  };
  // const addNewQuestion = async () => {
  //   try {
  //     console.log('Sending question:', question, categoryId); // Лог для проверки, что данные отправляются
  //     const response = await addQuestion({ text: question, category_id:categoryId });
  //     console.log('Response from server:', response);
  //   } catch (err) {
  //     console.error(`Error while adding question: ${err}`);
  //   }
  // };

  return <>
    <Paper className={cl.wrapp} sx={{mt: 3}}>
      <p>add Questions </p>
      <Stack spacing={2} className={cl.inputWrap}>
        {/*<Box className={cl.inputWrap}>*/}
        <TextField
          className={cl.newQuestion}
          required
          id="outlined-required"
          label="Question"
          value={question}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)}
        />
        {/*</Box>*/}
        {/*<Box className={cl.inputWrap}>*/}
        <TextField
          className={cl.newQuestion}
          required
          id="outlined-required"
          label="category id"
          value={categoryId}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryId(+e.currentTarget.value)}
        />
        {/*<Button className={cl.addQuestion} variant="outlined" startIcon={<SendIcon/>} disabled={isLoading} onClick={addNewQuestion}>*/}
        {/*  Send*/}
        {/*</Button>*/}
        <Button className={cl.addQuestion} variant="outlined" startIcon={<SendIcon/>} disabled={isLoading} onClick={addNewQuestion} fullWidth={true}>
          Send
        </Button>
        {/*</Box>*/}
      </Stack>
      {isError && <p className={cl.error}>An error occurred while sending the question.</p>}
    </Paper>
  </>
};

export default Questions;















