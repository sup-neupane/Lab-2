const rowsInput = document.getElementById('rows');
const columnsInput = document.getElementById('columns');
const generateBtn = document.getElementById('generate');
const addRowBtn = document.getElementById('add-row');
const deleteRowBtn = document.getElementById('delete-row');
const highlightBtn = document.getElementById('highlight-even');
const tableWrapper = document.getElementById('table-wrapper');

let currentTable = null;
let isHighlighted = false;

function buildTable(rows, cols) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  for (let c = 1; c <= cols; c++) {
    const th = document.createElement('th');
    th.textContent = `Header ${c}`;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (let r = 1; r <= rows; r++) {
    const tr = document.createElement('tr');
    for (let c = 1; c <= cols; c++) {
      const td = document.createElement('td');
      td.textContent = `Row ${r} - Col ${c}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  return table;
}

function updateTableControls(enabled) {
  addRowBtn.disabled = !enabled;
  deleteRowBtn.disabled = !enabled;
  highlightBtn.disabled = !enabled;
}

function refreshHighlight() {
  if (!currentTable) return;

  const rows = currentTable.querySelectorAll('tbody tr');
  rows.forEach((row, idx) => {
    row.classList.toggle('even-highlight', isHighlighted && (idx + 1) % 2 === 0);
  });
}

generateBtn.addEventListener('click', () => {
  const rows = Number(rowsInput.value);
  const cols = Number(columnsInput.value);

  if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1) {
    alert('Please provide valid positive integers for rows and columns.');
    return;
  }

  currentTable = buildTable(rows, cols);
  tableWrapper.innerHTML = '';
  tableWrapper.appendChild(currentTable);
  isHighlighted = false;
  highlightBtn.textContent = 'Highlight Even Rows';
  updateTableControls(true);
});

addRowBtn.addEventListener('click', () => {
  if (!currentTable) return;
  const tbody = currentTable.querySelector('tbody');
  const cols = currentTable.querySelectorAll('thead th').length;
  const newRowNumber = tbody.querySelectorAll('tr').length + 1;
  const tr = document.createElement('tr');

  for (let c = 1; c <= cols; c++) {
    const td = document.createElement('td');
    td.textContent = `Row ${newRowNumber} - Col ${c}`;
    tr.appendChild(td);
  }

  tbody.appendChild(tr);
  refreshHighlight();
});

deleteRowBtn.addEventListener('click', () => {
  if (!currentTable) return;
  const tbody = currentTable.querySelector('tbody');
  const rows = tbody.querySelectorAll('tr');
  if (rows.length === 0) return;

  tbody.removeChild(rows[rows.length - 1]);
  if (rows.length === 1) {
    updateTableControls(false);
  }
  refreshHighlight();
});

highlightBtn.addEventListener('click', () => {
  if (!currentTable) return;
  isHighlighted = !isHighlighted;
  highlightBtn.textContent = isHighlighted ? 'Clear Highlight' : 'Highlight Even Rows';
  refreshHighlight();
});

updateTableControls(false);
