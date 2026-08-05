const URL = `${import.meta.env.BACKEND_API}/auth/me`
export async function authMe() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't authorize`)
   return res.json()
}