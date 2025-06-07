// ================== EJERCICIO 1: ORDENAR DIÁLOGO ================== //
const dialogosCorrectos = [
  {
    id: 1,
    texto: `
<strong>Interviewer:</strong> Good morning, Lourdes. Thank you for coming in today. Could you tell us a little about yourself and why you’re interested in this position?<br><br>
<strong>Lourdes:</strong> Good morning, and thank you for the opportunity. I’m an advanced student in the Mathematics Teaching Program at CFE, and I also have a background in engineering. I’m passionate about teaching, especially at the lower secondary level, and I believe this role would be a great opportunity to apply what I’ve learned, continue growing professionally, and support both teachers and students in a meaningful way.
`
  },
  {
    id: 2,
    texto: `
<strong>Interviewer:</strong> What experience do you have working with teenagers?<br><br>
<strong>Lourdes:</strong> I’ve taught private math lessons to high school students from 1st to 6th year, which gave me insight into different learning styles. I also participated in a school support workshop organized by a local NGO, where I worked with students who had learning difficulties. These experiences helped me adapt materials, use digital tools creatively, and create a supportive environment for students.
`
  },
  {
    id: 3,
    texto: `
<strong>Interviewer:</strong> This role includes supporting the lead teacher and helping with lesson planning. How do you feel about working in a team?<br><br>
<strong>Lourdes:</strong> I really enjoy working in teams. I think we grow a lot through collaboration. I’m used to sharing ideas, receiving feedback, and adjusting activities to meet student needs. I see teamwork as essential in education.
`
  },
  {
    id: 4,
    texto: `
<strong>Interviewer:</strong> What would you do if a student feels frustrated because they don’t understand a math problem?<br><br>
<strong>Lourdes:</strong> I’d first help the student calm down and remind them that making mistakes is part of learning. Then I’d try a different approach—maybe using visuals, games, or real-life examples. It’s important to keep the student motivated, and I believe that patience and empathy go a long way.
`
  },
  {
    id: 5,
    texto: `
<strong>Interviewer:</strong> Finally, what do you hope to gain from this experience?<br><br>
<strong>Lourdes:</strong> I hope to grow as a professional, gain real classroom experience, and improve my teaching strategies. I’m also excited to learn from experienced teachers and get to know the pedagogical approach of Horizon Private School, which I admire for its commitment to student support and innovation.
`
  }
];

