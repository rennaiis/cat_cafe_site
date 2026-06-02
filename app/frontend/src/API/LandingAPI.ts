import type { LandingData } from "../types";

const URL = "http://localhost:3000/landing-data"
export async function getLandingData() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   console.log(res.url);
   if (!res.ok) throw new Error(`can't get landing`)
   return res.json()
}

export async function saveLandingData(landingData: LandingData) {
   const response = await fetch(URL, {
      credentials: 'include',
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(landingData),
  });
  if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('backend validation mistake:', errorData);
      throw new Error(errorData.message);
  }
  return response.json();
}
