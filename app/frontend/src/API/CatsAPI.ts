import type { Cat, CatDto } from "../types";
const URL = "http://localhost:3000/cats"

export const getYearsAgo = (years: number): Date => {
    const date = new Date();
    date.setFullYear(Number(date.getFullYear()) - years)
    return date
}

export const calculateAge = (birthDateString: string | Date): number => {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  const yearsDifference = today.getFullYear() - birthDate.getFullYear();
  const monthsDifference = today.getMonth() - birthDate.getMonth();
  const totalMonths = yearsDifference * 12 + monthsDifference;
  const ageInYears = totalMonths / 12;
  return Math.round(ageInYears * 2) / 2;
}

export async function getCats() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get cats`)
   return res.json()
}

export async function createCatWithFiles(
    cat: Omit<CatDto, 'id'>,
    files: File[]){
        const formData = new FormData()
        formData.append(
            'cat',
            JSON.stringify(cat)
        )
        files.forEach(file => {
            formData.append('files', file)
        })
        const res = await fetch(
            `${URL}/create-full`,
            {
                credentials: 'include',
                method: 'POST',
                body: formData
            }
        )
        if (!res.ok){
            throw new Error('cannot create cat')
        }
        return await res.json()
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
