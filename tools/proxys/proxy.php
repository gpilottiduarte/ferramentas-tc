<?php
// Habilitar exibição de erros para depuração (útil durante o desenvolvimento)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Definir fuso horário para garantir que os logs tenham horários corretos
date_default_timezone_set('America/Sao_Paulo');

// --- CHAVE API GOOGLE GEMINI (NÃO DEIXE ISSO EM PRODUÇÃO. USE VARIÁVEIS DE AMBIENTE OU ARQUIVO FORA DO WEB ROOT) ---
// Por exemplo, você pode ler de um arquivo .env
// $geminiApiKey = getenv('GEMINI_API_KEY');
$geminiApiKey = ''; // <--- SUBSTITUA PELA SUA CHAVE REAL

// --- Configurações CORS ---
header('Access-Control-Allow-Origin: *'); // Permitir requisições de qualquer origem.
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With'); // Adicionado X-Requested-With
header('Access-Control-Max-Age: 86400');

// Se for uma requisição OPTIONS (preflight), retornar apenas os cabeçalhos CORS e sair
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    error_log("[".date('Y-m-d H:i:s')."] [INFO] Requisição OPTIONS (preflight) para proxy.php recebida.");
    exit(0);
}

error_log("[".date('Y-m-d H:i:s')."] [INFO] Requisição " . $_SERVER['REQUEST_METHOD'] . " recebida para proxy.php do cliente " . $_SERVER['REMOTE_ADDR']);

// Obter o corpo da requisição (JSON enviado pelo frontend)
$requestBody = file_get_contents('php://input');
error_log("[".date('Y-m-d H:i:s')."] [DEBUG] Corpo da requisição recebido: " . $requestBody);

// Validar se o requestBody é um JSON válido antes de prosseguir
if (json_decode($requestBody) === null && json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload received from frontend.']);
    error_log("[".date('Y-m-d H:i:s')."] [ERROR] Frontend sent invalid JSON: " . $requestBody);
    exit();
}


// URL da API de destino (Google Gemini API)
$apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . $geminiApiKey;

// Verificar se a extensão cURL está habilitada
if (!function_exists('curl_init')) {
    error_log("[".date('Y-m-d H:i:s')."] [FATAL] Erro Fatal: A extensão PHP cURL não está habilitada. Não é possível prosseguir.");
    http_response_code(500);
    echo json_encode(['error' => 'A extensão cURL do PHP não está habilitada no servidor. Por favor, contate o administrador.']);
    exit();
}

$ch = curl_init($apiUrl);

// Configurar opções da requisição cURL
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST'); // Define o método HTTP como POST
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody); // Define o corpo da requisição (JSON string)
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retornar a transferência como string
curl_setopt($ch, CURLOPT_HEADER, true); // Incluir os cabeçalhos da resposta
curl_setopt($ch, CURLOPT_TIMEOUT, 120); // Tempo limite para a requisição
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); // Tempo limite para a conexão
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Verifica certificado SSL
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2); // Verifica nome do host no certificado

// Definir cabeçalhos HTTP. É crucial definir Content-Type como application/json
$httpHeaders = [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($requestBody) // É uma boa prática definir Content-Length para POST com JSON
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $httpHeaders);

error_log("[".date('Y-m-d H:i:s')."] [DEBUG] Opções cURL configuradas para Gemini.");
error_log("[".date('Y-m-d H:i:s')."] [DEBUG] Headers a serem enviados via cURL:\n" . print_r($httpHeaders, true));


// Executar a requisição cURL
$response = curl_exec($ch);

if ($response === false) {
    $error_msg = curl_error($ch);
    $error_code = curl_errno($ch);
    error_log("[".date('Y-m-d H:i:s')."] [ERROR] Erro na execução cURL ($error_code): " . $error_msg);
    http_response_code(500);
    echo json_encode(['error' => 'Erro na comunicação com a API externa: ' . $error_msg]);
} else {
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $responseHeader = substr($response, 0, $header_size);
    $responseBody = substr($response, $header_size);

    error_log("[".date('Y-m-d H:i:s')."] [INFO] Requisição cURL concluída para Gemini. Status HTTP: " . $httpCode);
    error_log("[".date('Y-m-d H:i:s')."] [DEBUG] Corpo da resposta da API Gemini (via cURL):\n" . $responseBody);

    // Repassar o status HTTP e o corpo da resposta
    http_response_code($httpCode);
    echo $responseBody;
}

curl_close($ch);
error_log("[".date('Y-m-d H:i:s')."] [INFO] Sessão cURL fechada.");

?>