import { QuestionType, useGetDecksQuery } from "../../services/questionsWrap/questions.servies.ts";
import { Paper } from "@mui/material";




const QuestionsList = () => {
  const { data: questions, error, isLoading } = useGetDecksQuery();

  if (isLoading) return <Paper>Loading...</Paper>;
  if (error) return <Paper>Error: {JSON.stringify(error)}</Paper>;

  console.log("questions", questions);

  return (<Paper>
      <h1>Questions list</h1>
      <ul>
        {questions.map((question: QuestionType) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </Paper>
  );
};

export default QuestionsList;





