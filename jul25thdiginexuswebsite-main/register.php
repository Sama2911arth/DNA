<?php
    include 'connection.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $name = $_POST['fname'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $password2 = $_POST['password2'];
        $role = $_POST['role'];

        if($password == $password2){
            $hashedpassword = password_hash($password, PASSWORD_DEFAULT);

            try {
                $stmt = $pdo->prepare('INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)');
                $stmt->execute(['name' => $name, 'email' => $email, 'password' => $hashedpassword, 'role' => $role]);
                $pdo->commit();
                header('Location: login.html');
            }
            catch(PDOException $e){
                $pdo->rollBack();
                echo $e->getMessage();
            }
            finally {
                $pdo = null;
            }
        }
        else {
            echo 'Passwords do not match';
        }
    }
            
?>