<?php
session_start();
include('config/database.php');
include('includes/functions.php');

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Custom LMS</title>
  <link rel='stylesheet' href='assets/css/style.css'>
  <script src='assets/js/main.js' defer></script>
</head>
<body>
  <?php include('includes/navbar.php'); ?>

  <main class='dashboard'>
    <h1>Welcome to Custom LMS</h1>
    <div class='admin-panel'>
      <?php include('pages/admin.php'); ?>
    </div>
    <div class='video-wrapper'>
      <?php include('includes/video_player.php'); ?>
    </div>
    <div class='notifications'>
      <?php include('pages/notifications.php'); ?>
    </div>
    <div class='evaluation'>
      <?php include('pages/evaluation.php'); ?>
    </div>
    <div class='zoom-linker'>
      <?php include('pages/zoom.php'); ?>
    </div>
  </main>

  <?php include('includes/footer.php'); ?>
</body>
</html>
