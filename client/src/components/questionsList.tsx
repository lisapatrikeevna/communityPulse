import { useGetQuestionsQuery } from "../services/questions-api.ts";


interface Question {
  id: number; // или string, в зависимости от вашего API
  text: string;
}

const QuestionsList = () => {
  const { data: questions, error, isLoading } = useGetQuestionsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  // if (error) return <div>Error loading questions: {error.message}</div>;

  return (<div>
      <h1>Questions</h1>
      <ul>
        {questions?.map((question: Question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;





