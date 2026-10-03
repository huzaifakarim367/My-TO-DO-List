const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');
const count = document.getElementById('count');
const clearBtn = document.getElementById('clearBtn');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function save() { localStorage.setItem('tasks', JSON.stringify(tasks)); }
function render() {
  list.innerHTML = '';
  let filtered = tasks.filter(t => filter==='all'? true : filter==='completed'? t.completed :!t.completed);
  filtered.forEach((t,i) => {
    let li = document.createElement('li');
    li.className = t.completed? 'completed' : '';
    li.innerHTML = `<span>${t.text}</span>
      <div class="task-actions">
        <button onclick="toggle(${tasks.indexOf(t)})">✅</button>
        <button onclick="remove(${tasks.indexOf(t)})">❌</button>
      </div>`;
    list.appendChild(li);
  });
  count.textContent = `${tasks.filter(t=>!t.completed).length} tasks left`;
  save();
}
function addTask() {
  if(input.value.trim()==='') return alert('Please write a task!');
  tasks.push({text:input.value.trim(), completed:false});
  input.value=''; render();
}
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', e => { if(e.key==='Enter') addTask(); });
window.toggle = i => { tasks[i].completed=!tasks[i].completed; render(); }
window.remove = i => { tasks.splice(i,1); render(); }
clearBtn.addEventListener('click', () => { tasks=tasks.filter(t=>!t.completed); render(); });
document.querySelectorAll('.filter').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); filter=b.dataset.filter; render();
  });
});
render();