# 2048 Game

A recreation of the classic puzzle game **2048**, built entirely with **HTML, CSS, and pure JavaScript**.  
This project was developed as part of the Globant Piscine Project 0.

---

## 📖 Project Overview
The goal of this project is to implement the 2048 game mechanics and user interface without external libraries, focusing on core web development skills.

Key features:
- 4x4 grid with tiles that hold values as powers of 2.
- Random initial setup with two tiles (2 or 4).
- Keyboard controls (arrow keys) to move tiles.
- Tile merging rules:
  - Two tiles with the same value merge into one with their sum.
  - Merging increases the score.
- Score tracking with real-time updates.
- Winning condition: reach the **2048 tile**.
- End game condition: no valid moves left.
- Restart functionality with a button.
- Visual feedback with animations for tile movement and merging.
- Alerts or modals for **Game Over** and **Victory** messages.

---

## 🚀 Installation & Usage

### Prerequisites
- [Docker](https://www.docker.com/) installed on your machine.
- [docker-compose](https://docs.docker.com/compose/) available.

### Steps
1. Clone the repository:
   git clone https://github.com/Hallucinette/My-2048.git

3. Build and run with Docker:
   docker-compose up --build

4. Open your browser and navigate to:
   http://localhost:3000

### 🎮 Controls
⬆️ Up Arrow: Move tiles up

⬇️ Down Arrow: Move tiles down

⬅️ Left Arrow: Move tiles left

➡️ Right Arrow: Move tiles right


### ✨ Bonus Features (Optional)
Once the mandatory requirements are complete, you can extend the game with:

✅ Infinite mode (tiles larger than 2048).

✅ Power-ups for special gameplay effects.

Competitive or time trial mode.

Accessibility improvements (high-contrast mode, ARIA attributes).

