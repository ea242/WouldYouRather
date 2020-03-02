import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION = 'SAVE_QUESTION'

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
                optionOneText,
                optionTwoText,
                author: authedUser
            })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
            .catch((e) => {
                console.warn('Error in handleAddQuestion: ', e)
                alert('There was an error adding the question. Try again.')
            })
    }
}


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function saveQuestionAns({authedUser, qid, answer }) {
    return {
        type: SAVE_QUESTION,
        qid,
        authedUser,
        answer
    }
}

export function handleSaveQuestionAnswer(info) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveQuestionAnswer(info)
            .then(() => dispatch(saveQuestionAns(info)))
            .then(() => dispatch(hideLoading()))
            .catch((e) => {
                console.warn('Error in handleSaveQuestionAnswer: ', e)
                alert('There was an error answering the question. Try again.')
            })
    }
}