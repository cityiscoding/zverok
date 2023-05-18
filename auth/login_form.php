<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include '../config/config.php';

$error = '';

if (isset($_POST['login'])) {
   if (isset($_POST['username'])) {
      $name = mysqli_real_escape_string($conn, $_POST['username']);
   }
   if (isset($_POST['password'])) {
      $password = mysqli_real_escape_string($conn, $_POST['password']);
   }
   $select = "SELECT * FROM user_form WHERE name = '$name' AND password = '$password'";
   $result = mysqli_query($conn, $select);

   if ($result && mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
      $_SESSION['username'] = $row['name'];
      header('Location: ../pages/dashboard.php'); // Điều hướng đến trang chào mừng sau khi đăng nhập thành công
      exit();
   } else {
      $error = 'Sai tài khoản hoặc mật khẩu!';
   }
}
?>

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="assets/css/style.css">
   <title>Vui lòng đăng nhập</title>
</head>

<body>
   <div class="container-fluid">
      <div class="d-flex flex-column justify-content-center align-items-center vh-100">
         <div class="mb-2 d-flex flex-column justify-content-center align-items-center">
            <img src="assets/img/login.png" alt="login" class="img-fluid">
         </div>
         <div class="dialog p-4 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
            <form method="POST" enctype="multipart/form-data">
               <h5 class="text-white mb-3">Đăng nhập</h5>
               <div class="mb-3">
                  <input type="text" name="username" id="username" class="form-control text-white border-0 input-text" placeholder="Nhập tên đăng nhập..." autocomplete="off">
               </div>
               <div class="mb-3">
                  <input type="password" name="password" id="password" class="form-control text-white border-0 input-text" placeholder="Nhập mật khẩu đăng nhập..." autocomplete="off">
               </div>
               <?php if (isset($error)) : ?>
                  <div class="error">
                     <?= $error ?>
                  </div>
               <?php endif; ?>
               <div class="mt-4 mb-3">
                  <button type="submit" class="btn btn-primary w-100" name="login">Đăng nhập</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</body>

</html>