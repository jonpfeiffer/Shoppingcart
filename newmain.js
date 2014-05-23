$(function(){


//Model
/**********************************************************/
  var cart = {};
  var catalog = {};
  var categories = [];

  var makeCatalog = function(cat) {
    if (cat == undefined | cat == 'All' | cat == 'all') {
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
    renderCatalog(catalog);
  }

  //snapshot the cart
  var getCartData = function() {
    $('#cart_data').val(JSON.stringify(cart));

  }

//View
/**********************************************************/
  var fillCategories = function() {
    for (i in categories){
      $(document.createElement("option")).attr('value', categories[i])
        .text(categories[i])
        .appendTo('select');
    }
  }
  
  var renderCart = function() {
    $('.cart .items').empty();
    var templateScript = $('#cart-media-object').html();
      var cartTemplate = Handlebars.compile(templateScript);
      $('.cart .items').append(cartTemplate(cart));
  } 


  //draws the catalog WITH Handlebars
  var renderCatalog = function(catalog) {
      $('.catalog .items').empty();
      var template = $('#catalog-media-object').html();
      var catalogTemplate = Handlebars.compile(template);
      $('.catalog .items').append(catalogTemplate(catalog));
  }


//View Helpers
/*********************************************************/
  //make an array of product categories
  var getCategories = function(){
    for (var i in catalog){
      categories.push(catalog[i].category);

    }
    categories = unique(categories);
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



//Controllers
/**********************************************************/
//Event Handlers
/**********************************************************/

  //when the add button is clicked
  $('body').on('click', '.add', function() { 
    var target = $(this).parents('li').attr('class')
    addItems(target);  
    renderCart();
  });

  //when the X button is clicked
  $('ul').on('click', '.del', function(){
    var target = $(this).parents('li').attr('id');
    lineDel(target);
    renderCart();
  });

  //when the Remove 1 button is clicked
  $('ul').on('click', '.decrement', function(){
    var target = $(this).parents('li').attr('id');
    removeItems(target);
    renderCart();
  });

  //empty cart button
  $('.clear').click(function(){
    clearCart();
    renderCart();
  });

  //when category is changed pass selected category to model and render
  $('#categorySelect').change(function() { 
    makeCatalog(getSelectedCategory());
    // renderCatalog();
  });

  //submit cart JSON for processing
  $('form button').click(function(){
    getCartData();
  });

/*********************************************/
//Model Manipulation

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

//On initial load
  makeCatalog();
  getCategories();
  fillCategories();
});
