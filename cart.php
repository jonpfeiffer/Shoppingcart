<?php 
 error_reporting(E_ALL);
 ini_set('display_errors', 'on');
 
 require 'dbconnect.php';
 $cart = (json_decode($_POST['cart_data'], true));
 $insert_purchase = "INSERT INTO purchase (order_date) VALUES (NOW())";
 $mysqli->query($insert_purchase);
 $purchase_id = $mysqli->insert_id;

foreach ($cart as $key=>$item) {
 // echo "$key <br>";
 $get_product = "SELECT * FROM item WHERE sku = $key";
 $product_results = $mysqli->query($get_product);
 $product = $product_results->fetch_assoc();
 print_r($product['id']);

 $insert_line_item = "INSERT INTO line_item (product_id, quantity, purchase_id) 
    VALUES ({$product['id']}, {$item['quantity']}, {$purchase_id})";
 $mysqli->query($insert_line_item);
}
 // echo "$purchase_id";
 // var_dump($cart);

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