
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

// Initialize cube positions into a grid
const cubeSize = 100;
const gap = 10;
const columns = 5;

cubes.forEach((cube, index) => {
  const row = Math.floor(index / columns);
  const col = index % columns;
  cube.style.left = `${col * (cubeSize + gap)}px`;
  cube.style.top = `${row * (cubeSize + gap)}px`;
  cube.style.width = cubeSize + 'px';
  cube.style.height = cubeSize + 'px';
});

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener('mousedown', e => {
    selectedCube = cube;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
    cube.style.zIndex = 1000;
    cube.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', e => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Constrain within bounds
  x = Math.max(0, Math.min(container.clientWidth - selectedCube.clientWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - selectedCube.clientHeight, y));

  selectedCube.style.left = `${x}px`;
  selectedCube.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.zIndex = '';
    selectedCube.style.cursor = 'grab';
    selectedCube = null;
  }
});

