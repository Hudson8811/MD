<?php

if(isset($_POST["name"]) && isset($_POST["phone"]) && isset($_POST["email"]) && isset($_POST["text"])) {
        $to = "agency@mockup.digital";
    $subject = "Форма обратной связи";

    $message = "
    <p><b>Имя:</b> ".htmlspecialchars(trim($_POST["phone"]))."</p>
    <p><b>Телефон:</b> ".htmlspecialchars(trim($_POST["tel"]))."</p>
    <p><b>Email:</b> ".htmlspecialchars(trim($_POST["email"]))."</p>
    <p><b>Тема:</b> ".htmlspecialchars(trim($_POST["subject"]))."</p>
    <p style='white-space: pre-line;'><b>Сообщение:</b> ".htmlspecialchars(trim($_POST["text"]))."</p>
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    $headers .= 'From: <agency@mockup.digital>' . "\r\n";

    mail($to,$subject,$message,$headers);
}
?>