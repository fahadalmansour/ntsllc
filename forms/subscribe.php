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

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Invalid JSON body']);
    exit;
}

$email  = trim((string)($data['email']  ?? ''));
$source = trim((string)($data['source'] ?? 'website'));

if ($email === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Email is required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Invalid email address']);
    exit;
}

$email  = substr($email, 0, 254);
$source = substr(htmlspecialchars($source, ENT_QUOTES, 'UTF-8'), 0, 100);

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

    // Upsert — if already subscribed, update source and timestamp
    $stmt = $pdo->prepare(
        'INSERT INTO nts_subscribers (email, source)
         VALUES (:email, :source)
         ON DUPLICATE KEY UPDATE source = VALUES(source), subscribed_at = CURRENT_TIMESTAMP'
    );

    $stmt->execute([
        ':email'  => $email,
        ':source' => $source,
    ]);

} catch (PDOException $e) {
    error_log('NTS subscribe form DB error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Server error. Please try again.']);
    exit;
}

http_response_code(200);
echo json_encode(['ok' => true, 'message' => 'Subscribed']);
