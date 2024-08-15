// Dark Mode Toggle
document.getElementById('toggleDarkMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Background Color Picker
document.getElementById('bgColorPicker').addEventListener('input', function() {
    document.body.style.backgroundColor = this.value;
});

// Add Link Functionality
document.getElementById('addLink').addEventListener('click', function() {
    const linkTitle = document.getElementById('linkTitle').value;
    const linkURL = document.getElementById('linkURL').value;
    const linkCategory = document.getElementById('linkCategory').value;
    const thumbnailFile = document.getElementById('linkThumbnail').files[0];

    if (!linkTitle || !linkURL) {
        alert("Please fill in both title and URL.");
        return;
    }

    const li = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = `[${linkCategory}] ${linkTitle}`;
    link.href = linkURL;
    link.target = '_blank';

    if (thumbnailFile) {
        const thumbnail = document.createElement('img');
        thumbnail.classList.add('thumbnail');
        thumbnail.src = URL.createObjectURL(thumbnailFile);
        li.appendChild(thumbnail);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');

    li.appendChild(link);
    li.appendChild(deleteBtn);

    document.getElementById('linkList').appendChild(li);

    // Clear input fields
    document.getElementById('linkTitle').value = '';
    document.getElementById('linkURL').value = '';
    document.getElementById('linkThumbnail').value = '';

    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    link.addEventListener('click', function() {
        let count = parseInt(link.getAttribute('data-clicks')) || 0;
        count++;
        link.setAttribute('data-clicks', count);
        alert(`Link clicked ${count} times`);
    });
});

// Search Functionality
document.getElementById('search').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const links = document.querySelectorAll('#linkList li');

    links.forEach(link => {
        const title = link.querySelector('a').textContent.toLowerCase();
        if (title.includes(searchQuery)) {
            link.style.display = '';
        } else {
            link.style.display = 'none';
        }
    });
});

// Drag-and-Drop Sorting
new Sortable(document.getElementById('linkList'), {
    animation: 150,
});

// Export Links Functionality
document.getElementById('exportLinks').addEventListener('click', function() {
    const links = [];
    document.querySelectorAll('#linkList li').forEach(link => {
        const linkData = {
            title: link.querySelector('a').textContent,
            url: link.querySelector('a').href,
        };
        links.push(linkData);
    });
    const blob = new Blob([JSON.stringify(links, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'links.json';
    a.click();
    URL.revokeObjectURL(url);
});
