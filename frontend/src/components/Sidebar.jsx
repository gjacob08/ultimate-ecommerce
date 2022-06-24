import { Link, NavLink } from 'react-router-dom'
import Logo from "../assets/images/logo2.jpg";

import {
  // BellIcon,
  NewspaperIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  SupportIcon,
  // MenuAlt2Icon,
  UsersIcon,
  // XIcon,
} from '@heroicons/react/outline'

const adminNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon},
  { name: 'Dashboard', href: 'dashboard', icon: HomeIcon},
  { name: 'About', href: 'about', icon: NewspaperIcon},
  { name: 'Inventory', href: 'inventory', icon: FolderIcon},
  { name: 'Services', href: 'services', icon: UsersIcon},
  { name: 'Support', href: 'support', icon: SupportIcon},
  { name: 'Sales Logistics', href: 'logistics', icon: ChartBarIcon},
]

const customerNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon},
  { name: 'About', href: 'about', icon: NewspaperIcon},
  { name: 'Products', href: 'products', icon: FolderIcon},
  { name: 'Services', href: 'services', icon: UsersIcon},
  { name: 'Support', href: 'support', icon: SupportIcon},
]

let navigation = []

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ user }) {

  ( user ? ( user.role === "admin" ? (navigation = adminNavigation) : (navigation = customerNavigation)) : (navigation = customerNavigation))
  
  return (
    <div className="sticky top-0 h-screen flex-1 flex flex-col min-h-0 bg-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-10 w-auto"
            src={ Logo }
            alt="TechPlay"
          />
        <h2 className='hidden lg:flex text-white text-2xl mx-auto'>TechPlay</h2>
        </div>
        <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <NavLink to={item.href} key={item.name}
              className={({ isActive }) => classNames(
                  isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
            >
              <item.icon className={classNames(
                  item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              <span className="hidden lg:flex flex-1">{item.name}</span>
              {item.count ? (
                <span
                  className={classNames(
                    item.current ? 'bg-gray-800' : 'bg-gray-900 group-hover:bg-gray-800',
                    'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* Profile Section */}
      <div className="flex-shrink-0 flex bg-gray-700 p-4">
        <a href="#" className="flex-shrink-0 w-full group block">
          { user ? (<div className="flex items-center">
          <div>
            { console.log(user.photo)}
            <img className="inline-block h-9 w-9 rounded-full" src={ user.photo } alt={ user.name } />
          </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{ user.name }</p>
              <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
            </div>
          </div>) : (<Link to="login"><div className='text-white text-center'>Log In</div></ Link>) }
        </a>
      </div>
    </div>
  )
}
