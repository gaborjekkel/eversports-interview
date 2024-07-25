/* EXTERNALS */


import React from "react";


/* LOCALS */


import Checkbox from "./Checkbox"


/* TYPES */


interface ListItem {
  id: string,
  name: string,
}

type OnClickItem = (props: ListItem) => void;
type Selection = string[];

interface ListRowProps {
  selection: Selection,
  onClick: OnClickItem,
  item: ListItem
}

interface CheckableListProps {
  items: ListItem[],
  onClick: OnClickItem,
  selection: Selection,
}


/* HELPERS */


const ListRow = function({selection, onClick, item }: ListRowProps) {
  return (
    <div 
      className="flex items-center"
      onClick={() => onClick(item)}
    >
      <Checkbox isChecked={selection.includes(item.id)} />
      <span>{item.name}</span>
    </div>
  )
}


/* MAIN */


export default function CheckableList(props: CheckableListProps) {
  const { items } = props;
  return (
    <div>
      {items.map((item: ListItem) => <ListRow key={item.id} item={item} selection={props.selection} onClick={props.onClick}/>)}
    </div>
  )
}


