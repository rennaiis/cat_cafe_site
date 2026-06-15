import { ApplicationStatus } from "../../../enums/ApplicationStatus";
import type { AdoptApplication, AdoptApplicationDto } from "../types";

const URL = "http://localhost:3000/adopt-applications"

export async function getAdoptApplications() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get applications`)
   return await res.json()
}

export async function createAdoptApplication(application:AdoptApplicationDto){
    const res = await fetch(URL, {
        credentials: 'include',
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(application)
    })
    if (!res.ok) throw new Error("cant create application")
    return await res.json()
}

export async function approveApplication(id: number) {
     const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            application_status: ApplicationStatus.APPROVED
        })
    })
    return await res.json()
}
export async function rejectApplication(id: number) {
     const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            application_status: ApplicationStatus.REJECTED
        })
    })
    return await res.json()
    
}


export async function updateAdoptApplication(application:Omit<AdoptApplication, 'id'>, id: number) {
    const res = await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(application)
    })
    return await res.json()
}

export async function removeAdoptApplication(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete application${id}`)
}
