<!-- redeploy trigger -->
// Example: confetti on letter page
if (window.location.pathname.endsWith("letter.html")) {
  confetti({
    particleCount: 200,
    spread: 180,
    origin: { y: 0.6 }
  });
}

function startMic() {
  // Ask browser for microphone permission
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      // Microphone access granted
      const ctx = new AudioContext();
      const mic = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      mic.connect(analyser);
      analyser.fftSize = 256;
      const data = new Uint8Array(analyser.frequencyBinCount);

      function listen() {
        analyser.getByteFrequencyData(data);
        let volume = data.reduce((a, b) => a + b) / data.length;

        if (volume > 40) {
          // Successful blow
          launchBalloons(); // example reaction
          setTimeout(() => {
            document.getElementById("cakePage").classList.remove("active");
            document.getElementById("envelopePage").classList.add("active");
          }, 800);
        } else {
          requestAnimationFrame(listen);
        }
      }

      listen();

    })
    .catch(error => {
      // Permission denied or not supported
      alert("Mic permission denied or not supported — tap to continue!");
      // Show fallback button if you have one
      document.getElementById("micFallback").style.display = "block";
    });
}

function forceNext() {
  // Do exactly what you would after a successful blow
  launchBalloons();
  setTimeout(() => {
    document.getElementById("cakePage").classList.remove("active");
    document.getElementById("envelopePage").classList.add("active");
  }, 500);
}

function startMicOrFallback() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        alert("Microphone access granted! Blow into the mic!");
        // do your old mic logic here
      })
      .catch(err => {
        // mic not available or denied
        alert("Mic not supported or denied — tap the button to continue!");
        document.getElementById("blowFallbackBtn").style.display = "block";
      });
  } else {
    alert("Mic not supported — tap the button to continue!");
    document.getElementById("blowFallbackBtn").style.display = "block";
  }
}

function proceedAfterBlow() {
  // same effect as blowing
  document.getElementById("cakePage").classList.remove("active");
  document.getElementById("envelopePage").classList.add("active");
}
// You can add other shared JS logic here
