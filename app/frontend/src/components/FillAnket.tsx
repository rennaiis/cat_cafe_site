import { questionsList } from "../test/testAnket"
import s from '../styles/catApplication.module.css'


const questions = questionsList
function FillAnket(){
    console.log(questions);
    return(
        <div className="content-block">
            <h3>Ответьте на вопросы анкеты</h3>
            <form className={s.formAnket}>
                {questions.map((question)=>(
                    <div key={question.id}>
                        {question.question_text}
                        {question.is_open ? 
                            <input type="text" />
                        : (question.one_answer && question.variants)? 
                            question.variants.map((variant, idx)=>(
                                <label key={idx} className={s.variant}>
                                    <input type="radio" name={`question-${question.id}`}/>
                                    <span>{variant}</span>
                                </label>
                            )): (question.variants)?
                                question.variants.map((variant, idx)=>(
                                    <label key={idx} className={s.variant}>
                                        <input type="checkbox"/>
                                        <span>{variant}</span>
                                    </label>
                                )) : <></>
                        }
                    </div>
                ))}
                <button>Отправить</button>
            </form>
        </div>
    )
}

export default FillAnket