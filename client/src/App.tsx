import { Provider } from "react-redux";
import { store } from "./services/store.ts";
import Questions from "./components/questions/questions.tsx";
import Category from "./components/category/category.tsx";
import CategoryList from "./components/category/categoryList.tsx";
import QuestionsList from "./components/questions/questionsList.tsx";
import ResponsesList from "./components/responses/responsesList.tsx";
import Response from "./components/responses/responses.tsx";
import { Typography } from "@mui/material";

// app.tsx
const App = () => {

  return (<Provider store={store}>
    <Typography>App port: 5173,  // Убедитесь, что этот порт свободен</Typography>
    <CategoryList/>
    <Category/>
    <Questions/>
    <QuestionsList/>
    <Response/>
    <ResponsesList/>
  </Provider>   )
}

export default App






