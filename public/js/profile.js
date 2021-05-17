const newRecipe = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#project-name').value.trim();
    const ingredients = document.querySelector('#project-funding').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
    const pictureurl = document.querySelector('#project-url').value.trim();

    if (name && ingredients && description && pictureurl) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({ name, ingredients, description, pictureurl }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create recipe');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('value')) {
        const id = event.target.getAttribute('value');

        const response = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete recipe');
        }
    }
};

document
    .querySelector('.new-project-form')
    .addEventListener('submit', newRecipe);

document
    // .querySelector('.meal-name')
    .querySelector('.delete_recipe')
    .addEventListener('click', delButtonHandler);