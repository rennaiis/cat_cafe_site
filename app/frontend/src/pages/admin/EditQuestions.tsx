import { useState, type ChangeEvent } from 'react'
import s from '../../styles/admin.module.css'
import { questionsList } from '../../test/testAnket'
import type { Question } from '../../types'
import cross from '../../assets/delete.png'



function ApplicationQuestions() {
    const [editedQuestion, setEditedQuestion] = useState<Question | null>(null)

    const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name } = e.target;
        const value = e.target instanceof HTMLInputElement ? e.target.checked : e.target.value
        if (!editedQuestion) return;
        setEditedQuestion({
            ...editedQuestion,
            [name]: value
        })
    }
    return (
        <main className={s.container}>
            <h3>Вопросы анкеты</h3>
            <div className={s.list}>
                {questionsList.map((question) => (
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
                                    <button type="button"> Сохранить </button>
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
                                            setEditedQuestion(
                                                {
                                                    ...question,
                                                }
                                            )
                                        }
                                    >Редактировать</button>
                                    <button type="button">Удалить</button>
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