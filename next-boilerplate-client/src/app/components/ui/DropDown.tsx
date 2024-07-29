/* EXTERNALS */


import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';


/* LOCALS */


import SelectableList, { SelectableListFooterActions, ListItem, Selection } from './SelectableList';
import { ErrorMessage, LoadingMessage } from "./StateMessages";


/* TYPE */


type DataTransformer = ({}:any) => ListItem[];

interface QueryProps {
  query: string, 
  queryVariables?: {},
}

interface DropDownProps extends SelectableListFooterActions, QueryProps {
  dataTransformer: DataTransformer,
  currentSelection: Selection,
  text: string,
}

interface RenderContentProps extends SelectableListFooterActions, QueryProps {
  dataTransformer: DataTransformer,
  currentSelection: Selection,
  closeList: () => void,
}


/* HELPERS */


const RenderContent = function(props: RenderContentProps) {
  const {
    closeList,
    currentSelection,
    dataTransformer,
    query,
    queryVariables,
    updateCurrentSelection,
  } = props;

  const { loading, error, data } = useQuery(gql(query), {
    variables: queryVariables,
  });

  const list = React.useRef<HTMLInputElement>(null);

  function handleOnClick(event: MouseEvent) {
    if ( list.current && !event.composedPath().includes(list.current) ) {
      closeList()
    }
  }

  function handleEsc(event: KeyboardEvent) {
    if ( event.key === 'Escape' || event.code === 'Escape' ) {
      closeList()
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

  let Renderer;

  if(error) {
    Renderer = <ErrorMessage />
  } else if(loading) {
    Renderer = <LoadingMessage />;
  } else if(!error && !loading && data) {
    Renderer = <SelectableList 
      list={dataTransformer(data)}
      updateCurrentSelection={updateCurrentSelection}
      currentSelection={currentSelection}
      closeList={closeList}
    />
  } else {
    // fallback for any unknown issue
    Renderer = <ErrorMessage />
  }

  // there might be something better for handling outside click, but I tried to keep my code flexible instead of turning a huge package up side down to match style and functional expectations
  return (
    <div ref={list} className="absolute bg-white top-[calc(100%+10px)] w-[100%] shadow-m rounded-[10px] z-50">
      {Renderer}
    </div>
  )
}

/* MAIN */


export default function DropDown(props: DropDownProps) {
  const { text, ...rest } = props;
  const [ isOpen, setIsOpen ] = useState(false);
  
  const selectStyle = isOpen ? "border-green700 text-green700 bg-blue100" : "border-grey200 text-grey700 bg-white"
  const iconStyle = isOpen ? "rotate-180" : "rotate-0"
  
  return (
    <div className="flex relative w-[100%]">
      <div className={`flex items-center w-[100%] px-[15px] py-[10px] rounded-[10px] border cursor-pointer transition-colors ${selectStyle}`} onClick={() => setIsOpen(!isOpen)}>
        <span className='truncate mr-[10px] transition-colors grow'>
          {text}
        </span>
        <svg className={`shrink-0 transition-colors transition-transform ${iconStyle}`} width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.46875 10.5312L1.46875 4.53125C1.15625 4.25 1.15625 3.78125 1.46875 3.46875C1.75 3.1875 2.21875 3.1875 2.53125 3.46875L8 8.96875L13.4688 3.5C13.75 3.1875 14.2188 3.1875 14.5312 3.5C14.8125 3.78125 14.8125 4.25 14.5312 4.53125L8.5 10.5312C8.21875 10.8438 7.75 10.8438 7.46875 10.5312Z" fill="currentColor"/>
        </svg>
      </div>
      {isOpen && (
        <RenderContent {...rest} closeList={() => setIsOpen(false)} />
      )}
    </div>
  )
}


