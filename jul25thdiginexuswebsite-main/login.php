<?php

    include 'connection.php';
    session_start();
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $email = $_POST['email'];
        $password = $_POST['password'];

        try {
            $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch();
            if($user) {
                if(password_verify($password, $user['password'])) {
                    $_SESSION['name'] = $user['name'];
                    $_SESSION['email'] = $user['email'];
                    $_SESSION['role'] = $user['role'];
                    header('Location: index.html');
                }
                else {
                    echo "Incorrect password";
                    header('Location: login.html');
                }
            }
            else {
                echo "Incorrect email";
                header('Location: login.html');
            }
        }
        catch(PDOException $e) {
            echo $e->getMessage();
        }
        finally {
            $pdo = null;
        }
    }
    

?>