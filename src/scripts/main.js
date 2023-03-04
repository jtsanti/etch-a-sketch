"use strict"

function styleGrid(grid) {
    const maxGridSize = 500;
    const gridCellSize = maxGridSize / grid;

    document.querySelector('style').innerHTML = `
        .grid-container {
            max-width: ${maxGridSize}px;
            grid-template-columns: repeat(${grid}, ${gridCellSize}px);
            grid-template-rows: repeat(${grid}, ${gridCellSize}px);
        }
        
        .grid-cell {
            width: ${gridCellSize}px;
            height: ${gridCellSize}px;
        }
    `;
}

function changeCellColor(event) {
    // creates a random color
    const randColor =  '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0,6);

    if (event.target.style.backgroundColor === '' || event.target.style.backgroundColor === '#fff') {
        event.target.style.backgroundColor = randColor;
    } else {
        let cell = window.getComputedStyle(event.target).getPropertyValue('filter');
        let regex = /\((.*?)\)/;
        let brightness = cell.match(regex);

        event.target.style.filter = `brightness(${brightness[1] - 0.1})`;
    }
}

function buildGrid(grid) { 
    const gridDiv = document.getElementById('grid');
    const containerDiv = document.createElement('div');
    const gridExists = document.querySelector('.grid-container');

    if (gridExists) {
        gridDiv.removeChild(gridExists);
    }

    styleGrid(grid);

    gridDiv.appendChild(containerDiv).className = 'grid-container';

    for (let i = 0; i < (grid * grid); i++) {
        let gridCell = document.createElement('div');
        
        gridCell.addEventListener('mouseover', (e) => changeCellColor(e));

        containerDiv.appendChild(gridCell).className = 'grid-cell';
    }
}

function setUpPage() {
    const gridButtons = document.querySelectorAll('.grid-btn');
    const clearButton = document.getElementById('clear');

    gridButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            buildGrid(btn.textContent)
        });
    });

    clearButton.addEventListener('click', () => {
        const gridCells = document.querySelectorAll('.grid-cell');

        gridCells.forEach(cell => {
            cell.style.backgroundColor = '';
            cell.style.filter = 'brightness(1)';
        });
    });
}

setUpPage();
