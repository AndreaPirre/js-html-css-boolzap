// ricerca utente 
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
