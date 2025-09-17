const inputName = document.querySelector(".add-form-name");
    const commentText = document.querySelector(".add-form-text");
    const btnAddComment = document.querySelector(".add-form-button");
    const commentsList = document.querySelector(".comments");


    let comments = [
        {
            name: "Глеб Фокин",
            text: "Это будет первый комментарий на этой странице",
            isLiked: true,   
            likes: 3,
            createdAt: "12.02.22 12:18"
        },
        {
            name: "Варвара Н.",
            text: "Мне нравится как оформлена эта страница! ❤",
            isLiked: true,   
            likes: 75,
            createdAt: "13.02.22 19:22"
        }
    ];


    const newTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };


    const toggleLike = (event) => {
        event.stopPropagation();
        const button = event.target;
        const index = Number(button.dataset.index);

        comments[index].isLiked = !comments[index].isLiked;
        comments[index].likes += comments[index].isLiked ? 1 : -1;

        renderComments(); 
    };

    const quoteComments = () => {
      const comment = document.querySelectorAll(".comment");

      for (const commentElement of comment) {
        commentElement.addEventListener("click", () => {
          const index = Number(commentElement.dataset.index);
          const comment = comments[index];
          commentText.value = `>${comment.name}:\n>${comment.text}\n\n`;
          commentText.focus();

        })
      }
    };


    const renderComments = () => {
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


    const newComment = () => {
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


    btnAddComment.addEventListener('click', newComment);
    

    inputName.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') newComment();
    });

    commentText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) newComment();
    });


    renderComments();