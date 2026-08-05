import type { Rule } from "../types";
const URL = `${import.meta.env.BACKEND_API}/rules`

export async function getRules() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get rules`)
   return res.json()
}

export async function createRule(rule: Omit<Rule, 'id'>){
    const res = await fetch(URL, {
        credentials: 'include',
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(rule)
    })
    return res.json()
}

export async function updateRule(rule:Omit<Rule, 'id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(rule)
    })
    return res.json()
}

export async function removeRule(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete rule ${id}`)
}
