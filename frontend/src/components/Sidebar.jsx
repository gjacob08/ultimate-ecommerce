import { Menu, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/images/logo2.jpg";
import { Fragment } from "react";
import { useGlobal } from "../Global";

import {
  NewspaperIcon,
  ChartBarIcon,
  PresentationChartBarIcon,
  CollectionIcon,
  FolderIcon,
  HomeIcon,
  SupportIcon,
  UsersIcon,
} from "@heroicons/react/outline";

const adminNavigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "dashboard", icon: PresentationChartBarIcon },
  { name: "About", href: "about", icon: NewspaperIcon },
  { name: "Products", href: "products", icon: CollectionIcon },
  { name: "Inventory", href: "inventory", icon: FolderIcon },
  { name: "Services", href: "services", icon: UsersIcon },
  { name: "Support", href: "support", icon: SupportIcon },
  { name: "Sales Logistics", href: "logistics", icon: ChartBarIcon },
];

const customerNavigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About", href: "about", icon: NewspaperIcon },
  { name: "Products", href: "products", icon: CollectionIcon },
  { name: "Services", href: "services", icon: UsersIcon },
  { name: "Support", href: "support", icon: SupportIcon },
];

let navigation = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ user }) {
  const setUserToken = useGlobal((state) => state.setUserToken);

  const logoutHandler = async (e) => {
    e.preventDefault();

    setUserToken(null);
    window.location = "/";
  };

  const userNavigation = [
    { name: "Your Profile", href: "profile" },
    { name: "Settings", href: "settings" },
    { name: "Sign out", href: logoutHandler },
  ];

  user
    ? user.role === "admin"
      ? (navigation = adminNavigation)
      : (navigation = customerNavigation)
    : (navigation = customerNavigation);

  return (
    <div className="sticky top-0 h-screen flex-1 flex flex-col min-h-0 bg-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-10 w-auto" src={Logo} alt="TechPlay" />
          <h2 className="hidden lg:flex text-white text-2xl mx-auto">
            TechPlay
          </h2>
        </div>
        <nav
          className="mt-5 flex-1 px-2 bg-gray-800 space-y-1"
          aria-label="Sidebar"
        >
          {navigation?.map((item) => (
            <NavLink
              to={item.href}
              key={item.name}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )
              }
            >
              <item.icon
                className={classNames(
                  item.current
                    ? "text-gray-300"
                    : "text-gray-400 group-hover:text-gray-300",
                  "mr-3 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden="true"
              />
              <span className="hidden lg:flex flex-1">{item.name}</span>
              {item.count ? (
                <span
                  className={classNames(
                    item.current
                      ? "bg-gray-800"
                      : "bg-gray-900 group-hover:bg-gray-800",
                    "ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full"
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Settings Section */}
      <div className="flex-shrink-0 flex bg-gray-700 p-4">
        {user ? (
          <div className="flex items-center justify-center">
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="max-w-xs flex w-full items-center text-sm rounded-full">
                  <span className="sr-only">Open user menu</span>
                  {user.photo ? (
                    <div className="w-full flex">
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={user.photo}
                        alt={user.name}
                      />
                      <div className="ml-4 mr-8">
                        <p className="text-sm font-medium text-white">
                          {user.name.firstName}
                        </p>
                        <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                          View profile
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full mr-3">
                      <p className="text-sm font-medium text-white">
                        {user.name.firstName}
                      </p>
                      <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                        View profile
                      </p>
                    </div>
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-bottom-left w-full absolute left-0 bottom-10 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <a
                      href={item.href}
                      className="flex-shrink-0 w-full group block"
                    >
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <button
                            onClick={item.href}
                            className={classNames(
                              active ? "bg-gray-100 w-full" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full"
                            )}
                          >
                            {item.name}
                          </button>
                        )}
                      </Menu.Item>
                    </a>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <Link to="login" className="mx-auto">
            <div className="text-white text-center">Log In</div>
          </Link>
        )}
      </div>
    </div>
  );
}
