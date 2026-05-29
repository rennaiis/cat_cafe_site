import type { Question } from "../types";

export const questionsList: Question[] = [
    {
        id: 0, 
        is_mandatory: true, 
        is_open: false, 
        one_answer: false, 
        question_text: "Пример вопроса",
        variants: ['вариант 1', 'вариант 2', 'вариант 3']
    }, 
    {
        id: 2, 
        is_mandatory: true, 
        is_open: true, 
        question_text: "Пример вопроса 2",
    }, 
    {
        id: 3, 
        is_mandatory: true, 
        is_open: false, 
        one_answer: true,
        question_text: "Пример вопроса 3",
        variants: ['вариант 1', 'вариант 2', 'вариант 3']
    }
]