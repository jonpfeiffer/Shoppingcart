<?php 
 $cart = (json_decode($_POST['cart_data'], true));
 $insert_purchase = "INSERT INTO purchase (order_date) VALUES (NOW());";
 $mysqli->query($insert_purchase)
 $purchase_id = $mysqli->insert_id;

 // echo "Congratulations you have purchased:<br>";
 // foreach ($cart as $item) {
 //   if ($item['quantity'] != 0) {
 //    print_r($item['quantity']);
 //    echo ": ";
 //    print_r($item['name']);
 //    echo "<br>";
 //   }
 // }

?>