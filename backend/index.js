const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const choices = ['rock', 'paper', 'scissors'];

function decideWinner(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'scissors' && computer === 'paper') ||
    (player === 'paper' && computer === 'rock')
  ) return 'win';
  return 'lose';
}

app.post('/play', (req, res) => {
  const playerChoice = req.body.player;
  if (!choices.includes(playerChoice)) {
    return res.status(400).json({ error: 'Invalid choice' });
  }
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const result = decideWinner(playerChoice, computerChoice);

  res.json({ computerChoice, result });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
