document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let comment = document.getElementById('comment').value;
    let pfpUrl = document.getElementById('pfpUrl').value || 'default-pfp-url.jpg'; // Default PFP if none is provided

    let currentDateTime = new Date();
    let formattedDate = currentDateTime.toLocaleString();

    let commentBox = document.createElement('div');
    commentBox.classList.add('comment-box');

    commentBox.innerHTML = `
        <img src="${pfpUrl}" class="pfp" alt="Profile Picture">
        <div class="comment-content">
            <p><strong>${username}</strong> - <span>${formattedDate}</span></p>
            <p class="comment-text">${comment}</p>
            <input type="text" class="edit-input" style="display:none;" value="${comment}">
            <button class="edit-btn">Edit</button>
            <button class="save-btn" style="display:none;">Save</button>
            <button class="delete-btn">Delete</button>
            <button class="report-btn">Report</button>
        </div>
    `;

    document.getElementById('commentsContainer').appendChild(commentBox);

    // Edit functionality
    let editButton = commentBox.querySelector('.edit-btn');
    let saveButton = commentBox.querySelector('.save-btn');
    let commentText = commentBox.querySelector('.comment-text');
    let editInput = commentBox.querySelector('.edit-input');

    editButton.addEventListener('click', function () {
        commentText.style.display = 'none'; // Hide the original comment
        editInput.style.display = 'block'; // Show the input field
        editButton.style.display = 'none'; // Hide the edit button
        saveButton.style.display = 'inline'; // Show the save button
    });

    saveButton.addEventListener('click', function () {
        let updatedComment = editInput.value;
        commentText.innerText = updatedComment; // Update the comment text
        commentText.style.display = 'block'; // Show the updated comment
        editInput.style.display = 'none'; // Hide the input field
        editButton.style.display = 'inline'; // Show the edit button
        saveButton.style.display = 'none'; // Hide the save button
    });

    // Delete functionality
    commentBox.querySelector('.delete-btn').addEventListener('click', function () {
        commentBox.remove();
    });

    // Report functionality
    commentBox.querySelector('.report-btn').addEventListener('click', function () {
        // Show the first popup (confirmation)
        let reportConfirmationPopup = document.getElementById('reportConfirmationPopup');
        reportConfirmationPopup.style.display = 'block';

        // Handle confirmation click
        document.getElementById('confirmReport').onclick = function () {
            reportConfirmationPopup.style.display = 'none'; // Hide the first popup

            // Show the second popup (report sent)
            let reportSentPopup = document.getElementById('reportSentPopup');
            reportSentPopup.style.display = 'block';

            // Handle closing of the second popup
            document.getElementById('closePopup').onclick = function () {
                reportSentPopup.style.display = 'none'; // Hide the second popup
            };
        };

        // Handle cancel click
        document.getElementById('cancelReport').onclick = function () {
            reportConfirmationPopup.style.display = 'none'; // Hide the confirmation popup
        };
    });

    // Clear the form after submission
    document.getElementById('commentForm').reset();
});
