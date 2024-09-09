import { Provider } from "react-redux";
import { store } from "./services/store.ts";
import Questions from "./components/questions/questions.tsx";
import Category from "./components/category/category.tsx";
import CategoryList from "./components/category/categoryList.tsx";
// import QuestionsList from "./components/questionsList.tsx";

// app.tsx
const App = () => {

  return (<Provider store={store}>
    <p>App port: 5173,  // Убедитесь, что этот порт свободен</p>
    <CategoryList/>
    <Category/>
    <Questions/>
    {/*<QuestionsList/>*/}
  </Provider>   )
}

export default App






