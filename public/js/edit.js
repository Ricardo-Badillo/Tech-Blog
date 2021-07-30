const id = document.querySelector('#post-id').value;

const editPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
    document.location.replace('/dashboard');
    } else {
        alert('Failed to update!');
    }
};


document.querySelector('#update-btn').addEventListener('click', editPost);


const deletePost = async (event) => {
    event.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete!')
    }
};

document.querySelector('#delete-btn').addEventListener('click', deletePost);