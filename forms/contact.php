<?php
declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://neotechnology.solutions');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Invalid JSON body']);
    exit;
}

$name    = trim((string)($data['name']    ?? ''));
$email   = trim((string)($data['email']   ?? ''));
$company = trim((string)($data['company'] ?? ''));
$market  = trim((string)($data['market']  ?? ''));
$stage   = trim((string)($data['stage']   ?? ''));
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'name, email, and message are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Invalid email address']);
    exit;
}

// Sanitize
$name    = substr(htmlspecialchars($name,    ENT_QUOTES, 'UTF-8'), 0, 200);
$email   = substr($email, 0, 254);
$company = substr(htmlspecialchars($company, ENT_QUOTES, 'UTF-8'), 0, 200);
$market  = substr(htmlspecialchars($market,  ENT_QUOTES, 'UTF-8'), 0, 100);
$stage   = substr(htmlspecialchars($stage,   ENT_QUOTES, 'UTF-8'), 0, 100);
$message = substr(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'), 0, 5000);

$db_host = 'localhost';
$db_name = 'fsalmansour_wp596';
$db_user = getenv('NTS_DB_USER') ?: 'fsalmansour_wp596';
$db_pass = getenv('NTS_DB_PASS') ?: '';

try {
    $pdo = new PDO(
        "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );

    $stmt = $pdo->prepare(
        'INSERT INTO nts_contacts (name, email, company, market, stage, message, ip_address, user_agent)
         VALUES (:name, :email, :company, :market, :stage, :message, :ip, :ua)'
    );

    $stmt->execute([
        ':name'    => $name,
        ':email'   => $email,
        ':company' => $company,
        ':market'  => $market,
        ':stage'   => $stage,
        ':message' => $message,
        ':ip'      => substr($_SERVER['REMOTE_ADDR'] ?? '', 0, 45),
        ':ua'      => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500),
    ]);

} catch (PDOException $e) {
    error_log('NTS contact form DB error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Server error. Please try again or email us directly.']);
    exit;
}

// Optional: send internal email notification
$to      = 'contact@neotechnology.solutions';
$subject = "New contact: {$name}";
$body    = "Name: {$name}\nEmail: {$email}\nCompany: {$company}\nMarket: {$market}\nStage: {$stage}\n\n{$message}";
$headers = "From: noreply@neotechnology.solutions\r\nReply-To: {$email}";

@mail($to, $subject, $body, $headers);

http_response_code(200);
echo json_encode(['ok' => true, 'message' => 'Message received']);
