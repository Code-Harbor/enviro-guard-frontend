import Router from "./route/Index";
import { ToastContainer } from "react-toastify";

import ThemeProvider from "./layout/provider/Theme";

const App = () => {
  return (
    <ThemeProvider>
      <Router />
      <ToastContainer limit={1} />
    </ThemeProvider>
  );
};
export default App;