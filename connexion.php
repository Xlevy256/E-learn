<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <style>
        /* Style identique à celui précédemment fourni */
    </style>
</head>
<body>
    <div class="container">
        <h2>Connexion</h2>
        <form id="loginForm" method="post" action="connexion.php">
            <div class="input-group">
                <label for="email">Email :</label>
                <input type="email" id="email" name="email" required>
                <div class="error-message" id="emailError"></div>
            </div>
            <div class="input-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" required>
                <div class="error-message" id="passwordError"></div>
            </div>
            <button type="submit" class="button">Se connecter</button>
        </form>
        <div class="footer">
            <p>Pas encore de compte ? <a href="inscription.html">S'inscrire</a></p>
        </div>
    </div>
    
    <?php
session_start();

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "votre_base_de_donnees";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupération des données du formulaire
$email = $_POST['email'];
$password = $_POST['password']; // En pratique, vous devez hashé le mot de passe

// Vérification de l'utilisateur
$sql = "SELECT * FROM utilisateurs WHERE email = ? AND mot_de_passe = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    if ($user['verifie'] == 1) { // Vérifie si le compte est vérifié
        $_SESSION['user_id'] = $user['id'];
        header("Location: index.php"); // Redirection vers la page d'accueil
        exit();
    } else {
        echo "<p style='color: red;'>Votre compte n'est pas encore vérifié.</p>";
    }
} else {
    echo "<p style='color: red;'>Email ou mot de passe incorrect.</p>";
}

$stmt->close();
$conn->close();
?>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Clear previous errors
            clearErrors();

            // Retrieve form data
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            let isValid = true;

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError('email', 'Veuillez entrer une adresse email valide.');
                isValid = false;
            }

            // Password validation
            if (password.length < 6) {
                showError('password', 'Le mot de passe doit comporter au moins 6 caractères.');
                isValid = false;
            }

            if (isValid) {
                // If form is valid, submit it
                this.submit();
            }
        });

        function showError(inputId, message) {
            const input = document.getElementById(inputId);
            const errorElement = document.getElementById(inputId + 'Error');
            input.classList.add('error');
            errorElement.textContent = message;
        }

        function clearErrors() {
            const inputs = document.querySelectorAll('.input-group input');
            inputs.forEach(input => {
                input.classList.remove('error');
            });
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.textContent = '';
            });
        }
    </script>
</body>
</html>