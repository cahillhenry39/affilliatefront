import confetti from "canvas-confetti";

let confettiInstance = null;

export function getConfetti() {
  if (!confettiInstance) {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);
    confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
  }
  return confettiInstance;
}
