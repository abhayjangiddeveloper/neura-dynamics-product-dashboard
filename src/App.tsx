import { Provider } from "react-redux";
import Router from "./router";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
