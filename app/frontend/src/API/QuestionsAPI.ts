import type { Question} from "../types";

const URL = `${import.meta.env.BACKEND_API}/questions`

export async function getQuestions() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get questions`)
   return res.json()
}

export async function createQuestion(question: Omit<Question, 'id'>){
    const res = await fetch(URL, {
        credentials: 'include',
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(question)
    })
    return res.json()
}

export async function updateQuestion(question:Omit<Question, 'id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(question)
    })
    return res.json()
}

export async function removeQuestion(id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete question ${id}`)
}
