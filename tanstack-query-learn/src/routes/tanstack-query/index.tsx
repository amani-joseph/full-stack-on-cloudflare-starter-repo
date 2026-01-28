import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tanstack-query/')({
  component: RouteComponent,
})
const getTodos = async () =>{
    await new Promise(resolve => setTimeout(resolve, 1000))
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    return response.json()
}
type TodoType ={
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean
    }
function RouteComponent() {
    const {data,isPending} = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })
  return (<div>
    {isPending  && <div>Getting your todos...</div>}
    {/* (isLoading || isPending) && <div>Loading...</div>
    (error) && <div>Error: {error?.message}</div>
    (isFetching) && <div>Fetching...</div> */}

   {data?.map((item:TodoType)=>{
    return <div key={item.id}>{item.title}</div>
   })}
  </div>)
}
