import { Provider } from "react-redux";
import { store } from "./services/store.ts";
import Questions from "./components/questions.tsx";
import QuestionsList from "./components/questionsList.tsx";

const App = () => {
  return    <Provider store={store}>
    <p>text</p>
    <Questions/>
    <QuestionsList />
  </Provider>
}

export default App
