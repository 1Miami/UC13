const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

let selectedStars = [];
const stars = document.querySelectorAll('.star');
let initialPositions = [];

stars.forEach((star) => {
    initialPositions.push({
        element: star,
        left: star.style.left,
        top: star.style.top
    });
});

stars.forEach((star, index) => {
    star.style.left = (Math.random() * 90 + 5) + '%';
    star.style.top = (Math.random() * 70 + 5) + '%';

    star.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.button === 0) { 
            connectStar(star);
        }
    });

    star.addEventListener('contextmenu', (e) => {
        e.preventDefault(); 
        removeLastConnection();
    });

    let isDragging = false;

    star.addEventListener('mousedown', function () {
        isDragging = true;
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            star.style.left = e.pageX - 10 + 'px';
            star.style.top = e.pageY - 10 + 'px';
            redrawConnections(); 
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });
});

function connectStar(star) {
    const rect = star.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    selectedStars.push({ x, y });

    if (selectedStars.length > 1) {
        drawLine(selectedStars[selectedStars.length - 2], selectedStars[selectedStars.length - 1]);
    }
}

function drawLine(start, end) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}

function removeLastConnection() {
    if (selectedStars.length > 1) {
        selectedStars.pop(); 
        redrawConnections();
    }
}


function redrawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i < selectedStars.length; i++) {
        drawLine(selectedStars[i - 1], selectedStars[i]);
    }
}


document.getElementById('clearConnections').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    selectedStars = [];

   
    initialPositions.forEach((pos) => {
        pos.element.style.left = pos.left;
        pos.element.style.top = pos.top;
    });
});