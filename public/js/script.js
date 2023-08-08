const itemForm = document.getElementById('itemForm');
const itemName = document.getElementById('itemName');
const itemTable = document.getElementById('itemTable').querySelector('tbody');

itemForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = itemName.value;
  const response = await fetch('https://primeiro-projeto.onrender.com/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  if (response.ok) {
    itemName.value = '';
    fetchItems();
  }
});

async function fetchItems() {
  const response = await fetch('https://primeiro-projeto.onrender.com/items');
  const items = await response.json();

  itemTable.innerHTML = '';

  items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
    `;
    itemTable.appendChild(row);
  });
}

fetchItems();
