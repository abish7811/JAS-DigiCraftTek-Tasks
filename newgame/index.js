document.addEventListener('DOMContentLoaded', function() {
            // DOM elements
            const boardElement = document.getElementById('board');
            const cells = document.querySelectorAll('.cell');
            const turnIndicator = document.getElementById('turn-indicator');
            const messageElement = document.getElementById('message');
            const xScoreElement = document.getElementById('x-score');
            const tiesScoreElement = document.getElementById('ties-score');
            const oScoreElement = document.getElementById('o-score');
            const resetBtn = document.getElementById('reset-btn');
            const newGameBtn = document.getElementById('new-game-btn');
            
            // Game state
            let board = ['', '', '', '', '', '', '', '', ''];
            let currentPlayer = 'X';
            let gameActive = true;
            let scores = {
                x: 0,
                ties: 0,
                o: 0
            };
            
            // Winning combinations
            const winningConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6]             // diagonals
            ];
            
            // Initialize game
            function initGame() {
                board = ['', '', '', '', '', '', '', '', ''];
                currentPlayer = 'X';
                gameActive = true;
                messageElement.textContent = '';
                turnIndicator.textContent = 'TURN: X (Player 1)';
                turnIndicator.classList.remove('player-o');
                
                // Clear board
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o', 'winner');
                });
            }
            
            // Update score display
            function updateScores() {
                xScoreElement.textContent = scores.x;
                tiesScoreElement.textContent = scores.ties;
                oScoreElement.textContent = scores.o;
            }
            
            // Check for win or draw
            function checkResult() {
                let roundWon = false;
                let winningCombo = null;
                
                for (let i = 0; i < winningConditions.length; i++) {
                    const [a, b, c] = winningConditions[i];
                    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                        roundWon = true;
                        winningCombo = winningConditions[i];
                        break;
                    }
                }
                
                if (roundWon) {
                    gameActive = false;
                    // Highlight winning cells
                    winningCombo.forEach(index => {
                        cells[index].classList.add('winner');
                    });
                    
                    // Update scores
                    if (currentPlayer === 'X') {
                        scores.x++;
                        messageElement.textContent = 'Player 1 (abish) wins!';
                    } else {
                        scores.o++;
                        messageElement.textContent = 'Player 2 (O) wins!';
                    }
                    
                    updateScores();
                    return;
                }
                
                // Check for draw
                if (!board.includes('')) {
                    gameActive = false;
                    scores.ties++;
                    updateScores();
                    messageElement.textContent = 'Game ended in a draw!';
                }
            }
            
            // Make a move
            function makeMove(cellIndex, player) {
                if (board[cellIndex] !== '' || !gameActive) return false;
                
                board[cellIndex] = player;
                cells[cellIndex].textContent = player;
                cells[cellIndex].classList.add(player.toLowerCase());
                
                return true;
            }
            
            // Handle cell click
            function handleCellClick(e) {
                const cellIndex = parseInt(e.target.getAttribute('data-index'));
                
                if (board[cellIndex] !== '' || !gameActive) {
                    return;
                }
                
                // Player makes move
                if (makeMove(cellIndex, currentPlayer)) {
                    checkResult();
                    
                    if (gameActive) {
                        // Switch to next player
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                        
                        // Update turn indicator
                        if (currentPlayer === 'X') {
                            turnIndicator.textContent = 'TURN: X (Player 1)';
                            turnIndicator.classList.remove('player-o');
                        } else {
                            turnIndicator.textContent = 'TURN: O (Player 2)';
                            turnIndicator.classList.add('player-o');
                        }
                    }
                }
            }
            
            // Event listeners
            cells.forEach(cell => {
                cell.addEventListener('click', handleCellClick);
            });
            
            resetBtn.addEventListener('click', function() {
                scores = {
                    x: 0,
                    ties: 0,
                    o: 0
                };
                updateScores();
                
                // Add animation effect
                this.textContent = "Scores Reset!";
                setTimeout(() => {
                    this.textContent = "Reset Scores";
                }, 1500);
            });
            
            newGameBtn.addEventListener('click', function() {
                initGame();
                
                // Add animation effect
                this.textContent = "Starting...";
                setTimeout(() => {
                    this.textContent = "New Game";
                }, 1500);
            });
            
            // Initialize scores
            updateScores();
        });