// edukedo — gemeinsame Interaktionen für die Design-Vorlagen im /design-Ordner.
(function(){
  // Karteikarten: Klick dreht um
  document.querySelectorAll('.flip-card').forEach(function(card){
    card.addEventListener('click', function(){ card.classList.toggle('is-flipped'); });
  });

  // Multiple-Choice-Quiz: eine Option auswählen, Feedback einblenden
  document.querySelectorAll('[data-quiz="mc"]').forEach(function(group){
    var opts = group.querySelectorAll('.quiz-opt');
    var feedback = group.querySelector('.quiz-feedback');
    var answered = false;
    opts.forEach(function(opt){
      opt.addEventListener('click', function(){
        if (answered) return;
        answered = true;
        opts.forEach(function(o){
          if (o.dataset.correct === 'true') o.classList.add('is-correct');
          else if (o === opt) o.classList.add('is-wrong');
        });
        if (feedback){
          feedback.hidden = false;
          feedback.classList.add(opt.dataset.correct === 'true' ? 'is-correct' : 'is-wrong');
        }
      });
    });
  });

  // Zuordnung: zwei Elemente antippen -> als Paar zusammenfassen (vereinfachte Demo-Interaktion)
  document.querySelectorAll('[data-quiz="match"]').forEach(function(group){
    var items = group.querySelectorAll('.match-item');
    var selected = null;
    items.forEach(function(item){
      item.addEventListener('click', function(){
        if (item.classList.contains('is-selected')){
          item.classList.remove('is-selected');
          selected = null;
          return;
        }
        if (!selected){
          selected = item;
          item.classList.add('is-selected');
        }
      });
    });
  });

  // Konto löschen / Einwilligung widerrufen: Bestätigungsbereich ein-/ausblenden
  document.querySelectorAll('[data-toggle-target]').forEach(function(trigger){
    trigger.addEventListener('click', function(){
      var target = document.querySelector(trigger.dataset.toggleTarget);
      if (target) target.hidden = !target.hidden;
    });
  });
})();
