import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
const InfinitiScroll = () => {
     const getTodos = async ({pageParam =1}) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`);
       return   response?.json()
    }
 const {data:todos,fetchNextPage,isFetchingNextPage,hasNextPage} = useInfiniteQuery({
    queryKey:'todos',
    queryFn:getTodos,
    initialPageParam: 1,
    getNextPageParam : (lastPage,allPages) => {
        const nextPage = lastPage?.length ? allPages?.length + 1 : undefined
        return nextPage
    },
 })
    return(
        <div className="infiniti_scroll">
            {todos?.pages?.map(todos => (
               <>
               {todos?.map(item => (
                 <div key={item?.id} className="todo_item">
                 <span>{item?.id}</span>
                 <span>-</span>
                 <span>{item?.title}</span>
             </div>
               ))}
               </>
            ))}
            {/* <button disabled={!hasNextPage}  onClick={fetchNextPage}>{isFetchingNextPage ? 'loading more ...' : 'more'}</button> */}
        </div>
    )
}
export default InfinitiScroll