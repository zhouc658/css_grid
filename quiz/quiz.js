document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('next');
    const submitBtn = document.getElementById('submit');
  
    // For all question pages (q1–q7)
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentQuestion = document.querySelector('input[name^="q"]:checked');
        if (currentQuestion) {
          const name = currentQuestion.name;
          const value = currentQuestion.value;
          localStorage.setItem(name, value);
          // Go to next question
          const nextPage = nextBtn.getAttribute('data-next'); // You define where it goes
          window.location.href = nextPage;
        } else {
          alert("Please select an answer!");
        }
      });
    }
  
    // For final question page (q8)
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const selected = document.querySelector('input[name="q8"]:checked');
        if (!selected) {
          alert("Please answer the last question!");
          return;
        }
        localStorage.setItem('q8', selected.value);
  
        // Get all answers
        const q1 = localStorage.getItem('q1'); // price
        const answers = [
          localStorage.getItem('q2'),
          localStorage.getItem('q3'),
          localStorage.getItem('q4'),
          localStorage.getItem('q5'),
          localStorage.getItem('q6'),
          localStorage.getItem('q7'),
          localStorage.getItem('q8')
        ];
  
        // Count type preference
        let cute = 0, cool = 0, elegant = 0;
        answers.forEach(ans => {
          if (ans === 'cute') cute++;
          if (ans === 'cool') cool++;
          if (ans === 'elegant') elegant++;
        });
  //test
        let resultType = "";
        if (cute > cool && cute > elegant) resultType = "cute";
        else if (cool > cute && cool > elegant) resultType = "cool";
        else resultType = "elegant";
  
        // Final redirect
        if (resultType && q1) {
          window.location.href = `${resultType}${capitalize(q1)}.html`;
          localStorage.clear();
        } else {
          alert("Missing data.");
        }
      });
    }
  });
  
  // Capitalize helper for filename
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  