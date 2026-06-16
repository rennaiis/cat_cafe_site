const URL = "http://localhost:3000/auth/me"
export async function authMe() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't authorize`)
   return res.json()
}