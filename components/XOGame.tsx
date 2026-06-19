"use client";

import React, { useState, useEffect } from "react";
import { Play, RefreshCw, Cpu, User, ShieldAlert } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

type BoardState = (string | null)[];

export default function XOGame() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [scores, setScores] = useState({ player: 0, ai: 0, ties: 0 });
  const [gameActive, setGameActive] = useState(true);
  const [statusMsg, setStatusMsg] = useState("Your Turn (X)");
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = (currentBoard: BoardState) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: pattern };
      }
    }
    if (currentBoard.every((cell) => cell !== null)) {
      return { winner: "tie", line: null };
    }
    return null;
  };

  const makeMove = (index: number) => {
    if (!gameActive || board[index] !== null || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result.winner, result.line);
    } else {
      setStatusMsg("AI is calculating...");
    }
  };

  // AI Move logic
  useEffect(() => {
    if (isPlayerTurn || !gameActive) return;

    const timer = setTimeout(() => {
      const aiMoveIndex = getBestMove(board);
      if (aiMoveIndex !== -1) {
        const newBoard = [...board];
        newBoard[aiMoveIndex] = "O";
        setBoard(newBoard);
        setIsPlayerTurn(true);

        const result = checkWinner(newBoard);
        if (result) {
          handleGameEnd(result.winner, result.line);
        } else {
          setStatusMsg("Your Turn (X)");
        }
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [isPlayerTurn, board, gameActive]);

  const getBestMove = (currentBoard: BoardState): number => {
    // 1. Can AI win in this move?
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = "O";
        if (checkWinner(testBoard)?.winner === "O") return i;
      }
    }

    // 2. Block player win
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = "X";
        if (checkWinner(testBoard)?.winner === "X") return i;
      }
    }

    // 3. Take center if free
    if (currentBoard[4] === null) return 4;

    // 4. Take corners
    const corners = [0, 2, 6, 8];
    const freeCorners = corners.filter((c) => currentBoard[c] === null);
    if (freeCorners.length > 0) {
      return freeCorners[Math.floor(Math.random() * freeCorners.length)];
    }

    // 5. Take any remaining empty cell
    const emptyCells = currentBoard.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
    if (emptyCells.length > 0) {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    return -1;
  };

  const handleGameEnd = (winner: string, line: number[] | null) => {
    setGameActive(false);
    if (winner === "X") {
      setStatusMsg("YOU WIN // BREACH SUCCESS");
      setScores((s) => ({ ...s, player: s.player + 1 }));
      setWinningLine(line);
    } else if (winner === "O") {
      setStatusMsg("AI WINS // DECRYPTED");
      setScores((s) => ({ ...s, ai: s.ai + 1 }));
      setWinningLine(line);
    } else {
      setStatusMsg("DRAW ROUND // ENCRYPTED");
      setScores((s) => ({ ...s, ties: s.ties + 1 }));
    }
  };

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameActive(true);
    setStatusMsg("Your Turn (X)");
    setWinningLine(null);
  };

  const resetAll = () => {
    setScores({ player: 0, ai: 0, ties: 0 });
    resetRound();
  };

  return (
    <SpotlightCard className="p-5 rounded-xl border-glass-border flex flex-col justify-between h-full bg-[#0D1017]/30 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-glass-border/40 pb-3">
        <h3 className="text-xs font-mono font-bold text-accent tracking-wider uppercase flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-accent" /> Grid Decryption // XO-CORE
        </h3>
        
        <div className="flex items-center gap-2 font-mono text-[9px] bg-[#0D1017] border border-glass-border px-2.5 py-1 rounded-md">
          <span className="text-accent"><User className="w-3 h-3 inline mr-1 text-accent" />{scores.player}</span>
          <span className="text-muted">/</span>
          <span className="text-[#00E676]"><Cpu className="w-3 h-3 inline mr-1 text-[#00E676]" />{scores.ai}</span>
          <span className="text-muted">/</span>
          <span className="text-muted">T:{scores.ties}</span>
        </div>
      </div>

      {/* Game board */}
      <div className="my-5 flex-1 flex flex-col justify-center items-center">
        
        {/* Game status message */}
        <div className="text-[11px] font-mono text-center mb-3 h-4 select-text">
          <span className={statusMsg.includes("WIN") ? "text-green-400 font-bold" : statusMsg.includes("AI WINS") ? "text-[#FF5F56]" : "text-muted"}>
            {statusMsg}
          </span>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[180px] aspect-square">
          {board.map((cell, idx) => {
            const isWinningCell = winningLine?.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => makeMove(idx)}
                disabled={!gameActive || cell !== null || !isPlayerTurn}
                className={`aspect-square bg-[#0D1017]/85 border rounded-xl flex items-center justify-center text-xl font-mono font-extrabold transition-all cursor-pointer ${
                  cell === "X"
                    ? "text-accent"
                    : cell === "O"
                    ? "text-[#00E676]"
                    : "hover:bg-[#0D1017] hover:border-accent/40"
                } ${
                  isWinningCell
                    ? "bg-accent/15 border-accent shadow-[0_0_12px_rgba(88,166,255,0.3)] scale-[1.03]"
                    : "border-glass-border/70"
                }`}
              >
                {cell}
              </button>
            );
          })}
        </div>

        {/* Game actions */}
        {!gameActive && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={resetRound}
              className="px-3 py-1.5 bg-accent text-[#000000] hover:bg-accent-hover font-bold text-[10px] rounded transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Play className="w-2.5 h-2.5 fill-[#000000]" /> Next Duel
            </button>
            <button
              onClick={resetAll}
              className="px-3 py-1.5 border border-glass-border hover:bg-white/5 font-bold text-[10px] text-muted hover:text-text rounded transition-colors cursor-pointer active:scale-95"
            >
              Reset Scores
            </button>
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="border-t border-glass-border/40 pt-2 flex items-center justify-between text-[8px] font-mono text-muted select-none">
        <span>STATE: CALIBRATED</span>
        <button
          onClick={resetAll}
          className="hover:text-text flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-2.5 h-2.5" /> RESET COUNTERS
        </button>
      </div>

    </SpotlightCard>
  );
}
