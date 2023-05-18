<?php
session_start();
if (isset($_POST['admin'])) {
    header('Location: pages/dashboard.php');
} else {
    header('Location:  auth/login_form.php');
}
