import { renderComments } from './renderComments.js';
import { btnAdd } from './initListeners.js';
import { updateComments } from './commentsData.js';

export const inputName = document.querySelector('.add-form-name');
export const commentText = document.querySelector('.add-form-text');

btnAdd();
renderComments();
document.querySelector('.comments-loading').style.display = 'block';

fetch('https://wedev-api.sky.pro/api/v1/mamay-vitaliy/comments', {
    method: 'GET',
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.querySelector('.comments-loading').style.display = 'none';
        document.querySelector('.add-form').style.display = 'flex';
       
        updateComments(data.comments);
        renderComments();
    });

// fetch('https://wedev-api.sky.pro/api/v1/mamay-vitaliy/comments')
