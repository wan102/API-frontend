import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Home from "./routes/home";
import Adoption from "./routes/adoption";
import AdoptionPage from "./pages/adoptionpage";
import Centres from "./routes/centres";
import Bookmark from "./routes/bookmark";
import Bookmarks from "./routes/bookmarks";
import Newcomer from "./routes/newcomer";
import Login from "./routes/login";
import Register from "./routes/register";
import UpdateAnimal from "./routes/updateanimal";
import NotFound from "./routes/notfound";


const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
      <Route path="/" element={<Home />} />
        <Route path="adoption" element={<Adoption />} />
        <Route path="adoption/:animalId" element={<AdoptionPage />} />
        <Route path="centres" element={<Centres />} />
        <Route path="bookmarks" element={<Bookmarks />} >
          <Route path=":bookmarkId" element={<Bookmark />} />
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select a Dog</p>
              </main>
            }
          />
        </Route>
        <Route path="newcomer" element={<Newcomer />} />
        <Route path="update_animal/:animalId" element={<UpdateAnimal />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="*"
          element={
            <NotFound />
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);