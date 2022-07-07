import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  BriefcaseIcon,
  ChatIcon,
  CogIcon,
  DocumentSearchIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import Axios from "axios";
import { useGlobal } from "../../Global";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "Jobs", href: "#", icon: BriefcaseIcon, current: false },
  { name: "Applications", href: "#", icon: DocumentSearchIcon, current: false },
  { name: "Messages", href: "#", icon: ChatIcon, current: false },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: true },
];
const secondaryNavigation = [
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Logout", href: "#", icon: CogIcon },
];
const tabs = [
  { name: "General", href: "#", current: true },
  { name: "Password", href: "#", current: false },
  { name: "Notifications", href: "#", current: false },
  { name: "Plan", href: "#", current: false },
  { name: "Billing", href: "#", current: false },
  { name: "Team Members", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [updateName, setUpdateName] = useState(false);

  const userToken = useGlobal((state) => state.userToken);
  const [buttons, setButtons] = useState([
    { name: "firstName", status: false },
    { name: "lastName", status: false },
    { name: "email", status: false },
    { name: "photo", status: false },
    { name: "role", status: false },
  ]);
  const [fields, setFields] = useState([
    { name: "firstName", input: "" },
    { name: "lastName", input: "" },
    { name: "email", input: "" },
    { name: "photo", input: "" },
    { name: "role", input: "" },
  ]);

  // Checks if the buttons was clicked
  const handleButtons = (name, status) => {
    setButtons((prevButtons) =>
      prevButtons?.map((button) => {
        return button.name === name
          ? { ...button, status: status }
          : { ...button };
      })
    );
  };
  // Handles inputs from the user
  const handleInputs = (name, e) => {
    setFields((prevFields) =>
      prevFields?.map((field) => {
        return field.name === name
          ? { ...field, input: e.target.value }
          : { ...field };
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let index = 0; index < buttons.length; index++) {
      handleButtons(buttons[index].name, false);
    }
    Axios.post("http://localhost:5000/api/users/profile/" + user?._id, {
      // To verify the token in the protect, of UserRoutes
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      // This is the req.body.data
      data: {
        name: {
          firstName: fields[0].input,
          lastName: fields[1].input,
        },
        email: fields[2].input,
        photo: fields[3].input,
        role: fields[4].input,
      },
      withCredentials: true,
    })
      .then((resObject) => {
        console.log(resObject);
        window.location = "/settings";
        // ? {
        //     _id: user._id,
        //     firstName: user.name.firstName,
        //     lastName: user.name.lastName,
        //     email: user.email,
        //     role: user.role,
        //   }
        // : user;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [buttons]);

  console.log(fields);
  // const [user, setUser] = useState(null);
  // const userToken = useGlobal((state) => state.userToken);

  // // Updates the user information using Session and Cookie.
  // useEffect(() => {
  //   const updateUser = () => {
  //     Axios.put("http://localhost:5000/api/users/login/success", {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //       withCredentials: true,
  //     })
  //       .then((resObject) => {
  //         updateUser(resObject.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   updateUser();
  // }, [userToken]);

  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-gray-600"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 px-4 flex items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
                      alt="Easywire"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="h-full flex flex-col">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-purple-50 border-purple-600 text-purple-600"
                                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group border-l-4 py-2 px-3 flex items-center text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-purple-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-auto pt-10 space-y-1">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group border-l-4 border-transparent py-2 px-3 flex items-center text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Content area */}
        <div className="md:pl-16">
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                      Settings
                    </h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      {/* Tabs */}
                      <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                          defaultValue={tabs.find((tab) => tab.current).name}
                        >
                          {tabs?.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs?.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                  tab.current
                                    ? "border-purple-500 text-purple-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Description list with inline editing */}

                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Profile
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-500">
                            This information will be displayed publicly so be
                            careful what you share.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                              <dt className="text-sm font-medium text-gray-500">
                                First Name
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {buttons[0].status ? (
                                  <span className="flex-grow">
                                    <input
                                      defaultValue={fields[1].input}
                                      onChange={(i) =>
                                        handleInputs("firstName", i)
                                      }
                                      className="w-1/4 rounded-md shadow-lg border-2"
                                      placeholder={user?.name.firstName}
                                    />
                                  </span>
                                ) : (
                                  <span className="flex-grow">
                                    {user?.name.firstName}
                                  </span>
                                )}

                                {buttons[0].status ? (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={handleSubmit}
                                  >
                                    Update
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={() => {
                                      handleButtons(
                                        "firstName",
                                        !buttons[0].status
                                      );
                                    }}
                                  >
                                    Update
                                  </button>
                                )}
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                              <dt className="text-sm font-medium text-gray-500">
                                Last Name
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {buttons[1].status ? (
                                  <span className="flex-grow">
                                    <input
                                      defaultValue={fields[1].input}
                                      onChange={(i) =>
                                        handleInputs("lastName", i)
                                      }
                                      className="w-1/4 rounded-md shadow-lg border-2"
                                      placeholder={user?.name.lastName}
                                    />
                                  </span>
                                ) : (
                                  <span className="flex-grow">
                                    {user?.name.lastName}
                                  </span>
                                )}

                                {buttons[1].status ? (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={handleSubmit}
                                  >
                                    Update
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={() => {
                                      handleButtons(
                                        "lastName",
                                        !buttons[1].status
                                      );
                                    }}
                                  >
                                    Update
                                  </button>
                                )}
                              </dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Photo
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {buttons[3].status ? (
                                  <span className="flex-grow">
                                    <input
                                      defaultValue={fields[3].input}
                                      onChange={(i) => handleInputs("photo", i)}
                                      className="w-1/4 rounded-md shadow-lg border-2"
                                    />
                                  </span>
                                ) : (
                                  <span className="flex-grow">
                                    <img
                                      className="h-8 w-8 rounded-full"
                                      src={user?.photo}
                                      alt=""
                                    />
                                  </span>
                                )}
                                {buttons[3].status ? (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={handleSubmit}
                                  >
                                    {" "}
                                    Update{" "}
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={() => {
                                      handleButtons(
                                        "photo",
                                        !buttons[3].status
                                      );
                                    }}
                                  >
                                    Update
                                  </button>
                                )}
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                              <dt className="text-sm font-medium text-gray-500">
                                Email
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {buttons[2].status ? (
                                  <span className="flex-grow">
                                    <input
                                      defaultValue={fields[2].input}
                                      onChange={(i) => handleInputs("email", i)}
                                      className="w-1/4 rounded-md shadow-lg border-2"
                                      placeholder={user?.email}
                                    />
                                  </span>
                                ) : (
                                  <span className="flex-grow">
                                    {user?.email}
                                  </span>
                                )}

                                {buttons[2].status ? (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={handleSubmit}
                                  >
                                    Update
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={() => {
                                      handleButtons(
                                        "email",
                                        !buttons[2].status
                                      );
                                    }}
                                  >
                                    Update
                                  </button>
                                )}
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                              <dt className="text-sm font-medium text-gray-500">
                                Role
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {buttons[4].status ? (
                                  <span className="flex-grow">
                                    <input
                                      defaultValue={fields[4].input}
                                      onChange={(i) => handleInputs("role", i)}
                                      className="w-1/4 rounded-md shadow-lg border-2"
                                      placeholder={user?.role}
                                    />
                                  </span>
                                ) : (
                                  <span className="flex-grow">
                                    {user?.role}
                                  </span>
                                )}

                                {buttons[4].status ? (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={handleSubmit}
                                  >
                                    Update
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    onClick={() => {
                                      handleButtons("role", !buttons[4].status);
                                    }}
                                  >
                                    Update
                                  </button>
                                )}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
