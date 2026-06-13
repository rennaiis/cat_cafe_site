import type { Status } from "../types";

const URL = "http://localhost:3000/statuses"

export async function getStatuses() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get statuses`)
   return res.json()
}

export async function createStatus(status: Omit<Status, 'id'>){
    const res = await fetch(URL, {
        credentials: 'include',
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(status)
    })
    return res.json()
}

export async function updateStatus(rule:Omit<Status, 'id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(rule)
    })
    return res.json()
}

export async function removeStatus(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete status ${id}`)
}
