import { renderComments } from './renderComments.js';
import { updateComments } from './commentsData.js';
import { inputName, commentText } from './index.js';

export const newComment = () => {
    const name = inputName.value.trim().replaceAll('<', '').replaceAll('>', '');
    const text = commentText.value
        .trim()
        .replaceAll('<', '')
        .replaceAll('>', '');

    if (!name || !text) {
        alert('Заполните все поля!');
        return;
    }

    const newCommentObj = {
        name: name,
        text: text,
        // isLiked: false,
        // likes: 0,
        // date: newTime(),
    };

    document.querySelector('.form-loading').style.display = 'block';
    document.querySelector('.add-form').style.display = 'none';

    fetch('https://wedev-api.sky.pro/api/v1/mamay-vitaliy/comments', {
        method: 'POST',
        body: JSON.stringify(newCommentObj),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.result !== 'ok') {
                console.error('Ошибка при добавлении комментария:', data);
                return;
            }

            return fetch(
                'https://wedev-api.sky.pro/api/v1/mamay-vitaliy/comments',
            );
        })
        .then((response) => response.json())
        .then((data) => {
            if (!data.comments) {
                console.error('Нет поля comments в ответе:', data);
                return;
            }

            inputName.value = '';
            commentText.value = '';
            updateComments(data.comments);
            renderComments();
        })
        .catch((error) => {
            console.error('Ошибка запроса:', error);

            alert(
                'Что-то пошло не так. Проверьте подключение к интернету и попробуйте снова.',
            );
        })
        .finally(() => {
            document.querySelector('.form-loading').style.display = 'none';
            document.querySelector('.add-form').style.display = 'flex';
        });
};
