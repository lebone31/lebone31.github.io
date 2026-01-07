// Example: confetti on letter page
if (window.location.pathname.endsWith("letter.html")) {
  confetti({
    particleCount: 200,
    spread: 180,
    origin: { y: 0.6 }
  });
}

// You can add other shared JS logic here
