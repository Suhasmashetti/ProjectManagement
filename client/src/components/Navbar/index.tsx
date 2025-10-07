import React from 'react'
import { Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import Link from "next/link"
import { useAppDispatch, useAppSelector } from '../../app/redux'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/src/state'

const Navbar = () => {
  const dispatch = useAppDispatch();
   const isSidebarCollapsed = useAppSelector(
      (state) => state.global.isSidebarCollapsed,
    );
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'>
      {/* Searchbar */}
      <div className='flex items-center gap-8'>
        {!isSidebarCollapsed ? null : ( 
          <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
            <Menu className='h-8 w-8 dark:text-white' />
          </button>
        )}
        <div className='relative flex min-w-[200px]'>
          <Search 
            className='absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-gray-500 dark:text-white' 
          />
          <input 
            className='w-full rounded bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-300' 
            type='search'
            placeholder='Search..'
          />
        </div>
      </div>

      {/* Icons */}
      <div className='flex items-center'>
        <button onClick = {() => dispatch(setIsDarkMode(!isDarkMode))}
          className={ isDarkMode ? `rounded p-2 dark:hover:bg-gray-700`: `rounded p-2 hover:bg-gray-100`}
          >
            {isDarkMode
            ? (<Sun className='h-6 w-6 cursor-pointer dark:text-white' />) : (
              <Moon className='h-6 w-6 cursor-pointer dark:text-white' />
            )
          }
          </button>
        <Link href='/settings' 
        className={ 
          isDarkMode 
          ? 'h-min w-min rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
          : 'h-min w-min rounded p-2 hover:bg:gray-100'}
          >
          <Settings className='h-5 w-6 cursor-pointer text-gray-600 dark:text-white' />
        </Link>
        <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 dark:bg-gray-600 md:inline-block' />
      </div>
    </div>
  )
}

export default Navbar
