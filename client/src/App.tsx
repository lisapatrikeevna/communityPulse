import { Provider } from "react-redux";
import { store } from "./services/store.ts";
import Questions from "./components/questions.tsx";
// import QuestionsList from "./components/questionsList.tsx";

// app.tsx
const App = () => {

  return (<Provider store={store}>
    <p>App port: 5173,  // Убедитесь, что этот порт свободен</p>
    <Questions/>
    {/*<QuestionsList/>*/}
  </Provider>   )
}

export default App






