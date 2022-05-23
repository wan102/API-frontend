import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import App from "./App";
import Home from './components/home';
import Adoption from './components/adoption';
import AdoptionPage from './common/adoptionpage';
import Centres from './components/centres';
import Bookmark from './components/bookmark';
import Bookmarks from './components/bookmarks';
import Newcomer from './components/newcomer';
import Login from './components/login';
import Register from './components/register';
import UpdateAnimal from './components/updateanimal';
import NotFound from './components/notfound';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="home" element={<Home />} />
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