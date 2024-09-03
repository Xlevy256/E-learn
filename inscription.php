<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <style>
        /* Style identique à celui précédemment fourni */
    </style>
</head>
<body>
    <div class="container">
        <h2>Inscription</h2>
        <form id="signupForm" method="post" action="inscription.php">
            <div class="input-group">
                <label for="name">Nom :</label>
                <input type="text" id="name" name="name" required>
                <div class="error-message" id="nameError"></div>
            </div>
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
            <div class="input-group">
                <label for="confirmPassword">Confirmer le mot de passe :</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
                <div class="error-message" id="confirmPasswordError"></div>
            </div>
            <button type="submit" class="button">S'inscrire</button>
        </form>
        <div class="footer">
            <p>Déjà un compte ? <a href="connexion.html">Se connecter</a></p>
        </div>
    </div>

    <script>
        document.getElementById('signupForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Clear previous errors
            clearErrors();

            // Retrieve form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            let isValid = true;

            // Name validation
            if (name.length < 2) {
                showError('name', 'Le nom doit comporter au moins 2 caractères.');
                isValid = false;
            }

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

            // Confirm password validation
            if (password !== confirmPassword) {
                showError('confirmPassword', 'Les mots de passe ne correspondent pas.');
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
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password']; // Assurez-vous de hasher le mot de passe avant de le stocker

// Hash du mot de passe pour la sécurité
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insérer les données dans la base de données
$sql = "INSERT INTO utilisateurs (name, email, mot_de_passe, verifie) VALUES (?, ?, ?, 0)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $hashed_password);

if ($stmt->execute()) {
    // Redirection vers la page de connexion après une inscription réussie
    header("Location: connexion.php");
    exit();
} else {
    echo "<p style='color: red;'>Erreur lors de l'inscription. Veuillez réessayer.</p>";
}

$stmt->close();
$conn->close();
?>
</body>
</html>