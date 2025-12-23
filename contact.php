
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "info@ccmguganda.com";
    $subject = "CryoCore Contact Form";
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);
    $headers = "From: $email" . "\r\n";

    mail($to, $subject, $message, $headers);
    echo "Message sent!";
}
?>
