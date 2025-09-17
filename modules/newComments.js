import {renderComments} from "./renderComments.js";
import {newTime} from "./newTime.js";
import {comments} from "./commentsData.js";
import {inputName, commentText} from "./index.js";



export const newComment = () => {
        const name = inputName.value.trim().replaceAll("<", "").replaceAll(">", "");
        const text = commentText.value.trim().replaceAll("<", "").replaceAll(">", "");

        if (!name || !text) {
            alert('Заполните все поля!');
            return;
        }

        const newCommentObj = {
            name: name,
            text: text,
            isLiked: false,
            likes: 0,
            createdAt: newTime()
        };

        comments.push(newCommentObj);
        inputName.value = "";
        commentText.value = "";

        renderComments();
    };