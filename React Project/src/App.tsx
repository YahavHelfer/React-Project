import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import SignIn from "./Pages/SignIn/SignIn";
import Profile from "./Pages/Profile/Profile";
import RouteGuard from "./Components/Shared/RouteGuard";
import { useSelector } from "react-redux";
import { TRootState } from "./Store/BigPie";
import CardDetails from "./Pages/CardDetails/CardDetails";
import Favorites from "./Pages/Favorites/Favorites";
import MyCards from "./Pages/MyCards/MyCards";
import CreateCard from "./Pages/CreateCard/CreateCard";
import SignUp from "./Pages/SignUp/SignUp";
import EditCard from "./Pages/EditCard/EditCard";
import About from "./Pages/About/About";

function App() {
  const user = useSelector((state: TRootState) => state.UserSlice.user);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex flex-col h-full overflow-auto">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/card/:id" element={<CardDetails />} />

          <Route
            path="/profile"
            element={
              <RouteGuard user={user!}>
                <Profile />
              </RouteGuard>
            }
          />
          <Route
            path="/favorites"
            element={
              <RouteGuard user={user!}>
                <Favorites />
              </RouteGuard>
            }
          />
          <Route
            path="/my-cards"
            element={
              <RouteGuard user={user!}>
                <MyCards />
              </RouteGuard>
            }
          />
          <Route
            path="/create-card"
            element={
              <RouteGuard user={user!}>
                <CreateCard />
              </RouteGuard>
            }
          />
          <Route
            path="/edit-card/:id"
            element={
              <RouteGuard user={user!}>
                <EditCard />
              </RouteGuard>
            }
          />
        </Routes>
      </div>

      <div className="sticky bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default App;
