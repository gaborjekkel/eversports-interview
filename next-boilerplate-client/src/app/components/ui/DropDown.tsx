/* EXTERNALS */


import { useState } from 'react';




/* LOCALS */


import CheckableList from './CheckableList';



/* STYLE */



/* TYPES */


interface Props {
  text: string,
  isOpen: boolean, 
}


/* MAIN */

const Test = function() {
  return <div>test</div>
}

export default function DropDown({ text }: Props) {
  const [ isOpen, setIsOpen ] = useState(false);
  
  return (
    <div>
      <div className="flex items-center text-default" onClick={() => setIsOpen(!isOpen)}>
        what {text}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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


