import type { Cat } from "../types";
const URL = "http://localhost:3000/cats"

export async function getCats() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get cats`)
   return res.json()
}

export async function createCat(cat: Omit<Cat, 'id'>){
    const res = await fetch(URL, {
        credentials: 'include',
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(cat)
    })
    return res.json()
}

export async function updateCat(cat:Omit<Cat, 'id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(cat)
    })
    return res.json()
}

export async function removeCat(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete cat ${id}`)
}
