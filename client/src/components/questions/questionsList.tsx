import { QuestionType, useGetDecksQuery, useRemoveQuestionMutation } from "../../services/questionsWrap/questions.servies.ts";
import { IconButton, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRemoveCategoryMutation } from "../../services/categoriesWrap/category.service.ts";




const QuestionsList = () => {
  const { data: questions, error, isLoading } = useGetDecksQuery();
  const [deleteQuest, {isLoading: isDeleting, isError: isDeleteError }] = useRemoveQuestionMutation()

  const removeQuestion = (id: number) => {
    deleteQuest(id).then((res) => {
      console.log("res ", res);
    }).catch(err => console.log(err));
   }
  if (isLoading) return <Paper>Loading...</Paper>;
  if (error) return <Paper>Error: {JSON.stringify(error)}</Paper>;

  console.log("questions", questions);

  return (<Paper>
      <Typography variant="h2">Questions list</Typography>
      <List>
        {questions.map((question: QuestionType) => (
          <ListItem key={question.id}>
            <ListItemText primary={question.text} />

            <IconButton aria-label="delete" size="small" onClick={() => removeQuestion(question.id)}>
              <DeleteIcon fontSize="small"/>
            </IconButton>

          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default QuestionsList;





