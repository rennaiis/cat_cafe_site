import type { AnswerDTO } from "../types";
const URL = `${import.meta.env.BACKEND_API}/answers`

export async function getAnswers() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get answers`)
   return res.json()
}

export async function createAnswer(answer: AnswerDTO){
    const res = await fetch(URL, {
        credentials: 'include',
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(answer)
    })
    return res.json()
}

export async function updateRule(answer:Omit<AnswerDTO, 'id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(answer)
    })
    return res.json()
}

export async function removeAnswer(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete answer ${id}`)
}
