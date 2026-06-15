import type { User } from "../types";

const URL = "http://localhost:3000/users"

export async function getUsers() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get users`)
   return res.json()
}

export async function createUser(user: Omit<User, 'id'>){
    const res = await fetch(URL, {
        credentials: 'include',
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(user)
    })
    return res.json()
}

export async function updateUser(user:Omit<User, 'id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(user)
    })
    return res.json()
}

export async function removeUser(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete users ${id}`)
}
