<?php
require_once 'db.php'; // conexão com o banco
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

// Receber dados do formulário
$titulo = $_POST['titulo'] ?? '';
$subtitulo = $_POST['subtitulo'] ?? '';
$conteudo = $_POST['conteudo'] ?? '';
$imagemUrl = '';

// Upload da imagem
if (!empty($_FILES['imagem']['name'])) {
    $nomeArquivo = uniqid() . '_' . basename($_FILES['imagem']['name']);
    $destino = __DIR__ . '/uploads/' . $nomeArquivo;

    if (!is_dir(__DIR__ . '/uploads')) {
        mkdir(__DIR__ . '/uploads', 0777, true);
    }

    if (move_uploaded_file($_FILES['imagem']['tmp_name'], $destino)) {
        $imagemUrl = "uploads/" . $nomeArquivo;
    } else {
        echo json_encode(["error" => "Falha ao fazer upload da imagem"]);
        exit;
    }
}

// Inserir no banco
try {
    $stmt = $pdo->prepare("INSERT INTO noticias (titulo, subtitulo, conteudo, imagem_url) VALUES (:titulo, :subtitulo, :conteudo, :imagem)");
    $stmt->execute([
        'titulo' => $titulo,
        'subtitulo' => $subtitulo,
        'conteudo' => $conteudo,
        'imagem' => $imagemUrl
    ]);

    echo json_encode(["success" => true, "message" => "Notícia criada com sucesso"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao salvar no banco: " . $e->getMessage()]);
}
