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
             data.products.nodes.map(function(item: ListItem) {
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


