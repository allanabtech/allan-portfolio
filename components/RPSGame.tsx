"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RefreshCw, Cpu, User, Clock, ShieldAlert } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

type GameStatus = "idle" | "countdown_player" | "countdown_opponent" | "result" | "match_over";
type Choice = "stone" | "paper" | "scissor";

const CHOICE_DETAILS = {
  stone: { label: "Stone", emoji: "🪨", color: "text-[#FFBD2E] border-[#FFBD2E]/30" },
  paper: { label: "Paper", emoji: "📄", color: "text-accent border-accent/30" },
  scissor: { label: "Scissor", emoji: "✂️", color: "text-[#FF5F56] border-[#FF5F56]/30" }
};

export default function RPSGame() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<Choice | null>(null);
  const [playerTimer, setPlayerTimer] = useState(3);
  const [opponentTimer, setOpponentTimer] = useState(2);
  
  // Scoring States
  // roundScores: tracks wins inside the CURRENT round (first to 3 wins wins the round)
  const [roundScores, setRoundScores] = useState({ player: 0, opponent: 0 });
  // matchScores: tracks round wins (first to 2 round wins wins the match)
  const [matchScores, setMatchScores] = useState({ player: 0, opponent: 0 });
  const [currentRoundNum, setCurrentRoundNum] = useState(1);
  
  const [resultMsg, setResultMsg] = useState("");
  const [aiRollingEmoji, setAiRollingEmoji] = useState("🪨");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const aiRollRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (aiRollRef.current) clearInterval(aiRollRef.current);
    };
  }, []);

  // Opponent rolling emoji effect
  useEffect(() => {
    if (status === "countdown_opponent") {
      const emojis = ["🪨", "📄", "✂️"];
      let i = 0;
      aiRollRef.current = setInterval(() => {
        setAiRollingEmoji(emojis[i % 3]);
        i++;
      }, 100);
    } else {
      if (aiRollRef.current) {
        clearInterval(aiRollRef.current);
        aiRollRef.current = null;
      }
    }
  }, [status]);

  const startRound = () => {
    if (status === "match_over") return;
    
    // Reset choices and timers for a new throw
    setPlayerChoice(null);
    setOpponentChoice(null);
    setPlayerTimer(3);
    setOpponentTimer(2);
    setResultMsg("");
    setStatus("countdown_player");

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setPlayerTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          
          setPlayerChoice((currentChoice) => {
            if (currentChoice) {
              startOpponentTurn();
            } else {
              // Timeout loss: AI gets a point inside this round
              evaluateScore(null, "stone"); // auto pick stone for AI
            }
            return currentChoice;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const makeChoice = (choice: Choice) => {
    if (status !== "countdown_player") return;
    setPlayerChoice(choice);
    
    if (timerRef.current) clearInterval(timerRef.current);
    startOpponentTurn();
  };

  const startOpponentTurn = () => {
    setStatus("countdown_opponent");
    setOpponentTimer(2);

    timerRef.current = setInterval(() => {
      setOpponentTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          revealOpponent();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const revealOpponent = () => {
    const choices: Choice[] = ["stone", "paper", "scissor"];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setOpponentChoice(randomChoice);
    
    setPlayerChoice((p) => {
      evaluateScore(p, randomChoice);
      return p;
    });
  };

  const evaluateScore = (playerPick: Choice | null, aiPick: Choice) => {
    if (!playerPick) {
      // Player timed out
      const newRoundAI = roundScores.opponent + 1;
      setRoundScores((s) => ({ ...s, opponent: newRoundAI }));
      setResultMsg("TIMEOUT // AI WINS POINT");
      checkRoundOrMatchEnd(roundScores.player, newRoundAI);
      return;
    }

    if (playerPick === aiPick) {
      // Draw - no points to both
      setResultMsg("DRAW ROUND // NO POINT");
      setStatus("result");
    } else if (
      (playerPick === "stone" && aiPick === "scissor") ||
      (playerPick === "paper" && aiPick === "stone") ||
      (playerPick === "scissor" && aiPick === "paper")
    ) {
      const newRoundPlayer = roundScores.player + 1;
      setRoundScores((s) => ({ ...s, player: newRoundPlayer }));
      setResultMsg("YOU WIN POINT // BREACH");
      checkRoundOrMatchEnd(newRoundPlayer, roundScores.opponent);
    } else {
      const newRoundAI = roundScores.opponent + 1;
      setRoundScores((s) => ({ ...s, opponent: newRoundAI }));
      setResultMsg("AI WINS POINT // DEFENSE");
      checkRoundOrMatchEnd(roundScores.player, newRoundAI);
    }
  };

  const checkRoundOrMatchEnd = (currentPlayerWins: number, currentAIWins: number) => {
    if (currentPlayerWins === 3) {
      // Player wins the current round!
      const newMatchPlayer = matchScores.player + 1;
      setMatchScores((s) => ({ ...s, player: newMatchPlayer }));
      
      if (newMatchPlayer === 2) {
        // Player wins the match! (Best of 2 wins)
        setStatus("match_over");
        setResultMsg("🔥 MATCH COMPLETE // PLAYER VICTORIOUS 🔥");
      } else {
        setStatus("result");
        setResultMsg(`ROUND ${currentRoundNum} SECURED!`);
        setCurrentRoundNum((r) => r + 1);
        // Clear round scores for next round
        setRoundScores({ player: 0, opponent: 0 });
      }
    } else if (currentAIWins === 3) {
      // AI wins the current round!
      const newMatchAI = matchScores.opponent + 1;
      setMatchScores((s) => ({ ...s, opponent: newMatchAI }));

      if (newMatchAI === 2) {
        // AI wins the match!
        setStatus("match_over");
        setResultMsg("👾 MATCH OVER // AI DOMINATES SYSTEM 👾");
      } else {
        setStatus("result");
        setResultMsg(`ROUND ${currentRoundNum} LOST TO AI!`);
        setCurrentRoundNum((r) => r + 1);
        setRoundScores({ player: 0, opponent: 0 });
      }
    } else {
      // Continue inside the round
      setStatus("result");
    }
  };

  const resetMatch = () => {
    setScoresReset();
    setStatus("idle");
    setPlayerChoice(null);
    setOpponentChoice(null);
    setResultMsg("");
  };

  const setScoresReset = () => {
    setRoundScores({ player: 0, opponent: 0 });
    setMatchScores({ player: 0, opponent: 0 });
    setCurrentRoundNum(1);
  };

  return (
    <SpotlightCard className="p-5 rounded-xl border-glass-border flex flex-col justify-between h-full bg-[#0D1017]/30 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-glass-border/40 pb-3">
        <h3 className="text-xs font-mono font-bold text-accent tracking-wider uppercase flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-accent" /> Cryptic Throw // best of 3
        </h3>
        
        {/* Match score (Round wins) */}
        <div className="flex items-center gap-2 font-mono text-[9px] bg-[#0D1017] border border-glass-border px-2.5 py-1 rounded-md">
          <span className="text-text font-bold"><User className="w-3 h-3 inline mr-1 text-accent" />Rounds: {matchScores.player}</span>
          <span className="text-muted">:</span>
          <span className="text-[#FF5F56] font-bold"><Cpu className="w-3 h-3 inline mr-1 text-[#FF5F56]" />Rounds: {matchScores.opponent}</span>
        </div>
      </div>

      {/* Round Info & Scoreboard */}
      <div className="flex justify-between items-center bg-[#0D1017]/50 border border-glass-border/30 rounded px-3 py-1.5 mt-2.5 font-mono text-[9px] text-muted">
        <span>CURRENT ROUND: #{currentRoundNum}</span>
        <div className="flex items-center gap-1 text-text">
          <span>Wins: {roundScores.player}</span>
          <span className="text-muted">/</span>
          <span>AI: {roundScores.opponent}</span>
          <span className="text-muted">(First to 3)</span>
        </div>
      </div>

      {/* Main Game Arena */}
      <div className="my-3 flex-1 flex flex-col justify-center items-center relative min-h-[140px]">
        {status === "idle" && (
          <div className="text-center space-y-3.5">
            <p className="text-[11px] text-muted max-w-[220px] leading-relaxed">
              Play best of 3 rounds. First to win 3 throws wins the round. First to win 2 rounds wins the match. Draws award 0 points.
            </p>
            <button
              onClick={startRound}
              className="px-5 py-2 rounded-lg bg-accent text-[#000000] font-bold text-xs hover:bg-accent-hover transition-all flex items-center gap-2 mx-auto active:scale-95 cursor-pointer shadow-lg shadow-accent/15"
            >
              <Play className="w-3.5 h-3.5 fill-[#000000]" /> Start Match
            </button>
          </div>
        )}

        {status === "countdown_player" && (
          <div className="w-full text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#FFBD2E] font-bold animate-pulse">
              <Clock className="w-3.5 h-3.5" /> SELECT HAND: {playerTimer}s
            </div>

            {/* Grid of Choices */}
            <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
              {(Object.keys(CHOICE_DETAILS) as Choice[]).map((cKey) => {
                const item = CHOICE_DETAILS[cKey];
                return (
                  <button
                    key={cKey}
                    onClick={() => makeChoice(cKey)}
                    className="p-3 bg-[#0D1017] hover:bg-[#0D1017] border border-glass-border/70 hover:border-accent/40 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-90 cursor-pointer group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                    <span className="text-[9px] font-mono text-muted group-hover:text-text font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {status === "countdown_opponent" && (
          <div className="w-full text-center space-y-4">
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-accent font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              AI SCANNING LOGIC: {opponentTimer}s
            </div>

            {/* Battle Layout */}
            <div className="flex items-center justify-center gap-6">
              {playerChoice && (
                <div className="p-3 bg-[#0D1017]/80 border border-glass-border rounded-xl flex flex-col items-center w-16">
                  <span className="text-2xl">{CHOICE_DETAILS[playerChoice].emoji}</span>
                  <span className="text-[8px] font-mono text-muted mt-1 uppercase">PLAYER</span>
                </div>
              )}
              
              <span className="text-xs font-mono text-muted animate-pulse">VS</span>

              <div className="p-3 bg-[#0D1017]/80 border border-glass-border rounded-xl flex flex-col items-center justify-center w-16 h-[72px] animate-pulse">
                <span className="text-2xl">{aiRollingEmoji}</span>
                <span className="text-[8px] font-mono text-muted mt-1 uppercase">AI</span>
              </div>
            </div>
          </div>
        )}

        {status === "result" && (
          <div className="w-full text-center space-y-4">
            <h4 className={`text-xs font-mono font-bold tracking-wider uppercase select-text px-3 py-1 bg-white/5 border border-glass-border/30 rounded-full inline-block ${
              resultMsg.includes("WIN") || resultMsg.includes("SECURED")
                ? "text-green-400"
                : resultMsg.includes("LOSS") || resultMsg.includes("LOST") || resultMsg.includes("FAULT")
                ? "text-[#FF5F56]"
                : "text-muted"
            }`}>
              {resultMsg}
            </h4>

            {/* Reveal */}
            <div className="flex items-center justify-center gap-6">
              {playerChoice ? (
                <div className="p-3 bg-[#0D1017] border border-glass-border rounded-xl flex flex-col items-center w-16 select-text">
                  <span className="text-2xl">{CHOICE_DETAILS[playerChoice].emoji}</span>
                  <span className="text-[8px] font-mono text-muted mt-1 uppercase">PLAYER</span>
                </div>
              ) : (
                <div className="p-3 bg-[#0D1017] border border-red-500/30 rounded-xl flex flex-col items-center w-16">
                  <span className="text-xl">⌛</span>
                  <span className="text-[8px] font-mono text-red-400 mt-1 uppercase">TIMEOUT</span>
                </div>
              )}

              <span className="text-xs font-mono text-muted">VS</span>

              {opponentChoice ? (
                <div className="p-3 bg-[#0D1017] border border-glass-border rounded-xl flex flex-col items-center w-16 select-text">
                  <span className="text-2xl">{CHOICE_DETAILS[opponentChoice].emoji}</span>
                  <span className="text-[8px] font-mono text-muted mt-1 uppercase">AI</span>
                </div>
              ) : (
                <div className="p-3 bg-[#0D1017] border border-glass-border rounded-xl flex flex-col items-center w-16">
                  <span className="text-2xl">🤖</span>
                  <span className="text-[8px] font-mono text-muted mt-1 uppercase">AI</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={startRound}
                className="px-3.5 py-1.5 bg-accent text-[#000000] hover:bg-accent-hover font-bold text-[10px] rounded transition-colors active:scale-95 cursor-pointer"
              >
                Throw Hand
              </button>
              <button
                onClick={resetMatch}
                className="px-3.5 py-1.5 border border-glass-border hover:bg-white/5 font-bold text-[10px] text-muted hover:text-text rounded transition-colors active:scale-95 cursor-pointer"
              >
                Reset Match
              </button>
            </div>
          </div>
        )}

        {status === "match_over" && (
          <div className="w-full text-center space-y-4 bg-[#0D1017]/40 p-4 rounded-xl border border-glass-border">
            <h4 className={`text-xs font-mono font-bold tracking-widest uppercase select-text px-4 py-2 border rounded-full inline-block ${
              resultMsg.includes("VICTORIOUS") ? "text-green-400 border-green-500/30" : "text-[#FF5F56] border-[#FF5F56]/30"
            }`}>
              {resultMsg}
            </h4>

            {/* Final Match Stats */}
            <div className="text-xs font-mono text-muted">
              Final Rounds Won: Player {matchScores.player} - {matchScores.opponent} AI
            </div>

            <button
              onClick={resetMatch}
              className="px-4 py-2 bg-accent text-[#000000] hover:bg-accent-hover font-bold text-xs rounded transition-colors active:scale-95 cursor-pointer"
            >
              Start New Match
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="border-t border-glass-border/40 pt-2 flex items-center justify-between text-[8px] font-mono text-muted select-none">
        <span>MATCH PROTOCOL: ACTIVE</span>
        <button
          onClick={resetMatch}
          className="hover:text-text flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-2.5 h-2.5" /> RESET MATCH
        </button>
      </div>

    </SpotlightCard>
  );
}
