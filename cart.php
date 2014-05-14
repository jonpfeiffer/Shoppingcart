<?php 
 $cart = (json_decode($_POST['cart_data'], true));
 echo "Congratulations you have purchased:<br>";
 foreach ($cart as $item) {
   if ($item['quantity'] != 0) {
    print_r($item['quantity']);
    echo ": ";
    print_r($item['name']);
    echo "<br>";
   }
 }

?>