'use client'
/* EXTERNALS */


import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from '@apollo/client';


/* LOCALS */


import DropDown from './components/ui/DropDown';
import Button from './components/ui/Button';
import { Selection } from './components/ui/SelectableList';
import { PRODUCTS_QUERY, USERS_QUERY, PURCHASES_QUERY } from "./helpers/queries";
import Separator from "./components/ui/Separator";
import PurchaseTile from "./components/ui/PurchaseTile";
import { ErrorMessage, LoadingMessage, NoSearchFoundMessage } from "./components/ui/StateMessages";


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

interface PurchasesData {
  id: string,
  product: {
    name: string,
    imageUrl: string,
  }
}

interface PurchasesGridProps {
  purchases: PurchasesData[],
}

interface RenderPurchaseGrid {
  productFilter: Selection,
  userFilter: Selection,
}


/* HELPERS */


const dropDownWrapper = 'flex grow mr-[20px] max-w-[370px] max-md:mr-[0px] max-md:mb-[10px] max-md:max-w-[100%]';
const PAGINATION_STEP = 10;

const PurchasesGrid = function({ purchases }: PurchasesGridProps) {
  return (
    <div className="flex flex-wrap gap-[30px]">
      {purchases.map((i:PurchasesData) => <PurchaseTile key={i.id} imageUrl={i.product.imageUrl} name={i.product.name} />)}
    </div>
  )
};

const RenderPurchasesGrid = function({ productFilter, userFilter }: RenderPurchaseGrid) {
  const [purchaseAmount, setPurchaseAmount] = useState(PAGINATION_STEP)

  const { loading, error, data, previousData } = useQuery(gql(PURCHASES_QUERY), {
    variables: {
      first: productFilter.length > 0 || userFilter.length > 0 ? 0 : purchaseAmount,
      productIds: productFilter,
      userIds: userFilter,
    },
  });

  const wrapperDiv = useRef<HTMLInputElement>(null);
  useEffect(function() {
    if(data && wrapperDiv.current) {
      if(wrapperDiv.current.scrollHeight > wrapperDiv.current.offsetHeight) {
        wrapperDiv.current.scrollTop = wrapperDiv.current.scrollHeight
      }
    }
  }, [data])

  return (
    <div ref={wrapperDiv} className="flex flex-col grow p-[20px] overflow-y-auto">
        {error && <div className="m-auto"><ErrorMessage /></div>}
        {loading && !previousData && <div className="m-auto"><LoadingMessage /></div>}
        {loading && previousData && (
          <React.Fragment>
            <PurchasesGrid purchases={previousData.purchases.nodes} />
            <div className="m-auto"><LoadingMessage /></div>
          </React.Fragment>
        )}
        {!error && !loading && data.purchases.nodes.length > 0 &&  (
          <React.Fragment>
            <PurchasesGrid purchases={data.purchases.nodes} />
            {data.purchases.pageInfo.hasNextPage && (
              <div className="mt-[20px] mx-auto">
                <Button text={'Load more'} onClick={() => setPurchaseAmount(purchaseAmount + PAGINATION_STEP)} />
              </div>
            )}
          </React.Fragment>
        )}
        {!error && !loading && data.purchases.nodes.length === 0 &&  (
          <div className="mt-[20px] mx-auto">
            <NoSearchFoundMessage />
          </div>
        )}
      </div>
  )
}


/* MAIN */


export default function Home() {
  const [productFilter, setProductFilter] = useState<Selection>([])
  const [userFilter, setUserFilter] = useState<Selection>([])

  const productFilterNum = productFilter.length;
  const userFilterNum = userFilter.length;
  
  return (
    <div className="flex flex-col h-[100%] overflow-hidden">
      <div className="flex flex-wrap p-[20px] max-md:flex-col bg-white">
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
      <RenderPurchasesGrid productFilter={productFilter} userFilter={userFilter}/>
    </div>
  )
}
