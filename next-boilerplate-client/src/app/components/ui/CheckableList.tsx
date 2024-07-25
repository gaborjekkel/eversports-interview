/* EXTERNALS */


import React, { useRef, useEffect, useCallback } from "react";
import { useQuery } from '@apollo/client';

/* LOCALS */


import Checkbox from "./Checkbox"
import { PRODUCTS_QUERY } from "../../helpers/queries";


/* TYPES */


interface ListItem {
  id: string,
  name: string,
}

type OnClickItem = (props: ListItem) => void;
type Selection = string[];

interface RenderListRowProps {
  selection: Selection,
  onClickItem: OnClickItem,
  item: ListItem
}

interface CheckableListProps {
  onClickItem: OnClickItem,
  selection: Selection,
  closeList: () => void,
}


/* HELPERS */


const RenderListRow = function({selection, onClickItem, item }: RenderListRowProps) {
  return (
    <div 
      className="flex items-center"
      onClick={() => onClickItem(item)}
    >
      <Checkbox isChecked={selection.includes(item.id)} />
      <span>{item.name}</span>
    </div>
  )
}

// might be an own component
const RenderError = function() {
  return (
    <div>Error</div>
  )
}

// might be an own component
const RenderLoading = function() {
  return (
    <div>Loading</div>
  )
}


/* MAIN */



// a scroll based requesting could be a nice solution for fetching data in smaller batches
// there might be something better for handling outside click, but I tried to keep my code flexible instead of turning a huge package up side down to match style and functional expectations
export default function CheckableList(props: CheckableListProps) {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
    variables: { first: 10, },
  });

  const list = React.useRef<HTMLInputElement>(null);

  function handleOnClick(event: MouseEvent) {
    if ( list.current && !event.composedPath().includes(list.current) ) {
      props.closeList()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOnClick);
    return () => {
      document.removeEventListener('click', handleOnClick);
    }
  }, [])
  
  if(error) return <RenderError />
  if(loading) return <RenderLoading />


  // search no found
  
  return (
    <div ref={list}>
      {data.products.nodes.map((item: ListItem) => <RenderListRow key={item.id} item={item} selection={props.selection} onClickItem={props.onClickItem}/>)}
    </div>
  )
}


