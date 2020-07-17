$(document).ready(function() {

  // FUNZIONE INVIO MESSAGGIO CON CLICK MOUSE
  $(document).on('click', '.message_send', function() {
    invioMessaggio();
  });

  // FUNZIONE INVIO MESSAGGIO CON TASTO INVIO TASTIERA
  $('.input_message').keypress(
    function() {
      if (event.which == 13 || event.keyCode == 13) {
        invioMessaggio();
      }
    }
  );
