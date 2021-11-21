const uri = '/api/TodoItems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');

    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {

    fetch(uri + '/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));

    closeInput();

    return false;
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(uri + '/' + itemId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    // DoTo
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    const markup = data.map(item => {
        return `<tr>
                    <td>
                        ${item.isComplete ? 'yes' : 'no'}
                    </td>
                    <td>
                        ${item.name}
                    </td>
                    <td>
                        <button onclick="displayEditForm(${item.id})">Edit</button>
                    </td>
                    <td>
                        <button onclick="deleteItem(${item.id})">Delete</button>
                    </td>
                </tr>`;
    });

    tBody.innerHTML = markup;

    document.getElementById('counter').innerHTML = `Todos count: ${data.length}`;

    todos = data;
}