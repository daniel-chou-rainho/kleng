const noteContainer = document.getElementById('noteContainer');
const addNoteBtn = document.getElementById('addNoteBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

addNoteBtn.addEventListener('click', () => addNote());
themeToggleBtn.addEventListener('click', toggleTheme);

// Load saved notes and theme on page load
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    loadTheme();
});

function addNote(content = '') {
    const noteId = Date.now().toString();
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.dataset.id = noteId;
    
    const noteContent = document.createElement('textarea');
    noteContent.placeholder = 'Enter your note here...';
    noteContent.value = content;
    noteContent.style.minHeight = '6rem';
    noteContent.addEventListener('input', () => {
        autoResize.call(noteContent);
        saveNotes();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
    `;
    deleteBtn.onclick = function() {
        noteContainer.removeChild(noteDiv);
        saveNotes();
    };

    noteDiv.appendChild(noteContent);
    noteDiv.appendChild(deleteBtn);
    noteContainer.appendChild(noteDiv);

    autoResize.call(noteContent);
}

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    saveTheme();
}

function saveNotes() {
    const notes = Array.from(noteContainer.children).map(noteDiv => ({
        id: noteDiv.dataset.id,
        content: noteDiv.querySelector('textarea').value
    }));
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => addNote(note.content));
}

function saveTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
}
