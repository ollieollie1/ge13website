document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.style.display = "none";
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const bsOffcanvas = bootstrap.Offcanvas.getInstance(
    document.getElementById("offcanvasNavbar"),
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    });
  });

  // Smooth
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 72,
          behavior: "smooth",
        });
      }
    });
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");

  function highlightNavItem() {
    let scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavItem);
  highlightNavItem(); // Initial check

  // Interactive charge visualization
  const positiveCharges = document.querySelectorAll(".charge.positive");
  const negativeCharges = document.querySelectorAll(".charge.negative");

  // pulse animation to charges on hover
  function addChargeInteraction(charges) {
    charges.forEach((charge) => {
      charge.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1)";
        this.style.boxShadow = this.classList.contains("positive")
          ? "0 0 20px rgba(220, 38, 38, 0.5)"
          : "0 0 20px rgba(37, 99, 235, 0.5)";
        this.style.transition = "all 0.3s ease";
      });

      charge.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
        this.style.boxShadow = this.classList.contains("positive")
          ? "0 4px 8px rgba(220, 38, 38, 0.2)"
          : "0 4px 8px rgba(37, 99, 235, 0.2)";
      });
    });
  }

  addChargeInteraction(positiveCharges);
  addChargeInteraction(negativeCharges);

  // Coulomb's Law Calculator
  const coulombCalculator = document.getElementById('coulombCalculator');
  const resultDiv = document.getElementById('result');
  const forceValue = document.getElementById('forceValue');
  const forceDirection = document.getElementById('forceDirection');

  coulombCalculator.addEventListener('submit', function(e) {
    e.preventDefault();

    const charge1 = parseFloat(document.getElementById('charge1').value);
    const charge2 = parseFloat(document.getElementById('charge2').value);
    const distance = parseFloat(document.getElementById('distance').value);

    // Coulomb's constant
    const k = 8.99e9;

    // force magnitude
    const forceMagnitude = Math.abs((k * charge1 * charge2) / (distance * distance));

    // force direction
    const forceType = (charge1 * charge2) > 0 ? 'repulsive' : 'attractive';

    //results
    forceValue.textContent = `Force Magnitude: ${forceMagnitude.toExponential(3)} N`;
    forceDirection.textContent = `The force is ${forceType} (${forceType === 'attractive' ? 'charges attract' : 'charges repel'})`;
    resultDiv.style.display = 'block';
  });

  // interactivity to attraction and repulsion diagrams
  const attractionArrow = document.querySelector(".attraction-arrow");
  const repulsionArrow = document.querySelector(".repulsion-arrow");

  if (attractionArrow) {
    attractionArrow.addEventListener("click", function () {
      const charges = this.parentElement.querySelectorAll(".mini-charge");

      // Animate charges to move closer
      charges[0].style.transition = "transform 0.5s ease";
      charges[1].style.transition = "transform 0.5s ease";

      charges[0].style.transform = "translateX(10px)";
      charges[1].style.transform = "translateX(-10px)";

      setTimeout(() => {
        charges[0].style.transform = "translateX(0)";
        charges[1].style.transform = "translateX(0)";
      }, 800);
    });
  }

  if (repulsionArrow) {
    repulsionArrow.addEventListener("click", function () {
      const charges = this.parentElement.querySelectorAll(".mini-charge");

      // Animate charges to move apart
      charges[0].style.transition = "transform 0.5s ease";
      charges[1].style.transition = "transform 0.5s ease";

      charges[0].style.transform = "translateX(-10px)";
      charges[1].style.transform = "translateX(10px)";

      setTimeout(() => {
        charges[0].style.transform = "translateX(0)";
        charges[1].style.transform = "translateX(0)";
      }, 800);
    });
  }

  const quizData = [
    {
      question: "What is the unit of electric charge?",
      answers: ["Ampere", "Coulomb", "Newton", "Ohm"],
      correct: "Coulomb"
    },
    {
      question: "What does Coulomb's Law calculate?",
      answers: ["Electric current", "Magnetic field", "Electric force", "Voltage"],
      correct: "Electric force"
    },
    {
      question: "Which charges attract each other?",
      answers: ["Like charges", "Positive charges", "Opposite charges", "Negative charges"],
      correct: "Opposite charges"
    },
    {
      question: "What happens when two positive charges are near each other?",
      answers: ["They attract", "They repel", "They cancel out", "Nothing"],
      correct: "They repel"
    },
    {
      question: "Who Formulated the Coulomb's law",
      answers: ["Charles Augustin De Coulomb", "Michael Faraday", "James Clerk Maxwell", "Benjamin Franklin"],
      correct: "Charles Augustin De Coulomb"
    }
  ];
  
  let shuffledQuestions = [];
  let currentQuestion = 0;
  let score = 0;
  
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function startQuiz() {
    shuffledQuestions = shuffleArray([...quizData]);
    currentQuestion = 0;
    score = 0;
  
    document.getElementById("result-box").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
  
    showQuestion();
  }
  
  function showQuestion() {
    const question = shuffledQuestions[currentQuestion];
    const questionBox = document.getElementById("question-box");
    const answersBox = document.getElementById("answers-box");
  
    questionBox.textContent = question.question;
    answersBox.innerHTML = "";
  
    question.answers.forEach((answer) => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.className = "btn btn-outline-primary";
      btn.onclick = () => {
        if (answer === question.correct) score++;
        nextQuestion();
      };
      answersBox.appendChild(btn);
    });
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    document.getElementById("question-box").textContent = "";
    document.getElementById("answers-box").innerHTML = "";
    document.getElementById("result-box").style.display = "block";
    document.getElementById("score").textContent = `You scored ${score} out of ${shuffledQuestions.length}!`;
  }
  
  // Enable retry
  document.getElementById("retryBtn").addEventListener("click", startQuiz);
  
  // Start initially
  startQuiz();
});
