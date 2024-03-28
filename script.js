var editor = CodeMirror(document.getElementById("editor"), {
    mode:  "javascript", // Set the mode according to your needs, e.g., HTML, CSS, JS
    theme: "monokai",    // Set your preferred theme
    lineNumbers: false
});

editor.setSize("100%", "100%");
