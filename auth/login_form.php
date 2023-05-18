<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
@include '../config/config.php';

if (isset($_POST['submit'])) {
   if (isset($_POST['email'])) {
      $name = mysqli_real_escape_string($conn, $_POST['email']);
   }
   if (isset($_POST['password'])) {
      $password = md5($_POST['password']);
   }
   $select = "SELECT * FROM user_form WHERE name = '$name' && password = '$password'";
   $result = mysqli_query($conn, $select);

   if ($result && mysqli_num_rows($result) > 0) {
      $error = 'sc!';
      exit();
   } else {
      $error = 'Sai tài khoản hoặc mật khẩu!';
   }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Đăng nhập đăng ký</title>
   <link rel="stylesheet" href="/web/css/style1.css">
</head>

<body>

   <div class="form-container">
      <form action="" method="post">
         <h3>Đăng nhập</h3>
         <?php
         if (isset($error)) {
            echo '<span class="error-msg">' . $error . '</span>';
         }
         ?>
         <input type="text" name="email" required placeholder="Enter your username">
         <input type="password" name="password" required placeholder="Enter your password">
         <input type="submit" name="submit" value="Login now" class="form-btn">
         <p>Chưa có tài khoản? <a href="">Đăng ký</a></p>
      </form>
   </div>

</body>

</html>