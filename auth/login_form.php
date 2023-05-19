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
<!DOCTYPE html>
<html lang="en">

<head>
   <title>Login to continue</title>
   <link rel="stylesheet" href="assets/css/login.css">
   <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
   <header class="header">
      <nav class="navbar">
         <a href="#">Home</a>
         <a href="#">About</a>
         <a href="#">Skill</a>
         <a href="#">Contact</a>
         <a href="#">Bank</a>
      </nav>
      <form action="" class="search-bar">
         <input type="text" placeholder="Search...">
         <button><i class='bx bx-search'></i></button>
      </form>
   </header>
   <div class="background"></div>
   <div class="container">
      <div class="item">
         <h2 class="logo"><i class='bx bxl-xing'> </i>Cityiscoding</h2>
         <div class="text-item">
            <h2>Welcome! <br><span>
                  To my website
               </span></h2>
            <p>The way one walks and sits can reflect a part of a person's character, but as a programmer like me, I completely deny that..</p>
            <div class="social-icon">
               <a href="#"><i class='bx bxl-facebook'></i></a>
               <a href="#"><i class='bx bxl-twitter'></i></a>
               <a href="#"><i class='bx bxl-youtube'></i></a>
               <a href="#"><i class='bx bxl-instagram'></i></a>
               <a href="#"><i class='bx bxl-linkedin'></i></a>
            </div>
         </div>
      </div>
      <div class="login-section">
         <div class="form-box login">
            <form action="">
               <h2>Sign In</h2>
               <div class="input-box">
                  <span class="icon"><i class='bx bxs-envelope'></i></span>
                  <input type="text" name="username" required>
                  <label>Username</label>
               </div>
               <div class="input-box">
                  <span class="icon"><i class='bx bxs-lock-alt'></i></span>
                  <input type="password" name="password" required>
                  <label>Password</label>
               </div>
               <?php if (isset($error)) : ?>
                  <div class="error">
                     <?= $error ?>
                  </div>
               <?php endif; ?>
               <div class="remember-password">
                  <label for=""><input type="checkbox">Remember Me</label>
                  <a href="#">Forget Password</a>
               </div>
               <button class="btn">Login In</button>
               <div class="create-account">
                  <p>Create A New Account? <a href="#" class="register-link">Sign Up</a></p>
               </div>
            </form>
         </div>
         <div class="form-box register">
            <form action="">

               <h2>Sign Up</h2>

               <div class="input-box">
                  <span class="icon"><i class='bx bxs-user'></i></span>
                  <input type="text" name="name" required>
                  <label>Username</label>
               </div>
               <div class="input-box">
                  <span class="icon"><i class='bx bxs-envelope'></i></span>
                  <input type="email" required>
                  <label>Email</label>
               </div>
               <div class="input-box">
                  <span class="icon"><i class='bx bxs-lock-alt'></i></span>
                  <input type="password" required>
                  <label>Password</label>
               </div>
               <div class="remember-password">
                  <label for=""><input type="checkbox">I agree with cityiscoding ?</label>
               </div>
               <button class="btn">Login In</button>
               <div class="create-account">
                  <p>Already Have An Account? <a href="#" class="login-link">Sign In</a></p>
               </div>
            </form>
         </div>
      </div>
   </div>

   <script src="assets/js/index.js"></script>
</body>

</html>