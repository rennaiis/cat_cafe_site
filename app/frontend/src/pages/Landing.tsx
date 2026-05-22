import '../index.css'
import type { MyFile } from '../types'
import { FileType } from '../../../enums/FileType'
import { FileCategory } from '../../../enums/FileCategory'

// const picUrl = "http://localhost:3000/passportFiles/"
const picUrl = './photos'
const photos_list: MyFile[] = [
    {
        id: 1, 
        path: '/files', 
        name: 'photo1.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 2, 
        path: '/files', 
        name: 'photo2.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 3, 
        path: '/files', 
        name: 'photo3.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 4, 
        path: '/files', 
        name: 'photo4.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 5, 
        path: '/files', 
        name: 'photo5.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 6, 
        path: '/files', 
        name: 'photo6.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 7, 
        path: '/files', 
        name: 'photo7.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    },
    {
        id: 8, 
        path: '/files', 
        name: 'photo8.jpg', 
        type: FileType.PHOTO, 
        category: FileCategory.LANDING_PHOTO
    }
]

const row1 = photos_list.filter((_, id)=>id%2 !== 0)
const row2 = photos_list.filter((_, id)=>id%2 === 0)
const dubleRow1 = [...row1, ...row1, ...row1]
const dubleRow2 = [...row2, ...row2, ...row2]

function Landing(){
    return (
        <>
        <div className='gallery-container'>
            <div className='row-wrapper'>
                <div className='row-photos scroll-right'>
                    {dubleRow1.map((photo, idx)=>(
                        <div className='photo-card' key = {`${idx}-${photo.id}`}>
                            <img src={`${photo.path}/${photo.name}`} alt="row1" />
                        </div>
                    ))}
                </div>
            </div>
            <div className='row-wrapper'>
                <div className='row-photos scroll-left'>
                    {dubleRow2.map((photo, idx)=>(
                        <div className='photo-card' key = {`${idx}-${photo.id}`}>
                            <img src={`${photo.path}/${photo.name}`} alt="row2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Landing