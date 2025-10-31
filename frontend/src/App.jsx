import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes.jsx";
import Home from "./pages/Home.jsx";
function App() {
  return (
   <BrowserRouter>
    <UserRoutes />
   </BrowserRouter>
  );
}
export default App
