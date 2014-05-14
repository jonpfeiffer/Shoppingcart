$(function () {
 
  var cart = {};
  var catalog = {};

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
  
 
  var makeCatalog = function() {
    for (var i in default_products){
      var inside = default_products[i];
      var sku = inside.sku;
      catalog[sku] = {
        name: inside.name,
        price: inside.price,
        description: inside.description,
        category: inside.category
      };
    }
  }
  //draws the catalog
  var renderCatalog = function() {
    $('.catalog .items').empty();
    for (var i in catalog) {
      var button = $('<button>');
      button.addClass('add')
        .text('Add');
      $(document.createElement('li')).addClass(i)
        .text(catalog[i].name)
        .append("<br>")
        .append(button)
        .appendTo('.catalog .items');
    }
  }
  makeCatalog();
  renderCatalog();

  var addItems = function(target) {
    if (cart[target]){
      cart[target].quantity++;
    } else {
      cart[target] = {
        name: catalog[target].name,
        quantity: 1

      }
    }
  }

  var removeItems = function(target) {
    if (cart[target].quantity > 0) {
      cart[target].quantity--;
    }else {
      delete cart[target];
    }
  }


  var lineDel = function(target) {
    cart[target].quantity = 0;
    delete cart[target];
  }

  var clearCart = function() {
    for (var i in cart){
      cart[i].quantity = 0;
      delete cart[i];
    }
  }

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