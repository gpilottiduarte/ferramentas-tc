<?php
// Habilitar exibição de erros para depuração
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Definir fuso horário para logs
date_default_timezone_set('America/Sao_Paulo');

// --- Configurações CORS ---
header('Access-Control-Allow-Origin: *'); // Permite qualquer origem (ajuste se necessário)
header('Access-Control-Allow-Methods: GET, OPTIONS'); // Este proxy usará GET
header('Access-Control-Allow-Headers: Content-Type'); // Headers permitidos do frontend
header('Access-Control-Max-Age: 86400');

// Lidar com requisição OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    error_log("[".date('Y-m-d H:i:s')."] [INFO] Requisição OPTIONS (preflight) para fetch_html_proxy recebida.");
    exit(0);
}

// --- Processamento da Requisição GET ---
error_log("[".date('Y-m-d H:i:s')."] [INFO] Requisição " . $_SERVER['REQUEST_METHOD'] . " recebida para fetch_html_proxy.");

// Verificar se a URL foi fornecida no parâmetro 'url'
if (!isset($_GET['url']) || empty($_GET['url'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Parâmetro "url" ausente ou vazio.']);
    error_log("[".date('Y-m-d H:i:s')."] [WARN] Parâmetro 'url' ausente na requisição GET.");
    exit();
}

$targetUrl = $_GET['url']; // Obtém a URL de destino do parâmetro 'url'

// Validar basicamete a URL (pode ser mais robusto se necessário)
if (!filter_var($targetUrl, FILTER_VALIDATE_URL)) {
     http_response_code(400); // Bad Request
     echo json_encode(['error' => 'URL fornecida inválida.']);
     error_log("[".date('Y-m-d H:i:s')."] [WARN] URL inválida fornecida: " . $targetUrl);
     exit();
}

error_log("[".date('Y-m-d H:i:s')."] [INFO] Tentando buscar conteúdo da URL: " . $targetUrl);


// --- Verificar se a extensão cURL está habilitada ---
if (!function_exists('curl_init')) {
    error_log("[".date('Y-m-d H:i:s')."] [FATAL] Erro Fatal: A extensão PHP cURL não está habilitada. Não é possível prosseguir.");
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'A extensão cURL do PHP não está habilitada no servidor.']);
    exit();
}


// --- Fazer a requisição GET para a URL de destino usando cURL ---
$ch = curl_init($targetUrl); // Inicializa a sessão cURL com a URL de destino

// Configurar opções da requisição cURL para buscar a página HTML
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET'); // Método HTTP GET
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retornar a transferência como string
curl_setopt($ch, CURLOPT_HEADER, false); // Não incluir cabeçalhos na saída final (queremos apenas o HTML)
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Seguir redirecionamentos
curl_setopt($ch, CURLOPT_MAXREDIRS, 10); // Limite de redirecionamentos
curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Timeout para a requisição (ex: 30 segundos)
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); // Timeout para a tentativa de conexão
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Verifica certificado SSL (MUITO RECOMENDADO!)
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2); // Verifica nome do host no certificado

// Definir um User-Agent para parecer um navegador comum (muitos sites bloqueiam requisições sem User-Agent)
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; OpenSSL/3.0.2; PHP/8.1.2-1ubuntu2.18; +http://www.example.com/fetcher)'); // Adapte o User-Agent se quiser

// Não precisamos enviar o cabeçalho Authorization para uma página web comum
// curl_setopt($ch, CURLOPT_HTTPHEADER, [...]); // Não necessário aqui

error_log("[".date('Y-m-d H:i:s')."] [DEBUG] Opções cURL para fetch_html_proxy configuradas.");


// Executar a requisição cURL
$response = curl_exec($ch); // Executa a requisição e retorna o conteúdo da página ou false em caso de erro

// --- Tratar a Resposta ou Erro do cURL ---

// Verificar por erros na execução do cURL
if ($response === false) {
    $error_msg = curl_error($ch);
    $error_code = curl_errno($ch);

    error_log("[".date('Y-m-d H:i:s')."] [ERROR] Erro na execução cURL para " . $targetUrl . " ($error_code): " . $error_msg);

    // Retornar um erro 500 para o frontend
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar o conteúdo da página: ' . $error_msg]);

} else {
    // A requisição cURL foi executada com sucesso. Agora obtemos o status HTTP
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL); // A URL final após redirecionamentos

    error_log("[".date('Y-m-d H:i:s')."] [INFO] Requisição cURL para " . $targetUrl . " concluída. Status HTTP: " . $httpCode . ", URL Final: " . $finalUrl);

    // Verificar se o status HTTP indica sucesso (2xx)
    if ($httpCode >= 200 && $httpCode < 300) {
        // Retornar o código de status HTTP (200 OK) e o corpo da resposta (HTML) para o frontend
        http_response_code(200);
        // Definir o Content-Type como text/html para o navegador entender a resposta
        header('Content-Type: text/html; charset=utf-8');
        echo $response; // Retorna o conteúdo HTML bruto

    } else {
        // Retornar um erro para o frontend com o status HTTP da página
        http_response_code($httpCode); // Repassa o status de erro (404, 500, etc.)
        echo json_encode(['error' => "Erro ao acessar a página. Status HTTP: " . $httpCode]);
        error_log("[".date('Y-m-d H:i:s')."] [WARN] Requisição para " . $targetUrl . " retornou status HTTP de erro: " . $httpCode);
    }
}

// Fechar a sessão cURL
curl_close($ch);
error_log("[".date('Y-m-d H:i:s')."] [INFO] Sessão cURL fechada para fetch_html_proxy.");

?>