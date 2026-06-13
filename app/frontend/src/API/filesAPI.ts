import type { FileDto } from "../types"

const URL = "http://localhost:3000/files"
export const filesStorageURL = "http://localhost:3000/catFiles"

export async function getFiles() {
   const res =  await fetch(URL, {
      credentials: 'include',
   });
   if (!res.ok) throw new Error(`can't get files`)
   return res.json()
}



export async function removeFile(id: number) {
    const res=await fetch(`${URL}/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })   
    if (!res.ok) throw new Error(`can't delete file ${id}`)
}

export async function createFiles(files: File[], dto: FileDto) {
  const formData = new FormData();
  files.forEach(f => {
    formData.append('files', f);
  });
  if (dto.cat_id) formData.append('cat_id', dto.cat_id.toString());
  if (dto.color_type_id) formData.append('color_type_id', dto.color_type_id.toString());
  formData.append('category', dto.category);
  formData.append('type', dto.type);
  formData.append('is_approved', String(dto.is_approved));

  const res = await fetch(`${URL}/uploadFiles`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  return res.json();
}
