const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");

// Method 1: Using addEventListener for each box
box1.addEventListener("click", () => {
    console.log("Method 1 - Box 1 color:", getComputedStyle(box1).backgroundColor);
});

box2.addEventListener("click", () => {
    console.log("Method 1 - Box 2 color:", getComputedStyle(box2).backgroundColor);
});

box3.addEventListener("click", () => {
    console.log("Method 1 - Box 3 color:", getComputedStyle(box3).backgroundColor);
});

// // Method 2: Using a single event listener and event delegation
// document.addEventListener("click", (event) => {
//     const clickedElement = event.target;
//     if (clickedElement.classList.contains("box")) {
//         console.log("Method 2 - Box color:", getComputedStyle(clickedElement).backgroundColor);
// }
// });

// // Method 3: Using data attributes
// const boxes = document.querySelectorAll(".box");
// boxes.forEach((box, index) => {
//     box.setAttribute("data-box-index", index + 1);
//     box.addEventListener("click", () => {
//     const boxIndex = box.getAttribute("data-box-index");
//     console.log(`Method 3 - Box ${boxIndex} color:`, getComputedStyle(box).backgroundColor);
// });
// });
