import { useState } from "react"
import FillAnket from "../components/FillAnket"
import FillData from "../components/FillData"
import type { AdoptApplication, Adopter } from "../types"
import { createAdopter } from "../API/AdoptersAPI"
import { createAdoptApplication } from "../API/ApplicationsAPI"
import { ApplicationStatus } from "../../../enums/ApplicationStatus"

function AdoptApplicationForm(){
    const [step, setStep] = useState<1|2>(1)
    const [applicationId, setApplicationId] = useState<number|null>(null)
   const handleDataSubmit = async (catId: number, adopterData: Omit<Adopter, 'id'>)=>{
    try{
        const adopter: Adopter = await createAdopter(adopterData)
        if (!adopter){
            throw new Error("adopter not created")
        }
        const application: AdoptApplication = await createAdoptApplication({
            application_status: ApplicationStatus.NEW, 
            adopter_id: adopter.id, 
            cat_id: catId
        })
        setApplicationId(application.id)
        setStep(2)
    } catch(e) {
        console.error('cant create application', e)

    }
   }
    return (
        <>
            {step == 1 && (<FillData onNext={handleDataSubmit}/>)}
            {step == 2 && applicationId && <FillAnket applicationId = {applicationId}/>}
        </>
    )
}
export default AdoptApplicationForm
