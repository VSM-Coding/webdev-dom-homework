import {comments} from "./commentsData.js";
import {toggleLike, quoteComments} from "./commentsFunction.js";


export const renderComments = () => {
        const commentsList = document.querySelector(".comments");
        commentsList.innerHTML = ""; 

        comments.forEach((comment, index) => {
            const commentHTML = `
                <li class="comment" data-index="${index}">
                    <div class="comment-header">
                        <div>${comment.name}</div>
                        <div>${comment.createdAt}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">${comment.text}</div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${comment.likes}</span>
                            <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
                        </div>
                    </div>
                </li>
            `;
            commentsList.innerHTML += commentHTML;
        });

    
        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', toggleLike);
        });
        quoteComments();
    };