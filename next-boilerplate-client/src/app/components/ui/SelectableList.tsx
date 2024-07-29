/* EXTERNALS */


import React, { useState } from "react";
import equals from 'ramda/src/equals';


/* LOCALS */


import Checkbox from "./Checkbox"
import Separator from "./Separator"
import { NoSearchFoundMessage } from "./StateMessages";
import Button from './Button';


/* TYPES */


export interface ListItem {
  id: string,
  text: string,
}

export interface SelectableListFooterActions {
  updateCurrentSelection: React.Dispatch<React.SetStateAction<Selection>>,
}

export type Selection = string[]

interface RenderListRowProps {
  isChecked: boolean, 
  onClickRow: () => void,
  text: string
}


interface RenderListProps extends SelectableListFooterActions {
  currentSelection: Selection,
  list: ListItem[]
  closeList: () => void,
}


/* HELPERS */


const RenderListRow = function({ isChecked, onClickRow, text }: RenderListRowProps) {
  return (
    <div 
      className="flex items-center cursor-pointer px-[15px] py-[10px]"
      onClick={() => onClickRow()}
    >
      <Checkbox isChecked={isChecked} />
      <span className="truncate ml-[15px] text-size-default">{text}</span>
    </div>
  )
}



/* MAIN */


// a scroll based requesting could be a nice solution for fetching data in smaller batches
export default function({ closeList, currentSelection, list, updateCurrentSelection }: RenderListProps) {
  const [selection, setSelection] = useState<Selection>(currentSelection);
  const [searchValue, setSearchValue] = useState('');

  const filteredList = list
    .filter(function(item: ListItem) {
      return item.text.match(new RegExp(`${searchValue}`,'i'))
    })

  const hasSearchItem = filteredList.length > 0;
    
  return (
    <React.Fragment>
      <div className="flex items-center px-[15px] py-[10px]">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 6.5C11.5 4.71875 10.5312 3.09375 9 2.1875C7.4375 1.28125 5.53125 1.28125 4 2.1875C2.4375 3.09375 1.5 4.71875 1.5 6.5C1.5 8.3125 2.4375 9.9375 4 10.8438C5.53125 11.75 7.4375 11.75 9 10.8438C10.5312 9.9375 11.5 8.3125 11.5 6.5ZM10.5312 11.625C9.40625 12.5 8 13 6.5 13C2.90625 13 0 10.0938 0 6.5C0 2.9375 2.90625 0 6.5 0C10.0625 0 13 2.9375 13 6.5C13 8.03125 12.4688 9.4375 11.5938 10.5625L15.7812 14.7188C16.0625 15.0312 16.0625 15.5 15.7812 15.7812C15.4688 16.0938 15 16.0938 14.7188 15.7812L10.5312 11.625Z" fill="#434343"/>
        </svg>
        <input 
          type="search" 
          placeholder="Search" 
          value={searchValue}
          onChange={i => setSearchValue(i.target.value)}
          className="ml-[15px] grow outline-0 text-size-default"
        />
      </div>
      <Separator />
      {hasSearchItem && 
        <React.Fragment>
          {/* as there was no clear UX provided Select All can select invisible elements as it selects the entire list, an idea would be to change text if search is active and only select item after filtering*/}
          <RenderListRow
            text={'Select All'}
            isChecked={list.length === selection.length}
            onClickRow={function() {
              if (list.length === selection.length) return setSelection([])
              const allIds = list.map((item: ListItem) => item.id)
              setSelection(allIds)
            }} 
          />
          <Separator />
          <div className={`overflow-y-scroll max-h-[40vh]`}>
            {
              filteredList
              .map(function(item: ListItem) {
                const isItemSelected = selection.includes(item.id);
                return <RenderListRow
                  key={item.id}
                  text={item.text}
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
          </div>
        </React.Fragment>
      }
      {!hasSearchItem && <NoSearchFoundMessage />}
      <Separator />
      <div className="flex px-[15px] py-[10px] justify-between">
        <Button 
          text={'Cancel'}
          isPrimary={false} onClick={() => setSelection([])} 
          isDisabled={selection.length === 0}
        />
        <Button 
          text={'Apply'} 
          onClick={function() {
            closeList();
            updateCurrentSelection(selection);
          }}
          isDisabled={equals(currentSelection, selection)}
        />
      </div>  
    </React.Fragment>
  )
}