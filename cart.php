<?php 
    error_reporting(E_ALL);
    ini_set('display_errors', 'on');
    
    require 'dbconnect.php';
    
    $cart = (json_decode($_POST['cart_data'], true));
    $email_query = "SELECT * FROM customer WHERE email = \"{$_POST['email']}\""; 
    $exists = $mysqli->query($email_query);
    // print_r($exists);
    if ($exists->num_rows === 0){
    $insert_customer = "INSERT INTO customer (first_name, last_name, email)
        VALUES (\"{$_POST['first_name']}\", \"{$_POST['last_name']}\", \"{$_POST['email']}\")";
    $mysqli->query($insert_customer);
    $customer_id = $mysqli->insert_id;
    }else {
        $customer = $exists->fetch_assoc();
        $customer_id = $customer['id'];
    }
    // print_r($insert_customer);
    
    $insert_purchase = "INSERT INTO purchase (order_date, customer_id) VALUES (NOW(), {$customer_id})";
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
 

?>