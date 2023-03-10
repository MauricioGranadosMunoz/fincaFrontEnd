import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export const PrivateNavBar = () => {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Finca Nacar
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link
          className="block py-2 pr-4 pl-3 md:p-0 bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700"
          to={"/"}
        >
          Home
        </Link>
        <Link
          className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
          to={"/agregar-cajuelas"}
        >
          Cajuelas
        </Link>
        <Link
          className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
          to={"/agregar-rebajas"}
        >
          Rebajas
        </Link>
        <Link
          className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
          to={"/configurar"}
        >
          Configurar
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
