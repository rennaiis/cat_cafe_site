import { useEffect, useState, type ChangeEvent } from 'react'
import s from '../../styles/admin.module.css'
import type { Question } from '../../types'
import cross from '../../assets/delete.png'
import { createQuestion, getQuestions, removeQuestion, updateQuestion } from '../../API/QuestionsAPI'



function ApplicationQuestions() {

    function loadData() {
        getQuestions().then((data)=>{
            setQuestions(data)
        }).catch((err)=>console.error('loading questions mistake: ', err))
    }
    useEffect(()=>{loadData()}, [])
    const [questions, setQuestions] = useState<Question[]>([])
    const [editedQuestion, setEditedQuestion] = useState<Question | null>(null)
    const [newQuestion, setNewQuestion] = useState<Omit<Question, 'id'>>({
        question_text: '', 
        variants: [], 
        is_mandatory: false, 
        is_open: false, 
        one_answer: false
    })

    const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name } = e.target;
        const value = e.target instanceof HTMLInputElement ? e.target.checked : e.target.value
        if (!editedQuestion) return;
        setEditedQuestion({
            ...editedQuestion,
            [name]: value
        })
        if (name=="is_open" && e.target instanceof HTMLInputElement){
            setEditedQuestion({
                ...editedQuestion, 
                is_open : e.target.checked,
                variants:e.target.checked ? [] : editedQuestion.variants,
        })
        }
    }

    const handleNewChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name } = e.target;
        const value = e.target instanceof HTMLInputElement ? e.target.checked : e.target.value
        setNewQuestion({
            ...newQuestion,
            [name]: value
        })
        if (name=="is_open" && e.target instanceof HTMLInputElement){
            setNewQuestion({
                ...newQuestion, 
                is_open : e.target.checked,
                variants:e.target.checked ? [] : newQuestion.variants,
        })
        }
    }

    async function addNewQuestion(e: React.FormEvent) {
        e.preventDefault()
        try{
            if (newQuestion.question_text !=""){
                await createQuestion(newQuestion)
            }
            loadData()
            setNewQuestion({
                question_text: '', 
                variants: [], 
                is_mandatory: false, 
                is_open: false, 
                one_answer: false
            })
            }catch(err){
                console.error("create error ", err)
            }
        }
    async function editQuestion(e: React.FormEvent) {
        e.preventDefault()
        if (!editedQuestion) return
        try{
            console.log(editedQuestion); 
            const {id, ...result} = editedQuestion
            await updateQuestion(result, editedQuestion.id)
            setEditedQuestion(null)
            loadData()           
            } catch (err) {
                console.error("edit error", err);
        }
    }
    return (
        <main className={s.container}>
            <h3>Новый вопрос</h3>
            <form className={s.itemCardVertical} onSubmit={addNewQuestion}>
                <div className={s.field}>
                <label> Текст вопроса </label>
                <textarea 
                    rows={3} 
                    value={newQuestion.question_text}
                    name='question_text'
                    onChange={handleNewChange}
                />
                </div>
                <div className={s.field}>
                    <label>
                    <input 
                        name="is_mandatory" 
                        type="checkbox" 
                        checked={newQuestion.is_mandatory}
                        onChange={handleNewChange}
                    /> Обязательный вопрос </label>
                </div>
                <div className={s.field}>
                    <label>
                    <input 
                        name="is_open" 
                        type="checkbox" 
                        checked={newQuestion.is_open}
                        onChange={handleNewChange}
                    /> Свободный ответ </label>
                </div>
                {!newQuestion.is_open && (
                    <>
                        <div className={s.field}>
                            <label>
                                <input 
                                    type="checkbox"
                                    checked={ newQuestion.one_answer ?? false}
                                    name='one_answer'
                                    onChange={handleNewChange}
                                /> Только один вариант ответа
                            </label>
                        </div>

                        <div className={s.field}>
                            <label> Варианты ответа </label>
                            <div className={s.variants}>
                                {(newQuestion.variants ?? []).map((variant,index) =>(
                                    <div key={index} className={s.row}>
                                        <input 
                                        type="text" 
                                        value={variant}
                                        name="variants"
                                        onChange={(e) => {
                                            const variants = [...(newQuestion.variants ??[])]
                                            variants[index] = e.target.value;
                                            setNewQuestion(
                                                {
                                                    ...newQuestion,
                                                    variants,
                                                });
                                        }}
                                        />
                                        <img 
                                        src={cross} 
                                        className='icon'
                                        alt="удалить"
                                        onClick={()=>{const variants = (newQuestion.variants ?? []).filter((_,i)=>i !== index)
                                            setNewQuestion(
                                                {
                                                    ...newQuestion,
                                                    variants
                                                }
                                            )
                                        }}
                                        />
                                        </div>
                                    )
                                )}
                            </div>

                            <button type="button"
                                onClick={() =>
                                    setNewQuestion(
                                        {...newQuestion,
                                            variants:[ ...(newQuestion.variants ??[]), ""]
                                        }
                                    )
                                }
                            >Добавить вариант </button>
                        </div>
                    </>
                )}
                <button type="submit" > Добавить </button>
            </form>
            
            <h3>Вопросы анкеты</h3>
            <div className={s.list}>
                {questions.map((question) => (
                    <div key={question.id} className={s.itemCardVertical}>
                        {editedQuestion && editedQuestion.id === question.id ? (
                            <>
                                <div className={s.field}>
                                    <label> Текст вопроса </label>
                                    <textarea 
                                        rows={3} 
                                        value={editedQuestion.question_text}
                                        name='question_text'
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className={s.field}>
                                    <label>
                                        <input 
                                            name="is_mandatory" 
                                            type="checkbox" 
                                            checked={editedQuestion.is_mandatory}
                                            onChange={handleEditChange}
                                        /> Обязательный вопрос </label>
                                </div>

                                <div className={s.field}>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            name="is_open"
                                            checked={editedQuestion.is_open}
                                            onChange={(e) =>
                                                setEditedQuestion({
                                                    ...editedQuestion,
                                                    is_open:e.target.checked,
                                                    variants:e.target.checked ? [] : editedQuestion.variants,
                                                })
                                            }
                                        /> Свободный ответ </label>
                                </div>

                                {!editedQuestion.is_open && (
                                    <>
                                        <div className={s.field}>
                                            <label>
                                                <input 
                                                    type="checkbox"
                                                    checked={ editedQuestion.one_answer ?? false}
                                                    name='one_answer'
                                                    onChange={handleEditChange}
                                                /> Только один вариант ответа
                                            </label>
                                        </div>

                                        <div className={s.field}>
                                            <label> Варианты ответа </label>
                                            <div className={s.variants}>
                                                {(editedQuestion.variants ?? []).map((variant,index) =>(
                                                    <div key={index} className={s.row}>
                                                            <input 
                                                                type="text" 
                                                                value={variant}
                                                                name="variants"
                                                                onChange={(e) => {
                                                                    const variants = [...(editedQuestion.variants ??[])]
                                                                    variants[index] = e.target.value;
                                                                    setEditedQuestion(
                                                                        {
                                                                            ...editedQuestion,
                                                                            variants,
                                                                        });
                                                                }}
                                                            />
                                                            <img 
                                                            src={cross} 
                                                            className='icon'
                                                            alt="удалить"
                                                            onClick={()=>{const variants = (editedQuestion.variants ?? []).filter((_,i)=>i !== index)
                                                                setEditedQuestion(
                                                                    {
                                                                        ...editedQuestion,
                                                                        variants
                                                                    }
                                                                )
                                                            }}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            <button type="button"
                                                onClick={() =>
                                                    setEditedQuestion(
                                                        {...editedQuestion,
                                                            variants:[ ...(editedQuestion.variants ??[]), ""]
                                                        }
                                                    )
                                                }
                                            >Добавить вариант </button>
                                        </div>
                                    </>
                                )}
                                <div className={s.actions}>
                                    <button type="button" onClick={() => setEditedQuestion(null)}>Отмена</button>
                                    <button type="button" onClick={editQuestion}> Сохранить </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={s.field}>
                                    <span className={s.label}> Вопрос </span>
                                    <span>{question.question_text}</span>
                                </div>

                                <div className={s.field}>
                                    <span className={s.label}>Тип</span>
                                    <span>
                                        {question.is_open  ? "Свободный ответ" : question.one_answer ? "Один вариант" : "Несколько вариантов"}
                                    </span>
                                </div>

                                <div className={s.field}>
                                    <span className={s.label}>Обязательный</span>
                                    <span> {question.is_mandatory ? "Да" : "Нет"}</span>
                                </div>

                                {!question.is_open &&
                                    question.variants &&
                                    question.variants.length > 0 && (
                                        <div className={s.field}>
                                            <span className={s.label}> Варианты </span>
                                            <ul>
                                                {question.variants.map((variant,index) => (
                                                    <li key={index}>{variant}</li>))}
                                            </ul>
                                        </div>
                                    )}

                                <div className={s.actions}>
                                    <button type="button"
                                        onClick={() =>
                                            setEditedQuestion(question)
                                        }
                                    >Редактировать</button>
                                    <button type="button"
                                    
                                    onClick={async () => {
                                        await removeQuestion(question.id)
                                        loadData()
                                    }}>Удалить</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}
export default ApplicationQuestions