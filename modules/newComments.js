import { renderComments } from './renderComments.js';
import { updateComments } from './commentsData.js';
import { inputName, commentText } from './index.js';

let retryCount = 0;

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
    };

    document.querySelector('.form-loading').style.display = 'block';
    document.querySelector('.add-form').style.display = 'none';

    fetch('https://wedev-api.sky.pro/api/v1/mamay-vitaliy/comments', {
        method: 'POST',
        body: JSON.stringify(newCommentObj),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Ошибка сервера');
            }

            if (response.status === 400) {
                throw new Error('Неверный запрос');
            }

            if (response.status === 201) {
                return response.json();
            }
        })
        .then((data) => {
            if (data.result !== 'ok') {
                console.error('Ошибка при добавлении комментария:', data);
                return;
            }

            retryCount = 0;

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

            document.querySelector('.form-loading').style.display = 'none';
            document.querySelector('.add-form').style.display = 'flex';
        })
        .catch((error) => {
            console.error('Ошибка запроса:', error);

            if (error.message === 'Ошибка сервера' && retryCount < 2) {
                retryCount++;
                console.log(`Повторная попытка ${retryCount}...`);
                setTimeout(newComment, 1000);
                return;
            }

            retryCount = 0;

            if (error.message === 'Неверный запрос') {
                alert('Имя и комментарий не могут быть короче 3-х символов');
                inputName.classList.add(
                    'add-form--error',
                    'add-form--error-shake',
                );
                commentText.classList.add(
                    'add-form--error',
                    'add-form--error-shake',
                );
                setTimeout(() => {
                    inputName.classList.remove(
                        'add-form--error',
                        'add-form--error-shake',
                    );
                    commentText.classList.remove(
                        'add-form--error',
                        'add-form--error-shake',
                    );
                }, 2000);
            } else if (error.message === 'Failed to fetch') {
                alert(
                    'Что-то пошло не так. Проверьте подключение к интернету и попробуйте снова.',
                );
            } else {
                alert('Не удалось отправить комментарий. Попробуйте позже.');
            }

            document.querySelector('.form-loading').style.display = 'none';
            document.querySelector('.add-form').style.display = 'flex';
        });
};
