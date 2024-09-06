import { useGetQuestionsQuery } from "../services/questions-api.ts";

const QuestionsList = () => {
  const { data: questions, error, isLoading } = useGetQuestionsQuery();

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading questions</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (<div>
      <h1>Questions</h1>
      <ul>
        {questions?.map((question: any) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
