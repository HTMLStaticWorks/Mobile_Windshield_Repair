document.addEventListener('DOMContentLoaded', () => {
    // Dashboard Logic
    const statsTiles = document.querySelectorAll('.stat-tile');
    statsTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            // Placeholder for dashboard interactions
            console.log('Tile clicked');
        });
    });
});
