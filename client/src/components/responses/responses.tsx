import { ChangeEvent, useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import cl from './responses.module.scss'
import { useCreateResponseMutation } from "../../services/responseWrap/response.service.ts";


// questions.tsx
const Response = () => {
  const [response, setResponse] = useState('');
  const [questionId, setQuestionId] = useState<number|null>(null);
  const [isAgree, setIsAgree] = useState<string>('');
  const [isAgreeErr, setIsAgreeErr] = useState<string>('');
  const [addResponse, {isLoading, isError}] = useCreateResponseMutation()
  const addNewQuestion = () => {
    if (isAgree.toLowerCase() !== 'yes' && isAgree.toLowerCase() !== 'no') {
      setIsAgreeErr('Пожалуйста, введите "yes" или "no"');
      return;
    }

    // Преобразуем строку в булево значение
    const agree = isAgree.toLowerCase() === 'yes';
    console.log(agree);

    typeof questionId==='number'&& addResponse({text: response, question_id: questionId,is_agree:agree})
    .then((res) => {
      console.log("removeCat", res);
      if (!isError){
      // Очистить после добавления
        setQuestionId(null);
        setIsAgree('');
        setResponse('');
        setIsAgreeErr('');
      console.log("Category ID after reset: ", questionId,isAgree);
      }
    })
    .catch(err => {
      console.error(`Error while adding Response: ${err}`);
    })
  };
  // const isAgryHandler()
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
      <Typography variant='h4'>add Response </Typography>
      <Stack spacing={2} className={cl.inputWrap}>
        <TextField
          className={cl.newQuestion}
          required
          id="outlined-required"
          label="Response text"
          value={response}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setResponse(e.currentTarget.value)}
        />
        <TextField
          className={cl.newQuestion}
          required
          id="outlined-required"
          label="Question id"
          value={questionId? questionId:''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestionId(+e.currentTarget.value)}
        />
        <TextField
          className={cl.newQuestion}
          required
          id="outlined-required"
          label="is agry : Yes or No"
          // value={isAgree ? "Yes" : "No"}
          value={isAgree}
          type='text'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAgree(e.currentTarget.value)}
        />
        {isAgreeErr && <Typography className={cl.error}>{isAgreeErr}</Typography>}
        <Button className={cl.addQuestion} variant="outlined" startIcon={<SendIcon/>} disabled={isLoading} onClick={addNewQuestion} fullWidth={true}>
          Send
        </Button>
      </Stack>
      {isError && <Typography className={cl.error}>An error occurred while sending the question.</Typography>}
    </Paper>
  </>
};

export default Response;















