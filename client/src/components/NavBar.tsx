import { Avatar, Dropdown, Navbar } from "flowbite-react";
import type { User } from "@/lib/types";
import { NavBarTheme } from "@/lib/themes";

interface Props {
  currentRoute: "equipo" | "estudiantes" | "profesores";
}

const Header: React.FC<Props> = ({ currentRoute }) => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData as string) as User;
  const showRegister = user.userType == "assistant";

  function handleLogout() {
    console.log("Logging out...");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <Navbar fluid rounded className="bg-slate-50" theme={NavBarTheme}>
      <Navbar.Brand>
        <img
          src="/favicon copy.svg"
          className="h-20 mr-2"
          alt="Flowbite React Logo"
        />
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white ">
          GuíaTEC
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={user.photo} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block text-sm font-medium truncate">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item
            className={showRegister ? "grid" : "hidden"}
            href="/register"
          >
            Registrar profesor
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Salir</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/team" active={currentRoute === "equipo"}>
          Equipo
        </Navbar.Link>
        <Navbar.Link href="/students" active={currentRoute === "estudiantes"}>
          Estudiantes
        </Navbar.Link>
        <Navbar.Link href="/teachers" active={currentRoute === "profesores"}>
          Profesores
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
