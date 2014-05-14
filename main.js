$(function () {
 
  var cart = {
    // add: function (target){
    //   cart[target].quantity++;
    // },

    // remove: function (target){
    //   cart[target].quantity--;
    // },

    // lineDel: function (target){
    //   cart[target].quantity = 0;
    // },

    // clear: function () {
    //   for (i in cart){
    //     cart[i].quantity = 0;
    //   }
    // },

    union_jack: {
      'name': 'Union Jack',
      'quantity': 0,
      'sku': 0001
    },
    hop_knot: {
      'name': 'Hop Knot',
      'quantity': 0,
      'sku': 0002
    },
    stone_ipa: {
      'name': 'Stone IPA',
      'quantity': 0,
      'sku': 0003
    },
    black_butte_porter: {
      'name': 'Black Butte Porter',
      'quantity': 0,
      'sku': 0004
    }
  }

  //draw the cart
  var renderCart = function () {
    $('.cart .items').empty();
      for (var i in cart) {
          if (cart[i].quantity != 0) {
            var button = $('<button class="del"><button class="decrement">');
            $(document.createElement('li')).attr('id',i)
              .text(cart[i].name + ':' + cart[i].quantity)
              .append(button)
              .appendTo('.cart .items');
            $('.del').text('X');
            $('.decrement').text('Remove 1');
      }        
    }
  }
  
  //draws the catalog
  var renderCatalog = function () {
    $('.catalog .items').empty();
    for (var i in cart) {
      var button = $('<button>');
      button.addClass('add')
        .text('Add');
      $(document.createElement('li')).addClass(i)
        .text(cart[i].name)
        .append(button)
        .appendTo('.catalog .items');
    }
  }

  renderCatalog();

  var addItems = function (target) {
    cart[target].quantity++;
  }

  var removeItems = function (target) {
    cart[target].quantity--;
  }

  var lineDel = function (target) {
    cart[target].quantity = 0;
  }

  var clearCart = function () {
    for (var i in cart){
      cart[i].quantity = 0;
    }
  }

  // var cartJSON = JSON.stringify(cart);
  //$.post('test.php', cartJSON);
  //when the add button is clicked
  $('li').on('click', '.add', function() { 
    var target = $(this).parent().attr('class')
    addItems(target);  

    renderCart();
     
  });

  //when the X button is clicked
  $('ul').on('click', '.del', function(){
    var target = $(this).parent().attr('id');
    // cart.lineDel(target);
    lineDel(target);
    renderCart();
  });

  //when the Remove 1 button is clicked
  $('ul').on('click', '.decrement', function(){
    var target = $(this).parent().attr('id');
    // cart.remove(target);
    removeItems(target);
    renderCart();
  });

  //empty cart completely
  $('.clear').click(function(){
    // cart.clear();
    clearCart();
    renderCart();
  });

  $('form button').click(function(){
    $('#cart_data').val(JSON.stringify(cart));
  });





























});