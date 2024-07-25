/* EXTERNALS */


import { useState } from 'react';


/* LOCALS */


import CheckableList from './CheckableList';


/* TYPES */


/* MAIN */


export default function DropDown() {
  const [ isOpen, setIsOpen ] = useState(false);

  const selectStyle = isOpen ? "border-green700 text-green700 bg-blue100" : "border-grey200 text-grey700 bg-white"
  const iconStyle = isOpen ? "rotate-180" : "rotate-0"
  
  return (
    <div className="flex relative max-w-[370px] w-[100%]">
      <div className={`flex items-center w-[100%] px-[15px] py-[10px] rounded-[10px] border cursor-pointer transition-colors ${selectStyle}`} onClick={() => setIsOpen(!isOpen)}>
        <span className='truncate mr-[10px] transition-colors grow'>
          adsf
        </span>
        <svg className={`shrink-0 transition-colors transition-transform ${iconStyle}`} width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.46875 10.5312L1.46875 4.53125C1.15625 4.25 1.15625 3.78125 1.46875 3.46875C1.75 3.1875 2.21875 3.1875 2.53125 3.46875L8 8.96875L13.4688 3.5C13.75 3.1875 14.2188 3.1875 14.5312 3.5C14.8125 3.78125 14.8125 4.25 14.5312 4.53125L8.5 10.5312C8.21875 10.8438 7.75 10.8438 7.46875 10.5312Z" fill="currentColor"/>
        </svg>
      </div>
      {isOpen && (
        <CheckableList 
          selection={[]} 
          onClickItem={() => console.log('click item')}
          closeList={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

