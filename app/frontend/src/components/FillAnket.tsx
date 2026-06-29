import s from '../styles/catApplication.module.css'
import { useEffect, useState } from "react"
import type { Answer, Question } from "../types"
import adminStyles from '../styles/admin.module.css'
import { getQuestions } from "../API/QuestionsAPI"
import { createAnswer } from '../API/AnswersAPI'
import { useNavigate } from 'react-router-dom'

interface fillAnketProps{
    applicationId: number
}

function FillAnket({applicationId}: fillAnketProps){
    const navigate = useNavigate()
    async function loadData() {
        await getQuestions().then((data)=>{
            setQuestions(data)
            const initialAnswers = data.map((q: Question) => ({
                answer: '',
                question_id: q.id,
                application_id: applicationId
            }))
            setAnswers(initialAnswers)
        }).catch((err)=>console.error('loading questions mistake: ', err))
    }
    useEffect(()=>{loadData()}, [])

    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<Answer[]>([])
    const[isSent, setIsSent] = useState<boolean>(false)

    const handleInputChange = (questionId: number, textValue: string) => {
        setAnswers(prevAnswers => prevAnswers.map((item) => (
                item.question_id === questionId ? { 
                    ...item, answer: textValue 
                } : item
                )
            )
        )
    }

     const handleCheckboxChange = (questionId: number, variant: string) => {
        setAnswers(prevAnswers => 
            prevAnswers.map(item => {
                if (item.question_id !== questionId) return item
                const currentVariants = item.answer ? item.answer.split(', ') : []
                let updatedVariants: string[]
                if (currentVariants.includes(variant)) {
                    updatedVariants = currentVariants.filter(v => v !== variant)
                } else {
                    updatedVariants = [...currentVariants, variant]
                }
                return { ...item, answer: updatedVariants.join(', ') }
            })
        )
    }
    const sendAnket = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await answers.map((a)=>{
                createAnswer(a)
            })
            alert("Анкета успешно отправлена")
            navigate('/cats')
                       
        } catch (error) {
            console.error('send anket mistake', error)
        }
    }
    return(
        <div className="content-block">
            <div className={adminStyles.contentBlock}>
            <h3>Ответьте на вопросы анкеты</h3>
            <form className={s.formAnket} onSubmit={sendAnket}>
                {questions.map((question)=>{
                    const currentAnswerObj = answers.find(a => a.question_id === question.id)
                    const currentAnswerText = currentAnswerObj?.answer || ''
                    return(
                        <div key={question.id}>
                        {question.question_text}
                        {question.is_open ? 
                            <textarea 
                                rows={3}
                                value={currentAnswerText}
                                onChange={(e)=>handleInputChange(question.id, e.target.value)}
                                required={question.is_mandatory}></textarea>
                        : (question.one_answer && question.variants)? 
                            question.variants.map((variant, idx)=>(
                                <label key={idx} className={s.variant}>
                                    <input type="radio" 
                                        name={`question-${question.id}`}
                                        checked={currentAnswerText === variant}
                                        onChange={() => handleInputChange(question.id, variant)}
                                        required={question.is_mandatory}
                                    />
                                    <span>{variant}</span>
                                </label>
                            )): (question.variants)?
                                question.variants.map((variant, idx)=>{
                                    const isChecked = currentAnswerText.split(', ').includes(variant)
                                    return(
                                        <label key={idx} className={s.variant}>
                                        <input type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleCheckboxChange(question.id, variant)}/>
                                        <span>{variant}</span>
                                    </label>
                                    )
                        }) : <></>
                        }
                        </div>
                    )                    
                })}
                {isSent ? <h2>Ваша заявка успешно отправлена!</h2>:<></>}
                <button>Отправить</button>
            </form>
            </div>
        </div>
    )
}

export default FillAnket