import { comments } from './commentsData.js'
import { commentText } from './index.js'
import { renderComments } from './renderComments.js'

export const toggleLike = (event) => {
    event.stopPropagation()
    const button = event.target
    const index = Number(button.dataset.index)

    comments[index].isLiked = !comments[index].isLiked
    comments[index].likes += comments[index].isLiked ? 1 : -1

    renderComments()
}

export const quoteComments = () => {
    const comment = document.querySelectorAll('.comment')

    for (const commentElement of comment) {
        commentElement.addEventListener('click', () => {
            const index = Number(commentElement.dataset.index)
            const comment = comments[index]
            commentText.value = `>${comment.name}:\n>${comment.text}\n\n`
            commentText.focus()
        })
    }
}
