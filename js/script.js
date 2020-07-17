$(document).ready(function() {

  // invio messaggio con mouse
  $(document).on('click', '.message_send', function() {
    invioMessaggio();
  });

  // invio messaggio con tasto da tastiera
  $('.input_message').keypress(
    function() {
      if (event.which == 13 || event.keyCode == 13) {
        invioMessaggio();
      }
    }
  );

  // MENU TENDINA OPZIONI
  var visible = false;
  $(document).on('click', '.message__icon', function() {
    if (visible == false) {
      $(this).find('.message_menu').fadeIn();
      visible = true;
    } else {
      $(this).find('.message_menu').fadeOut();
      visible = false;
    }
  });

  // rimuovere i messaggi
  $(document).on('click', '.delete-message', function() {
    $(this).parent().parent().parent().remove();
  });

  // ricerca utenti
  $(".search-bar__input").keydown(function() {
    var inputRicerca = $(this).val().toLowerCase();
    $(".conversation").each(function() {
      var nomiConversazioni = $(this).find(".title__name").text().toLowerCase();
      if (nomiConversazioni.includes(inputRicerca)) {
        $(this).fadeIn();
      } else {
        $(this).fadeOut();
      }
    });
  });


  // COLLEGARE CONTATTO  ALLA CHAT
  $('.convers').removeClass('active');
  $('.right-messages').removeClass('active');
  $(document).on('click', '.conversation', function() {
    var dataChat = $(this).attr('data-chat');
    $('.splash').addClass('display-none');
    if ($('.conversation').hasClass("active") == true) {
      $('.conversation').removeClass('active');
      $('.right-messages').removeClass('active');
      $('.convers').removeClass('active');
    }
    $(this).addClass('active');
    $('.right-messages[data-chat="' + dataChat + '"]').addClass('active');
    $('.convers[data-chat="' + dataChat + '"]').addClass('active');
  });

});

// cambio di icona invio
$(".input_message").focus(function() {
  $(".invio").addClass("display-none");
  $(".audio").removeClass("display-none");
}).blur(function() {
  $(".audio").addClass("display-none");
  $(".invio").removeClass("display-none");
});


// funzioni
function invioMessaggio() {
  var testoInput = $('.input_message').val();
  if (testoInput.length != 0) {
    var messaggioClonato = $('#remove').clone();
    messaggioClonato.find('.message_text').text(testoInput);
    messaggioClonato.find('.message_time').text(orario());
    $('.right-messages.active').append(messaggioClonato);
    $('.container-message .template_me').removeClass('display-none');
    $('.input_message').val("");
    scrollbar();
    $(".convers.active").find('.left__status__last-access').text("Sta scrivendo... ");

    //messaggi di risposta
    setTimeout(function() {
      var frasiBot = [
        "Tutto bene. Tu?",
        "Praticamente oggi giornata piena senza sosta!",
        "Dobbiamo organizzazre una sera di queste",
        "Bene, allora domani lavoriamo insieme",
        "Comunque questo sabato ci vediamo per una pizza se ci sei",
        "Ti devo passare un gioco bellissimo",
        "Ci vediamo prima delle vacanze?",
        "Di questa settimana sono libero venerdì sera",
        "Non saprei",
        "Allora ci sentiamo e ci organizziamo",
      ];
      var messaggioRisposta2 = $('.template-user').children().clone();
      messaggioRisposta2.find('.message_time').text(orario());
      messaggioRisposta2.find('.message_text').text(frasiBot[numeroRandom(0, 9)]);
      $('.right-messages.active').append(messaggioRisposta2);
      $('.container-message .message__user').removeClass('display-none');

      $(".convers.active").find('.left__status__last-access').text("ultimo accesso oggi alle " + orario());
      $(".conversation.active").find('.time__last_message').text(orario());
      scrollbar();
    }, 1200);

    if ($('.conversation').hasClass("active") == true) {
      var conversazioneClonata = $('.conversation.active');
      $('.left__conversations').prepend(conversazioneClonata);
    }
  }
}

function orario() {
  var data = new Date();
  var ora = data.getHours();
  if (ora < 10) {
    ora = "0" + ora;
  }
  var minuti = data.getMinutes();
  if (minuti < 10) {
    minuti = "0" + minuti;
  }
  return ora + ":" + minuti
}

// per frasi random
function numeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scrollbar() {
  var altezzaContainer = $(".right-messages.active").height();
  console.log("altezza" + altezzaContainer);
  $(".container-message").scrollTop(altezzaContainer);
}
