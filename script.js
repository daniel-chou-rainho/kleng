const noteContainer = document.getElementById('noteContainer');
const themeToggleBtn = document.getElementById('themeToggleBtn');

themeToggleBtn.addEventListener('click', toggleTheme);

// Load saved notes on page load
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    ensureEmptyNote();
});

function addNote(content = '', id = null) {
    const noteId = id || Date.now().toString();
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.dataset.id = noteId;
    
    const noteContent = document.createElement('textarea');
    noteContent.value = content;
    noteContent.style.minHeight = '6rem';
    noteContent.addEventListener('input', () => {
        autoResize.call(noteContent);
        saveNotes();
        ensureEmptyNote();
    });

    noteContent.addEventListener('blur', () => {
        if (noteContent.value.trim() === '') {
            noteContainer.removeChild(noteDiv);
            saveNotes();
            ensureEmptyNote();
        }
    });

    noteDiv.appendChild(noteContent);
    noteContainer.appendChild(noteDiv);

    autoResize.call(noteContent);
}

function ensureEmptyNote() {
    const notes = noteContainer.children;
    const lastNote = notes[notes.length - 1];
    
    if (!lastNote || lastNote.querySelector('textarea').value.trim() !== '') {
        addNote();
    }
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
    const notes = Array.from(noteContainer.children)
        .map(noteDiv => ({
            id: noteDiv.dataset.id,
            content: noteDiv.querySelector('textarea').value
        }))
        .filter(note => note.content.trim() !== ''); // Don't save empty notes
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => addNote(note.content, note.id));
}

function saveTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
