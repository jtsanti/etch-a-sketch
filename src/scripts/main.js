"use strict"

function addStyles(grid) {
    const maxGridSize = 500;
    const gridCellSize = maxGridSize / grid;

    document.querySelector('style').innerHTML = `
        body {
            margin: 0;
            background-color: #adbac7;
        }
        h1 {
            background-color: #000;
            color: #fcd303;
            padding: 40px;
            margin: 0;
            text-align: center;
        }
        p, .btn_container {
            text-align: center;
        }
        .btn {
            padding: 5px;
            margin: 0 10px;
            background-color: #fca103;
        }
        .grid_container {
            display: grid;
            justify-content: center;
            margin: 10px auto;
            max-width: ${maxGridSize}px;
            grid-template-columns: repeat(${grid}, ${gridCellSize}px);
            border: 3px solid #000;
            background-color: #fff;
        }
        
        .grid_cell {
            width: ${gridCellSize}px;
            height: ${gridCellSize}px;
        }
    `;
}

function setUpGrid(grid) {
    addStyles(grid);
    
    const gridDiv = document.getElementById('grid');
    const containerDiv = document.createElement('div');

    gridDiv.appendChild(containerDiv).className = 'grid_container';
    grid *= grid; // sets up the total number of cells needed

    for (let i = 0; i < grid; i++) {
        let gridCell = document.createElement('div');
        gridCell.addEventListener('mouseover', (event) => {
            event.target.style.backgroundColor = 'red';
        })

        containerDiv.appendChild(gridCell).className = 'grid_cell';
    }
}

setUpGrid(50);

