import { commentText, inputName } from './index.js'
import { newComment } from './newComments.js'

export const btnAdd = () => {
    const btnAddComment = document.querySelector('.add-form-button')

    btnAddComment.addEventListener('click', newComment)

    inputName.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') newComment()
    })

    commentText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) newComment()
    })
}
