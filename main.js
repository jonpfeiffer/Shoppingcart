$(function () {
 
  var cart = {};
  var catalog = {};
  var categories = [];
  var uniqueCategories = [];


  //draw the cart NEW handlebars
  var renderCart = function() {
    $('.cart .items').empty();
    var templateScript = $('#cart-media-object').html();
      var cartTemplate = Handlebars.compile(templateScript);
      $('.cart .items').append(cartTemplate(cart));
  } 
  //draw the cart OLD
  // var renderCart = function () {
  //   $('.cart .items').empty();
  //     for (var i in cart) {
  //         if (cart[i].quantity != 0) {
  //           var button = $('<button class="del"><button class="decrement">');
  //           $(document.createElement('li')).attr('id',i)
  //             .text(cart[i].name + ':' + cart[i].quantity)
  //             .append(button)
  //             .appendTo('.cart .items');
  //           $('.del').text('X');
  //           $('.decrement').text('Remove 1');
  //     }
  //   }
  // }
  
 
  var makeCatalog = function(cat) {
    catalog = {};
    if (cat == undefined | cat == 'All') {
      for (var i in default_products){
        var inside = default_products[i];
        var sku = inside.sku;
        catalog[sku] = {
          name: inside.name,
          price: inside.price,
          description: inside.description,
          category: inside.category,
          thumbnail: inside.thumbnail,
          available: inside.quantity
        };
      }
    }else {
      for (var i in default_products){
        if (default_products[i].category == cat){
          var inside = default_products[i];
          var sku = inside.sku;
          catalog[sku] = {
            name: inside.name,
            price: inside.price,
            description: inside.description,
            category: inside.category,
            thumbnail: inside.thumbnail,
            available: inside.quantity
          };
        }
      }
    }
  }

  var fillCategories = function() {
    for (i in uniqueCategories){
      $(document.createElement("option")).attr('value', uniqueCategories[i])
        .text(uniqueCategories[i])
        .appendTo('select');
    }
  }
  //draws the catalog WITH Handlebars
  var renderCatalog = function() {
      $('.catalog .items').empty();
      var template = $('#catalog-media-object').html();
      var catalogTemplate = Handlebars.compile(template);
      $('.catalog .items').append(catalogTemplate(catalog));
  }

  var addItems = function(target) {
    if (cart[target]){
      cart[target].quantity++;
    } else {
      cart[target] = {
        name: catalog[target].name,
        description: catalog[target].description,
        price: catalog[target].price,
        thumbnail: catalog[target].thumbnail,
        quantity: 1

      }
    }
  }

  var removeItems = function(target) {
    if (cart[target].quantity > 1) {
      cart[target].quantity--;
    }else {
      cart[target].quantity = 0;
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

  //make an array of product categories
  var getCategories = function(){
    for (var i in catalog){
      categories.push(catalog[i].category);

    }
    uniqueCategories = unique(categories);
  }

  var getSelectedCategory = function() {
    var list = document.getElementById("categorySelect");
    return list.options[list.selectedIndex].text;
  }

  //removes duplicates from array
  function unique(arr) {
  var i,
      len = arr.length,
      out = [],
      obj = { };

  for (i = 0; i < len; i++) {
      obj[arr[i]] = 0;
  }
  for (i in obj) {
      out.push(i);
  }
  return out;
  }

  makeCatalog();
  getCategories();
  fillCategories();
  renderCatalog();

  //when the add button is clicked
  $('li').on('click', '.add', function() { 
    var target = $(this).parents('li').attr('class')
    addItems(target);  

    renderCart();
     
  });

  //when the X button is clicked
  $('ul').on('click', '.del', function(){
    var target = $(this).parents('li').attr('id');
    // cart.lineDel(target);
    lineDel(target);
    renderCart();
  });

  //when the Remove 1 button is clicked
  $('ul').on('click', '.decrement', function(){
    var target = $(this).parents('li').attr('id');
    // var targetId = target.parents().attr('id');
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

  //when category is changed
  $('#categorySelect').change(function() { 
    makeCatalog(getSelectedCategory());
    renderCatalog();
  });

  //submit cart for processing
  $('form button').click(function(){
    $('#cart_data').val(JSON.stringify(cart));
  });




























});