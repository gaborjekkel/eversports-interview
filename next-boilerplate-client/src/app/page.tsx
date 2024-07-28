'use client'
/* EXTERNALS */


import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client';


/* LOCALS */


import DropDown from './components/ui/DropDown';
import Button from './components/ui/Button';
import { Selection } from './components/ui/SelectableList';
import { PRODUCTS_QUERY, USERS_QUERY, PURCHASES_QUERY } from "./helpers/queries";
import Separator from "./components/ui/Separator";


/* TYPES  */


interface ProductData {
  id: string,
  name: string,
}

interface UserData {
  id: string,
  firstName: string,
  lastName: string,
}


/* HELPERS */


const dropDownWrapper = 'flex grow mr-[20px] max-w-[370px] max-md:mr-[0px] max-md:mb-[10px] max-md:max-w-[100%]';


/* MAIN */


export default function Home() {
  const [productFilter, setProductFilter] = useState<Selection>([])
  const [userFilter, setUserFilter] = useState<Selection>([])

  const productFilterNum = productFilter.length;
  const userFilterNum = userFilter.length;

  const { loading, error, data } = useQuery(gql(PURCHASES_QUERY), {
    variables: {
      'first': 10,
      'productIds': productFilter,
      'userIds': userFilter
    },
  });
  
  console.log(data)

  return (
    <div className="flex flex-col py-[20px]">
      <div className="flex flex-wrap mx-[20px] mb-[20px] max-md:flex-col">
        <div className={dropDownWrapper}>
          <DropDown 
            text={productFilterNum === 0 ? 'Select Product' : `${productFilterNum} product${productFilterNum > 1 ? 's' : ''} selected`}
            updateCurrentSelection={setProductFilter}
            currentSelection={productFilter}
            query={PRODUCTS_QUERY}
            queryVariables={{ first: 14}}
            dataTransformer={function(data) {
                return data.products.nodes.map((item: ProductData) => ({id: item.id, text: item.name}))
            }}
          />
        </div>
        <div className={dropDownWrapper}>
          <DropDown 
            text={userFilterNum === 0 ? 'Select Product' : `${userFilterNum} user${userFilterNum > 1 ? 's' : ''} selected`}
            updateCurrentSelection={setUserFilter}
            currentSelection={userFilter}
            query={USERS_QUERY}
            queryVariables={{ first: 14}}
            dataTransformer={function(data) {
                return data.users.nodes.map((item: UserData) => ({id: item.id, text: `${item.firstName} ${item.lastName}`}))
            }}
          />
        </div>
        {(productFilter.length > 0 || userFilter.length > 0) && (
          <Button 
            text={'Clear filters'} 
            onClick={function() {
              setProductFilter([]) 
              setUserFilter([])
            }} 
          />
        )}
      </div>
      <Separator />
    </div>
  );
}
