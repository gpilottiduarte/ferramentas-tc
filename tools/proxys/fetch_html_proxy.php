<?php
// Define o tipo de conteúdo como JSON para respostas de erro
header('Content-Type: application/json');

// Desabilita o cache para garantir que as requisições sejam sempre novas
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Verifica se a URL foi fornecida via parâmetro GET
if (!isset($_GET['url']) || empty($_GET['url'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'URL da página web não fornecida.']);
    exit();
}

$targetUrl = filter_var(urldecode($_GET['url']), FILTER_SANITIZE_URL);

// Validação básica da URL
if (!filter_var($targetUrl, FILTER_VALIDATE_URL)) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'URL inválida.']);
    exit();
}

// Inicializa a sessão cURL
$ch = curl_init();

// Configura as opções cURL
curl_setopt($ch, CURLOPT_URL, $targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retorna o conteúdo como string
curl_setopt($ch, CURLOPT_HEADER, false);      // Não inclui os headers na saída
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Segue redirecionamentos
curl_setopt($ch, CURLOPT_MAXREDIRS, 10);      // Limite de redirecionamentos
curl_setopt($ch, CURLOPT_TIMEOUT, 30);        // Tempo limite de 30 segundos
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'); // User-Agent para simular um navegador

// Para HTTPS, se necessário e se o seu ambiente permitir (pode precisar de certificados CA)
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

// Executa a requisição cURL
$htmlContent = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

// Fecha a sessão cURL
curl_close($ch);

// Verifica por erros ou status HTTP não-OK
if ($curlError) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => "Erro no cURL: {$curlError}"]);
    exit();
}

// Se o código HTTP da página alvo não for 200 (OK), ou 3xx (redirecionamento já seguido pelo FOLLOWLOCATION)
// e o conteúdo estiver vazio (indicando um erro 4xx ou 5xx na página alvo)
if ($httpCode >= 400 || empty($htmlContent)) {
    // Se o código HTTP é de erro, tentamos retornar o código do erro original
    // Caso contrário, assumimos que o conteúdo estava vazio por algum motivo e retornamos 500
    $statusCode = ($httpCode >= 400) ? $httpCode : 500;
    http_response_code($statusCode);
    
    // Tenta extrair a mensagem de erro do HTML retornado, se houver
    $errorMsg = "Erro ao buscar a URL. Status HTTP: {$httpCode}.";
    
    // Pequena tentativa de parsear o HTML de erro para uma mensagem mais legível
    if (!empty($htmlContent)) {
        // Exemplo: se for um erro 404 do Nginx como você viu
        if (strpos($htmlContent, '404 Not Found') !== false && strpos($htmlContent, 'nginx') !== false) {
            $errorMsg = "Página não encontrada no servidor alvo (HTTP 404 Not Found).";
        } else {
            // Se for outro erro, pode ser útil retornar o HTML completo do erro para depuração
            // Por simplicidade, vou manter a mensagem genérica ou extrair um título de erro se existir.
            // Para depuração, você pode querer logar $htmlContent ou retorná-lo em modo dev.
            if (preg_match('/<title>(.*?)<\/title>/is', $htmlContent, $matches)) {
                $errorMsg .= " Título do erro: " . $matches[1];
            }
        }
    }
    
    echo json_encode(['error' => $errorMsg]);
    exit();
}

// Define o tipo de conteúdo como HTML para a resposta bem-sucedida
// Isso é importante para que o navegador saiba como interpretar a resposta
header('Content-Type: text/html; charset=UTF-8');
echo $htmlContent;

?>