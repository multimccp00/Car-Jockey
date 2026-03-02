import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Homepage from "./pages/homepage";
import SearchPage from "./pages/search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