function mezclar(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderizarDialogos() {
  const contenedor = document.getElementById('dialogos');
  contenedor.innerHTML = '';
  const mezclados = mezclar(dialogosCorrectos);
  mezclados.forEach(bloque => {
    const div = document.createElement('div');
    div.className = 'bloque';
    div.draggable = true;
    div.dataset.id = bloque.id;
    div.innerHTML = bloque.texto;
    contenedor.appendChild(div);
  });
  agregarDragAndDrop();
}

function agregarDragAndDrop() {
  const bloques = document.querySelectorAll('.bloque');
  let bloqueArrastrado = null;

  bloques.forEach(bloque => {
    bloque.addEventListener('dragstart', (e) => {
      bloqueArrastrado = bloque;
      bloque.classList.add('dragging');
    });

    bloque.addEventListener('dragend', (e) => {
      bloqueArrastrado = null;
      bloque.classList.remove('dragging');
      bloques.forEach(b => b.classList.remove('over'));
    });

    bloque.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    bloque.addEventListener('dragenter', (e) => {
      if (bloque !== bloqueArrastrado) {
        bloque.classList.add('over');
      }
    });

    bloque.addEventListener('dragleave', (e) => {
      bloque.classList.remove('over');
    });

    bloque.addEventListener('drop', (e) => {
      e.preventDefault();
      if (bloque !== bloqueArrastrado) {
        const contenedor = document.getElementById('dialogos');
        let bloquesActuales = Array.from(contenedor.children);
        let arrastradoIdx = bloquesActuales.indexOf(bloqueArrastrado);
        let objetivoIdx = bloquesActuales.indexOf(bloque);
        if (arrastradoIdx < objetivoIdx) {
          contenedor.insertBefore(bloqueArrastrado, bloque.nextSibling);
        } else {
          contenedor.insertBefore(bloqueArrastrado, bloque);
        }
      }
      bloque.classList.remove('over');
    });
  });
}

// MODAL: mostrar y ocultar
function showCongrats() {
  document.getElementById('congrats-modal').classList.add('active');
}
function hideCongrats() {
  document.getElementById('congrats-modal').classList.remove('active');
}

// Feedback visual y textual
function revisarDialogo() {
  const bloques = document.querySelectorAll('.bloque');
  let correcto = true;
  bloques.forEach((bloque, idx) => {
    bloque.classList.remove('correcto', 'incorrecto');
    if (parseInt(bloque.dataset.id, 10) === dialogosCorrectos[idx].id) {
      bloque.classList.add('correcto');
    } else {
      bloque.classList.add('incorrecto');
      correcto = false;
    }
  });
  const resultado = document.getElementById('resultado');
  if (correcto) {
    resultado.textContent = '¡Correcto! Has ordenado el diálogo correctamente.';
    resultado.style.color = '#34a853';
    showCongrats();
  } else {
    resultado.textContent = 'El orden no es correcto. Los bloques en rojo están mal ubicados. Intenta de nuevo.';
    resultado.style.color = '#ea4335';
  }
}

function reiniciarDialogo() {
  renderizarDialogos();
  document.getElementById('resultado').textContent = '';
}

// ================== EJERCICIO 2: FILL IN THE BLANKS ================== //

const fillTextTemplate = `
<b>JOB OPENING</b><br>
<b><span class="blank" data-answer="MATHEMATICS"></span> TEACHING ASSISTANT</b><br>
Institution: <span class="blank" data-answer="Horizon Private School"></span><br>
Location: <span class="blank" data-answer="Paysandú, Uruguay"></span><br>
Type: <span class="blank" data-answer="Part-time, On-site"></span><br>
Level: <span class="blank" data-answer="Lower Secondary (Grades 7-9)"></span><br>
Responsibilities:<br>
- Assist the lead teacher in <span class="blank" data-answer="lower secondary classes"></span> <br>
- Help students with <span class="blank" data-answer="learning difficulties"></span><br>
- Contribute to planning and review of <span class="blank" data-answer="exercises"></span><br>
- Attend <span class="blank" data-answer="pedagogical meetings"></span> and school initiatives.<br>
- Foster interest in mathematics through participatory <span class="blank" data-answer="dynamics"></span>.<br>
`;

const palabras = [
  "Horizon Private School", "Paysandú, Uruguay", "Part-time, On-site", "Lower Secondary (Grades 7-9)", 
  "lower secondary classes", "learning difficulties", "exercises", "pedagogical meetings", "dynamics", "MATHEMATICS"
];

// Mezclar palabras
function mezclarPalabras(arr) {
  let a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Renderizar fill in the blanks
function renderizarFillBlanks() {
  document.getElementById('fill-blanks-text').innerHTML = fillTextTemplate;
  const bank = document.getElementById('words-bank');
  bank.innerHTML = '';
  mezclarPalabras(palabras).forEach(word => {
    const span = document.createElement('span');
    span.textContent = word;
    span.className = 'word';
    span.draggable = true;
    span.style.visibility = 'visible';
    bank.appendChild(span);
  });
  agregarDragAndDropBlanks();
  document.getElementById('feedback-blanks').textContent = '';
}

function agregarDragAndDropBlanks() {
  let palabraArrastrada = null;

  document.querySelectorAll('.word').forEach(word => {
    word.addEventListener('dragstart', (e) => {
      palabraArrastrada = word;
      word.classList.add('dragging');
    });
    word.addEventListener('dragend', (e) => {
      palabraArrastrada = null;
      word.classList.remove('dragging');
    });
  });
  document.querySelectorAll('.blank').forEach(blank => {
    blank.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    blank.addEventListener('dragenter', (e) => {
      blank.classList.add('over');
    });
    blank.addEventListener('dragleave', (e) => {
      blank.classList.remove('over');
    });
    blank.addEventListener('drop', (e) => {
      e.preventDefault();
      if (palabraArrastrada) {
        // Devolver palabra anterior al banco si hay una palabra colocada
        let textoAnterior = blank.textContent;
        if (textoAnterior && textoAnterior.trim() !== "") {
          document.querySelectorAll('.word').forEach(word => {
            if (word.textContent === textoAnterior) word.style.visibility = 'visible';
          });
        }
        blank.textContent = palabraArrastrada.textContent;
        blank.classList.add('filled');
        blank.classList.remove('incorrect');
        palabraArrastrada.style.visibility = 'hidden';
      }
      blank.classList.remove('over');
    });
    // Permitir doble click para limpiar el espacio y devolver la palabra al banco
    blank.addEventListener('dblclick', (e) => {
      let text = blank.textContent;
      document.querySelectorAll('.word').forEach(word => {
        if (word.textContent === text) word.style.visibility = 'visible';
      });
      blank.textContent = '';
      blank.classList.remove('filled', 'incorrect');
    });
  });
}

function comprobarBlanks() {
  let correctas = 0, total = 0;
  document.querySelectorAll('.blank').forEach(blank => {
    total++;
    blank.classList.remove('incorrect');
    if (blank.textContent.trim() === blank.getAttribute('data-answer')) {
      blank.classList.add('filled');
    } else {
      blank.classList.add('incorrect');
      blank.classList.remove('filled');
    }
    if (blank.classList.contains('filled')) correctas++;
  });
  let feedback = document.getElementById('feedback-blanks');
  if (correctas === total) {
    feedback.textContent = '¡Correcto! Has completado la oferta de trabajo con éxito.';
    feedback.style.color = '#34a853';
    showCongrats();
  } else {
    feedback.textContent = 'Aún hay errores. Los espacios en rojo están incorrectos.';
    feedback.style.color = '#ea4335';
  }
}

// NUEVA FUNCIÓN PARA REINICIAR EL EJERCICIO 2
function reiniciarBlanks() {
  renderizarFillBlanks(); // Vuelve a mostrar los espacios vacíos y las palabras mezcladas
}

// MODAL: cerrar tocando la X o fuera del modal
document.addEventListener('DOMContentLoaded', () => {
  renderizarDialogos();
  renderizarFillBlanks();
  document.getElementById('comprobar').onclick = revisarDialogo;
  document.getElementById('reiniciar').onclick = reiniciarDialogo;
  document.getElementById('comprobar-blanks').onclick = comprobarBlanks;
  document.getElementById('reiniciar-blanks').onclick = reiniciarBlanks;
  document.getElementById('close-modal').onclick = hideCongrats;
  document.getElementById('congrats-modal').onclick = function(e) {
    if (e.target === this) hideCongrats();
  };
});