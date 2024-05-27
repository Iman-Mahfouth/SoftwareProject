document.addEventListener('DOMContentLoaded', () => {
    // Edit functionality
    const editForm = document.getElementById('editForm');
    let currentEditElement;

    window.editCategory = function(button) {
        currentEditElement = button.closest('.d-flex');
        const category = currentEditElement.querySelector('.col').innerText;
        document.getElementById('editCategory').value = category;
    };

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newCategory = document.getElementById('editCategory').value;
        currentEditElement.querySelector('.col').innerText = newCategory;
        $('#editModal').modal('hide');
    });

    // Create functionality
    const createForm = document.getElementById('createForm');
    const createErrorMessage = document.getElementById('createErrorMessage');
    const newCategoryInput = document.getElementById('newCategory');

    createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newCategory = newCategoryInput.value.trim();

        // Check if the category already exists
        const categories = document.querySelectorAll('.table-responsive .col:first-child');
        let categoryExists = false;
        categories.forEach(categoryElement => {
            if (categoryElement.innerText.trim().toLowerCase() === newCategory.toLowerCase()) {
                categoryExists = true;
            }
        });

        if (categoryExists) {
            createErrorMessage.innerText = 'This category already exists. Please enter a different name.';
            createErrorMessage.style.display = 'block';
            return;
        }

        createErrorMessage.style.display = 'none';

        const newElement = document.createElement('div');
        newElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'p-2');
        newElement.innerHTML = `
            <div class="col">${newCategory}</div>
            <div class="col">
                <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editModal" onclick="editCategory(this)">Edit</button>
                <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal" onclick="setDeleteTarget(this)">Delete</button>
            </div>
        `;
        document.querySelector('.table-responsive').appendChild(newElement);
        $('#createModal').modal('hide');
    });

    // Reset create form and error message when modal is shown
    $('#createModal').on('show.bs.modal', () => {
        newCategoryInput.value = '';
        createErrorMessage.style.display = 'none';
    });

    // Delete functionality
    let currentDeleteElement;

    window.setDeleteTarget = function(button) {
        currentDeleteElement = button.closest('.d-flex');
    };

    const deleteButton = document.getElementById('confirmDelete');
    deleteButton.addEventListener('click', () => {
        if (currentDeleteElement) {
            currentDeleteElement.remove();
            $('#deleteModal').modal('hide');
        }
    });
});
