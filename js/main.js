// JS scripts placed here

const tarotDeck = [
      {
        name: 'The Fool',
        meaning: 'This card points to a fresh path. It suggests curiosity, openness, and the courage to step forward before every detail is known.',
        frontImage: './img/fool.svg',
        backImage: './img/back.svg',
      },
      {
        name: 'The High Priestess',
        meaning: 'This card asks you to slow down and listen more deeply. Some answers are felt before they are fully explained.',
        frontImage: './img/highpriestess.svg',
        backImage: './img/back.svg',
      },
      {
        name: 'The Empress',
        meaning: 'The Empress represents care, creativity, and abundance. It can suggest tending to what you want to grow with patience and warmth.',
        frontImage: './img/empress.svg',
        backImage: './img/back.svg',
      },
      {
        name: 'Death',
        meaning: 'This card represents endings, transformation, and renewal. It can suggest closing one chapter to begin another.',
        frontImage: './img/death.svg',
        backImage: './img/back.svg',
      }, 
     {
        name: 'The Lovers',
        meaning: 'This card represents connection, choice, and alignment. It can suggest forming meaningful bonds or making heartfelt decisions.',
        frontImage: './img/lovers.svg',
        backImage: './img/back.svg',
      },
    {
        name: 'Justice',
        meaning: 'Justice represents fairness, truth, and accountability. It can suggest weighing decisions carefully and acting with integrity.',
        frontImage: './img/justice.svg',
        backImage: './img/back.svg',
      },   
    ];

    const positions = ['Past', 'Present', 'Future'];

    const deckEl = document.getElementById('deck');
    const resetBtn = document.getElementById('resetBtn');
    const spreadEl = document.getElementById('spread');
    const stackZone = document.getElementById('stackZone');

    function shuffle(array) {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function createCardSlot(card, positionLabel, index) {
      const slot = document.createElement('article');
      slot.className = 'card-slot';
      slot.innerHTML = `
        <div class="card-title">${positionLabel}</div>
        <div class="tarot-card" data-index="${index}" tabindex="0" role="button" aria-label="Reveal ${card.name}">
          <div class="tarot-inner">
            <div class="card-face card-back">
                <img src="${card.backImage}">
            </div>
            <div class="card-face card-front">
              <img src="${card.frontImage}">
            </div>
          </div>
        </div>
        <div class="card-copy">
          <strong>${card.name}</strong>
          ${card.meaning}
        </div>
      `;

      const cardEl = slot.querySelector('.tarot-card');

      const activateCard = () => {
        slot.classList.add('show-copy');
        cardEl.classList.add('flipped');
      };

      const deactivateCard = () => {
        slot.classList.remove('show-copy');
        cardEl.classList.remove('flipped');
      };

      cardEl.addEventListener('mouseenter', activateCard);
      cardEl.addEventListener('mouseleave', deactivateCard);
      cardEl.addEventListener('click', () => {
        const isOpen = cardEl.classList.contains('flipped');
        document.querySelectorAll('.card-slot').forEach(other => {
          other.classList.remove('show-copy');
          const otherCard = other.querySelector('.tarot-card');
          if (otherCard) otherCard.classList.remove('flipped');
        });
        if (!isOpen) activateCard();
      });

      cardEl.addEventListener('focus', activateCard);
      cardEl.addEventListener('blur', deactivateCard);

      cardEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          cardEl.click();
        }
      });

      return slot;
    }

    function drawReading() {
      const selected = shuffle(tarotDeck).slice(0, 3);
      spreadEl.innerHTML = '';

      selected.forEach((card, index) => {
        spreadEl.appendChild(createCardSlot(card, positions[index], index));
      });

      stackZone.style.display = 'none';
      spreadEl.classList.add('active');
    }

    function resetReading() {
      spreadEl.innerHTML = '';
      spreadEl.classList.remove('active');
      stackZone.style.display = 'grid';
    }

    deckEl.addEventListener('click', drawReading);
    // drawBtn.addEventListener('click', drawReading);
    resetBtn.addEventListener('click', resetReading);

    deckEl.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        drawReading();
      }
    });