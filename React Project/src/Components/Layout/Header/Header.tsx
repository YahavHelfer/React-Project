import { Navbar, TextInput, Avatar, DarkThemeToggle } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";

const Header = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = () => {
    dispatch(userActions.logout());
    nav("/");
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.searchWord(value));
  };

  return (
    <Navbar fluid className="sticky top-0 z-50 shadow-md bg-slate-800">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center text-xl font-semibold text-white whitespace-nowrap">
          Helfer B Card
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to={"/"} href="/" className="text-white">
          Home
        </Navbar.Link>

        {/* לינק לעמוד About */}
        <Navbar.Link as={Link} to={"/about"} href="/about" className="text-white">
          About
        </Navbar.Link>

        {!user && (
          <>
            <Navbar.Link as={Link} to={"/signin"} href="/signin" className="text-white">
              Sign In
            </Navbar.Link>
            <Navbar.Link as={Link} to={"/signup"} href="/signup" className="text-white">
              Sign Up
            </Navbar.Link>
          </>
        )}

        {user && (
          <>
            <Navbar.Link className="text-white cursor-pointer" onClick={logout}>
              Sign Out
            </Navbar.Link>
            <Navbar.Link as={Link} to={"/profile"} href="/profile" className="text-white">
              Profile
            </Navbar.Link>
            <Navbar.Link as={Link} to={"/favorites"} href="/favorites" className="text-white">
              Favorites
            </Navbar.Link>
            {user.isBusiness && (
              <Navbar.Link as={Link} to={"/my-cards"} href="/my-cards" className="text-white">
                My Cards
              </Navbar.Link>
            )}
          </>
        )}
      </Navbar.Collapse>

      <div className="flex items-center gap-4">
        <TextInput rightIcon={CiSearch} onChange={search} />

        {user && (
          <div className="flex items-center gap-2">
            <Avatar img={user.image.url} alt="User avatar" rounded />
            <span className="text-white">{user.name.first}</span>
          </div>
        )}
      </div>
      <DarkThemeToggle className="gap-3 max-md:flex max-md:flex-col max-md:items-center " />
    </Navbar>
  );
};

export default Header;
