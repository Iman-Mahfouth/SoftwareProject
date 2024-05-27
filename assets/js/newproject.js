document.addEventListener('DOMContentLoaded', () => {
    // Populate categories
    const categories = ['Art', 'Science', 'Technology', 'Health'];
    const populateCategories = (selectElement) => {
        selectElement.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            selectElement.appendChild(option);
        });
    };
    populateCategories(document.getElementById('newProjectCategory'));
    populateCategories(document.getElementById('editProjectCategory'));

    // Edit functionality
    const editForm = document.getElementById('editForm');
    let currentEditElement;

    window.editProject = function(button) {
        currentEditElement = button.closest('.row');
        document.getElementById('editProjectTitle').value = currentEditElement.querySelector('.col-2').innerText;
        document.getElementById('editProjectDescription').value = currentEditElement.querySelector('.col-3').innerText;
        document.getElementById('editProjectCategory').value = currentEditElement.querySelector('.col-2:nth-child(4)').innerText;
    };

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentEditElement.querySelector('.col-2').innerText = document.getElementById('editProjectTitle').value;
        currentEditElement.querySelector('.col-3').innerText = document.getElementById('editProjectDescription').value;
        currentEditElement.querySelector('.col-2:nth-child(4)').innerText = document.getElementById('editProjectCategory').value;
        $('#editModal').modal('hide');
    });

    // Create functionality
    const createForm = document.getElementById('createForm');
    const createErrorMessage = document.getElementById('createErrorMessage');
    const newProjectTitle = document.getElementById('newProjectTitle');
    const newProjectDescription = document.getElementById('newProjectDescription');
    const newProjectPDF = document.getElementById('newProjectPDF');
    const newProjectCategory = document.getElementById('newProjectCategory');

    createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTitle = newProjectTitle.value.trim();
        const newDescription = newProjectDescription.value.trim();
        const newCategory = newProjectCategory.value;
        const newDate = new Date().toLocaleDateString();

        if (!newTitle || !newDescription || !newProjectPDF.files.length || !newCategory) {
            createErrorMessage.innerText = 'All fields are required.';
            createErrorMessage.style.display = 'block';
            return;
        }

        createErrorMessage.style.display = 'none';

        const newElement = document.createElement('div');
        newElement.classList.add('row', 'project-item');
        newElement.innerHTML = `
          <div class="col-2">${newTitle}</div>
          <div class="col-3">${newDescription}</div>
          <div class="col-2"><a href="#" class="text-info" onclick="openPDF(event)">Open Project</a></div>
          <div class="col-2">${newCategory}</div>
          <div class="col-2">${newDate}</div>
          <div class="col-1">
            <a href="#" class="text-warning" data-toggle="modal" data-target="#editModal" onclick="editProject(this)">Edit</a> |
            <a href="#" class="text-info" data-toggle="modal" data-target="#detailsModal" onclick="viewDetails(this)">Details</a> |
            <a href="#" class="text-danger" data-toggle="modal" data-target="#deleteModal" onclick="setDeleteTarget(this)">Delete</a>
          </div>
        `;
        document.querySelector('.project-body').appendChild(newElement);
        $('#createModal').modal('hide');
        if (document.querySelector('.project-body').childElementCount === 1) {
            document.getElementById('projectTableSection').style.display = 'block';
        }
    });

    // Reset create form and error message when modal is shown
    $('#createModal').on('show.bs.modal', () => {
        newProjectTitle.value = '';
        newProjectDescription.value = '';
        newProjectPDF.value = '';
        newProjectCategory.value = '';
        createErrorMessage.style.display = 'none';
    });

    // View Details functionality
    window.viewDetails = function(button) {
        const projectItem = button.closest('.row');
        const title = projectItem.querySelector('.col-2').innerText;
        const description = projectItem.querySelector('.col-3').innerText;
        const category = projectItem.querySelector('.col-2:nth-child(4)').innerText;
        const date = projectItem.querySelector('.col-2:nth-child(5)').innerText;

        const detailsModalBody = document.querySelector('#detailsModal .modal-body');
        detailsModalBody.innerHTML = `
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Date of publish:</strong> ${date}</p>
        `;
    };

    // Delete functionality
    let currentDeleteElement;

    window.setDeleteTarget = function(button) {
        currentDeleteElement = button.closest('.row');
    };

    const deleteButton = document.getElementById('confirmDelete');
    deleteButton.addEventListener('click', () => {
        if (currentDeleteElement) {
            currentDeleteElement.remove();
            $('#deleteModal').modal('hide');
            if (document.querySelector('.project-body').childElementCount === 0) {
                document.getElementById('projectTableSection').style.display = 'none';
            }
        }
    });

    // Open PDF functionality
    window.openPDF = function(event) {
        event.preventDefault();
        alert("PDF file should open here.");
        // Add code to open PDF file here
    };
});
