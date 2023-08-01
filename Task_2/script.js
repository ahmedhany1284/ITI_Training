const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");

function rgbToColorName(rgb) {
    return colors[rgb] || "unknown";
}
// Method 1: Using addEventListener for each box
box1.addEventListener("click", () => {
    console.log("Box 1 color: Red");
    alert(" Box 1 color: Red");
});

box2.addEventListener("click", () => {
    alert("Box 2 color: Green " );
    console.log("Box 2 color: Green");

});

box3.addEventListener("click", () => {
    console.log("Box 3 color: Blue");
    alert("Box 3 color: Blue" );
});
