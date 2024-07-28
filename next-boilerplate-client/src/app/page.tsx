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
import PurchaseTile from "./components/ui/PurchaseTile";
import { ErrorMessage, LoadingMessage } from "./components/ui/StateMessages";


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

interface PurchaseData {
  id: string,
  product: {
    name: string,
    imageUrl: string,
  }
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
      'first': 40,
      'productIds': productFilter,
      'userIds': userFilter
    },
  });
  
  return (
    <div className="flex flex-col py-[20px] h-[100%]">
      <div className="flex flex-wrap mx-[20px] mb-[20px] max-md:flex-col">
        <div className={dropDownWrapper}>
          <DropDown 
            text={productFilterNum === 0 ? 'Select Product' : `${productFilterNum} product${productFilterNum > 1 ? 's' : ''} selected`}
            updateCurrentSelection={setProductFilter}
            currentSelection={productFilter}
            query={PRODUCTS_QUERY}
            // leaving here for testing reasons
            // queryVariables={{ first: 10}}
            dataTransformer={function(data) {
                return data.products.nodes.map((item: ProductData) => ({id: item.id, text: item.name}))
            }}
          />
        </div>
        <div className={dropDownWrapper}>
          <DropDown 
            text={userFilterNum === 0 ? 'Select User' : `${userFilterNum} user${userFilterNum > 1 ? 's' : ''} selected`}
            updateCurrentSelection={setUserFilter}
            currentSelection={userFilter}
            query={USERS_QUERY}
            // leaving here for testing reasons
            // queryVariables={{ first: 10}}
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
      <div className="flex flex-wrap gap-[30px] w-[100% mt-[20px] mx-[20px]">
        {error && <div className="mx-auto"><ErrorMessage /></div>}
        {loading && <div className="mx-auto"><LoadingMessage /></div>}
        {!error && !loading && data.purchases.nodes.map((i:PurchaseData) => <PurchaseTile key={i.id} imageUrl={i.product.imageUrl} name={i.product.name} />)}
      </div>
    </div>
  );
}
