// Audio feedback
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export function playSound(type = 'correct') {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  if (type === 'correct') {
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } else {
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  }
}

// Visual feedback
export function addFeedbackAnimation(element, type = 'correct') {
  element.classList.add(type === 'correct' ? 'pop-effect' : 'shake-effect');
  element.addEventListener('animationend', () => {
    element.classList.remove('pop-effect', 'shake-effect');
  }, { once: true });
}

// Export a feedback function that combines both
export function showFeedback(element, isCorrect) {
  playSound(isCorrect ? 'correct' : 'incorrect');
  addFeedbackAnimation(element, isCorrect ? 'correct' : 'incorrect');
}
