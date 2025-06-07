<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementById('bloques');
    var sortable = Sortable.create(el, {
      animation: 150,
      // Otras opciones según tus necesidades
    });
  });
</script>
#bloques {
  touch-action: pan-y;
}

.bloque {
  user-select: none;
  -webkit-user-drag: none;
  touch-action: manipulation;
}
