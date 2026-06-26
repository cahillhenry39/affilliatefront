import confetti from "canvas-confetti";

export default function ConfettiBlast() {
  const handleConfitii = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return <button onClick={handleConfitii}>Withdraw with 🎉</button>;
}
