import { QuestionType, useGetDecksQuery, useRemoveQuestionMutation, useUpdateQuestionsMutation } from "../../services/questionsWrap/questions.servies.ts";
import { IconButton, LinearProgress, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import UpdateModal from "./updateModal.tsx";



// questionsList.tsx
const QuestionsList = () => {
  const {data: questions, error, isLoading} = useGetDecksQuery();
  const [deleteQuest, {isLoading: isDeleting, isError: isDeleteError}] = useRemoveQuestionMutation()
  const [updateQuest, {isLoading: isUpdating, isError: updateErr}] = useUpdateQuestionsMutation()

  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<null|QuestionType>();
  const handleOpen = (question:QuestionType) => {
    setOpen(true)
    setCurrentQuestion(question)
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentQuestion(null);
  }
  const removeQuestion = (id: number) => {
    deleteQuest(id).then((res) => {
      console.log("res ", res);
    }).catch(err => console.log(err));
  }
  const handleUpdate = (body:QuestionType) => {
    updateQuest(body).then((res) => {
      console.log("res ", res);
    }).catch((err) => {
      err.log(err)
    })
  }


  // console.log("questions", questions);

  return (<Paper>
      <Typography variant="h2">Questions list</Typography>
      <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
        {(isLoading || isDeleting) && <LinearProgress color="secondary"/>}
        {(isLoading || isUpdating) && <LinearProgress color="success"/>}
        {isLoading && <LinearProgress color="inherit"/>}
      </Stack>
      <List>
        {questions && questions.map((question: QuestionType) => (<ListItem key={question.id}>
            <Stack direction="row" spacing={2} key={question.id}>
              <ListItemText primary={[question.text, ` (id : ${question.id})`]}/>
              <IconButton onClick={()=>handleOpen(question)}>
              {/*<IconButton onClick={() => handleUpdate(question.id)}>*/}
	 <EditIcon/>
              </IconButton>
            </Stack>
            <ListItemText primary={["category_id :", question.category_id]}/>
            <IconButton aria-label="delete" size="small" onClick={() => removeQuestion(question.id)}>
              <DeleteIcon fontSize="small"/>
            </IconButton>


          </ListItem>))}
      </List>
      {error && <Paper>Error: {JSON.stringify(error)}</Paper>}
      {updateErr && <Paper>Error: {JSON.stringify(updateErr)}</Paper>}
      {isDeleteError && <Paper>Error: {JSON.stringify(isDeleteError)}</Paper>}

    {currentQuestion && <UpdateModal open={open} handleClose={handleClose} question={currentQuestion} updateQuestion={handleUpdate} />     }
    </Paper>);
};

export default QuestionsList;





