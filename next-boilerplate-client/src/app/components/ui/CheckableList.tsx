/* EXTERNALS */


import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from '@apollo/client';


/* LOCALS */


import Checkbox from "./Checkbox"
import { ErrorMessage, LoadingMessage } from "./StateMessages";
import { PRODUCTS_QUERY } from "../../helpers/queries";


/* TYPES */


interface ListItem {
  id: string,
  name: string,
}

type Selection = string[]

interface RenderListRowProps {
  isChecked: boolean, 
  onClickRow: () => void,
  text: string
}

interface CheckableListProps {
  closeList: () => void,
}


/* HELPERS */


const RenderListRow = function({isChecked, onClickRow, text }: RenderListRowProps) {
  return (
    <div 
      className="flex items-center cursor-pointer"
      onClick={() => onClickRow()}
    >
      <Checkbox isChecked={isChecked} />
      <span>{text}</span>
    </div>
  )
}


/* MAIN */



// a scroll based requesting could be a nice solution for fetching data in smaller batches
// there might be something better for handling outside click, but I tried to keep my code flexible instead of turning a huge package up side down to match style and functional expectations
export default function CheckableList(props: CheckableListProps) {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
    variables: { first: 40, },
  });

  const [selection, setSelection] = useState<Selection>([]);
  const [searchValue, setSearchValue] = useState('');

  const list = React.useRef<HTMLInputElement>(null);

  function handleOnClick(event: MouseEvent) {
    if ( list.current && !event.composedPath().includes(list.current) ) {
      props.closeList()
    }
  }

  function handleEsc(event: KeyboardEvent) {
    if ( event.key === 'Escape' || event.code === 'Escape' ) {
      props.closeList()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOnClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleOnClick);
      document.removeEventListener('keydown', handleEsc);
    }
  }, [])
  
  // search no found
  return (
    <div ref={list} className="absolute bg-white top-[105%] w-[100%] shadow-m rounded-[10px]">
      {error && <ErrorMessage />}
      {loading && <LoadingMessage />}
      {!error && !loading && data.products.nodes && 
       (
        <React.Fragment>
          <div className="flex items-center">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 6.5C11.5 4.71875 10.5312 3.09375 9 2.1875C7.4375 1.28125 5.53125 1.28125 4 2.1875C2.4375 3.09375 1.5 4.71875 1.5 6.5C1.5 8.3125 2.4375 9.9375 4 10.8438C5.53125 11.75 7.4375 11.75 9 10.8438C10.5312 9.9375 11.5 8.3125 11.5 6.5ZM10.5312 11.625C9.40625 12.5 8 13 6.5 13C2.90625 13 0 10.0938 0 6.5C0 2.9375 2.90625 0 6.5 0C10.0625 0 13 2.9375 13 6.5C13 8.03125 12.4688 9.4375 11.5938 10.5625L15.7812 14.7188C16.0625 15.0312 16.0625 15.5 15.7812 15.7812C15.4688 16.0938 15 16.0938 14.7188 15.7812L10.5312 11.625Z" fill="#434343"/>
            </svg>
            <input 
              type="search" 
              placeholder="Search" 
              value={searchValue}
              onChange={i => setSearchValue(i.target.value)}
            />
          </div>
          {/* as there was no clear UX provided Select All can select invisible elements as it selects the entire list, an idea would be to change text if search is active and only select item after filtering*/}
          <RenderListRow
            text={'Select All'}
            isChecked={data.products.nodes.length === selection.length}
            onClickRow={function() {
              if (data.products.nodes.length === selection.length) return setSelection([])
              const allIds = data.products.nodes.map((item: ListItem) => item.id)
              setSelection(allIds)
            }} 
          />
          {
             data.products.nodes
              .filter(function(item: ListItem) {
                return item.name.match(new RegExp(`${searchValue}`,'i'))
              })
              .map(function(item: ListItem) {
                // no search item found
                const isItemSelected = selection.includes(item.id);
                return <RenderListRow
                  key={item.id}
                  text={item.name}
                  isChecked={isItemSelected}
                  onClickRow={function() {
                    if(isItemSelected) {
                      const newSelection = selection.filter(id => id !== item.id)
                      setSelection(newSelection)
                      return
                    };
                    setSelection([...selection, item.id])
                  }}
                />
            })
          }
        </React.Fragment>
       )
      }
    </div>
  )
}


