import type { Adopter } from "../types";

const URL = "http://localhost:3000/adopters"

export async function getAdopters() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get adopters`)
   return res.json()
}

export async function createAdopter(adopter: Omit<Adopter, 'id'>){
    const res = await fetch(URL, {
        credentials: 'include',
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(adopter)
    })
    return res.json()
}

export async function updateAdopter(adopter:Omit<Adopter, 'id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(adopter)
    })
    return res.json()
}

export async function removeAdopter(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete adopter ${id}`)
}
