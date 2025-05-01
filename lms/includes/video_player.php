<?php
$username = $_SESSION['user']['username'] ?? 'Guest';
$videoId = 'dQw4w9WgXcQ';
?>
<div class='video-player'>
  <iframe src='https://www.youtube.com/embed/<?php echo $videoId; ?>' frameborder='0' allowfullscreen></iframe>
  <p class='watermark'>Watching as: <?php echo htmlspecialchars($username); ?></p>
</div>