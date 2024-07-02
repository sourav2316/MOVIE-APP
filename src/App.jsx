import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/Home/HomePage";
import MovieDetail from "./pages/Detail/MovieDetail";
import MovieList from "./components/MovieList";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="/movies/:type" element={<MovieList />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
