
function animateCell(index) {
  const squares = document.querySelectorAll('.cell');
  const el = squares[index];
    if (!el)
        return;
        el.animate(
        [
            { transform: 'scale(1)', backgroundColor: '#cdc1b4' },
            { transform: 'scale(1.2)', backgroundColor: '#FFD700' },
            { transform: 'scale(1)', backgroundColor: '#cdc1b4' }
        ],
        { duration: 300, easing: 'ease' }
    );
}

function showWinAnimation() {
  const container = document.getElementById("win-animation");
  container.innerHTML = `
    <lottie-player
      src="assets/Confetti.json"
      background="transparent"
      speed="1"
      style="width:100%;height:100%;"
      autoplay>
    </lottie-player>
  `;
  container.style.display = "block";
}
