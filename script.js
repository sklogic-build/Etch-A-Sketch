const container = document.getElementById("container");

const pencilBtn = document.getElementById("pencil");
const rainbowBtn = document.getElementById("rainbow");
const eraserBtn = document.getElementById("eraser");
const resizeBtn = document.getElementById("resize");
const clearBtn = document.getElementById("clear");

let mode = "pencil";
let isDrawing = false;

document.body.addEventListener("mousedown", () => isDrawing = true);
document.body.addEventListener("mouseup", () => isDrawing = false);

function setActive(btn) {
    document.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

pencilBtn.onclick = () => {
    mode = "pencil";
    setActive(pencilBtn);
};

rainbowBtn.onclick = () => {
    mode = "rainbow";
    setActive(rainbowBtn);
};

eraserBtn.onclick = () => {
    mode = "eraser";
    setActive(eraserBtn);
};

function getColor() {
    if (mode === "pencil") return "black";
    if (mode === "eraser") return "white";

    if (mode === "rainbow") {
        return `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
}

function createGrid(size) {
    container.innerHTML = "";

    const squareSize = 520 / size;

    for (let i = 0; i < size * size; i++) {

        const square = document.createElement("div");
        square.classList.add("square");

        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";

        square.addEventListener("mousedown", () => {
            square.style.backgroundColor = getColor();
        });

        square.addEventListener("mouseover", () => {
            if (isDrawing) {
                square.style.backgroundColor = getColor();
            }
        });

        container.appendChild(square);
    }
}

createGrid(16);

resizeBtn.onclick = () => {
    let size = prompt("Enter grid size (max 100)");
    if (size < 1 || size > 100) return;
    createGrid(size);
};

clearBtn.onclick = () => {
    document.querySelectorAll(".square")
        .forEach(s => s.style.backgroundColor = "white");
};