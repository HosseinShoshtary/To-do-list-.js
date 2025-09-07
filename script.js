// گرفتن المان‌ها از HTML
const taskInput = document.getElementById('task-input'); // input کار جدید
const addBtn = document.getElementById('add-btn');       // دکمه اضافه کردن
const taskList = document.getElementById('task-list');   // ul برای نمایش کارها

// گرفتن داده‌ها از LocalStorage یا ایجاد آرایه خالی
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// تابع برای نمایش کارها در صفحه
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        // اضافه کردن کلاس completed اگر کار تیک خورده باشه
        if (task.completed) {
            li.classList.add('completed');
        }

        li.textContent = task.text;

        // ساخت دکمه حذف
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'حذف';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // جلوگیری از تیک خوردن هنگام کلیک روی حذف
            deleteTask(index);
        });

        // تیک زدن کار با کلیک روی li
        li.addEventListener('click', () => {
            toggleTask(index);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    // آپدیت تعداد کل و تعداد انجام شده
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
}

// تابع برای اضافه کردن کار جدید
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    // اضافه کردن کار جدید در ابتدای آرایه
    tasks.unshift({ text: taskText, completed: false });
    saveAndRender();
    taskInput.value = ''; // خالی کردن input بعد از اضافه کردن
}

// تابع برای حذف کار
function deleteTask(index) {
    tasks.splice(index, 1); // حذف از آرایه
    saveAndRender();
}

// تابع برای تیک زدن یا برداشتن تیک کار
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // برعکس کردن وضعیت completed
    saveAndRender();
}

// ذخیره در LocalStorage و رندر دوباره
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// وقتی دکمه اضافه کردن کلیک شد
addBtn.addEventListener('click', addTask);

// همچنین وقتی Enter زده شد، کار اضافه بشه
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// رندر اولیه کارها از LocalStorage
renderTasks();





const sortSelect = document.getElementById('sort');

// وقتی مقدار مرتب‌سازی تغییر کرد
sortSelect.addEventListener('change', () => {
    sortTasks(sortSelect.value);
    renderTasks();
});

function sortTasks(type) {
    switch(type) {
        case 'newest':
            tasks.sort((a, b) => tasks.indexOf(b) - tasks.indexOf(a));
            break;
        case 'oldest':
            tasks.sort((a, b) => tasks.indexOf(a) - tasks.indexOf(b));
            break;
        case 'completed-first':
            tasks.sort((a, b) => (b.completed - a.completed));
            break;
        case 'completed-last':
            tasks.sort((a, b) => (a.completed - b.completed));
            break;
    }
}