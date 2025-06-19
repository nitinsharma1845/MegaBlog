import { Container, Logo, LogoutButton } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const nevigate = useNavigate();

  const NavItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  console.log(authStatus);

  return (
    <header>
      <Container>
        <nav className="flex">
          <div className="mr-4 ">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {NavItems.map((item, index) =>
              item.active ? (
                <li className="" key={index}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full hover:text-gray-900"
                    onClick={() => nevigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && <li>{LogoutButton}</li>}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
