<?php 
  error_reporting(E_ALL);
  ini_set('display_errors', 'on');
  require 'dbconnect.php';
 
  $results = $mysqli->query("SELECT * FROM item");
  $products = "";
  while($row = $results->fetch_assoc()){
    $products .= "{sku: \"{$row['sku']}\", name: \"{$row['name']}\", description: \"{$row['description']}\", category: \"{$row['category']}\", 
    price: \"{$row['price']}\",thumbnail: \"{$row['thumbnail']}\"},";
  }
  $products = "[$products];";
 ?>


<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Shopping Cart</title>
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.2/handlebars.min.js"></script>
  <script type="text/javascript">var default_products = <?php echo $products ?> </script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="main-content">
    <div class="catalog">
      <h3>Catalog Items</h3>
      <select id="categorySelect">
          <option value="all" selected="selected">All</option>
      </select>
      <ul class="items"></ul>
    </div>
    
    <div class="cart">
      <h3>Your Cart</h3>
      <ul class="items"></ul>
      <button class="clear">Clear Cart Contents</button>
    </div>
  </div>
    <footer>
      <form action="cart.php" method="POST">
        <p>
          <span>First Name</span>
          <input type="text" name="first_name">
        </p>
        <p>
          <span>Last Name</span>
          <input type="text" name="last_name">
        </p>
        <p>
          <span>Email</span>
          <input type="text" name="email">
        </p>
        <p>
          <span>Credit Card</span>
          <input type="text" name="ccnumber">
        </p>
          <input type="hidden" name="cart_data" id="cart_data">
        <button type="submit">Checkout Now!</button>
    </form>
    </footer>

<script id="cart-media-object" type="text/x-handlebars-template">
    {{#each this}}
    <li id="{{@key}}">
      <div class="outer">
        <img src="{{thumbnail}}">
        <div class="content">
          <h4>{{name}} x {{quantity}}</h4>
          <p>price: ${{price}}</p>
          <button class="del">X</button>
          <button class="decrement">Remove 1</button>
        </div>
      </div>
      {{/each}}
</script>

<script id="catalog-media-object" type="text/x-handlebars-template">
  {{#each this}}
    <li class="{{@key}}">
      <div class="outer">
        <img src="{{thumbnail}}">
        <div class="content">
          <h3>{{name}}</h3>
          <p>
          {{description}} 
          </p>
          <p>${{price}}</p>
          <button class="add">Add</button>
        </div>
      </div>
  {{/each}}
</script>


<script src="newmain.js"></script>
</body>
</html>