import { SearchIcon } from '@heroicons/react/solid'
import { useGlobal } from '../Global'

import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  NewspaperIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  SupportIcon,
  MenuAlt2Icon,
  ShoppingCartIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'

<h2 className='text-white text-2xl mx-auto'>TechPlays</h2>

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'About', href: '#', icon: NewspaperIcon, current: false },
  { name: 'Inventory', href: '/products', icon: FolderIcon, current: false },
  { name: 'Services', href: '#', icon: UsersIcon, current: false },
  { name: 'Support', href: '#', icon: SupportIcon, current: false },
  { name: 'Sales Logistics', href: '#', icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TopBar() {
  const toggleCart = useGlobal((state) => state.toggleCart)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            onClick={ toggleCart }
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}