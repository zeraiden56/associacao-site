<?php
require_once 'db.php'; // Conexão com o banco
header("Content-Type: application/json");

// LOGIN DO ADMIN (1.1)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'login') {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'];
    $password = $data['password'];

    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = :username AND password = crypt(:password, password)");
    $stmt->execute(['username' => $username, 'password' => $password]);
    $admin = $stmt->fetch();

    echo $admin
        ? json_encode(["success" => true, "message" => "Login efetuado"])
        : (http_response_code(401) || json_encode(["success" => false, "message" => "Credenciais inválidas"]));
}

// LISTAR NOTÍCIAS (1.2)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] === 'get_noticias') {
    $stmt = $pdo->query("SELECT * FROM noticias ORDER BY criado_em DESC");
    echo json_encode($stmt->fetchAll());
}

// CRIAR NOTÍCIA (1.3)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'criar_noticia') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("INSERT INTO noticias (titulo, subtitulo, conteudo, imagem_url) VALUES (:titulo, :subtitulo, :conteudo, :imagem_url)");
    $stmt->execute([
        'titulo' => $data['titulo'],
        'subtitulo' => $data['subtitulo'],
        'conteudo' => $data['conteudo'],
        'imagem_url' => $data['imagem_url']
    ]);
    echo json_encode(["success" => true, "message" => "Notícia criada com sucesso"]);
}

// EDITAR NOTÍCIA (1.4)
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && $_GET['action'] === 'editar_noticia') {
    parse_str(file_get_contents("php://input"), $data);
    $stmt = $pdo->prepare("UPDATE noticias SET titulo = :titulo, subtitulo = :subtitulo, conteudo = :conteudo, imagem_url = :imagem_url, atualizado_em = CURRENT_TIMESTAMP WHERE id = :id");
    $stmt->execute([
        'titulo' => $data['titulo'],
        'subtitulo' => $data['subtitulo'],
        'conteudo' => $data['conteudo'],
        'imagem_url' => $data['imagem_url'],
        'id' => $data['id']
    ]);
    echo json_encode(["success" => true, "message" => "Notícia atualizada"]);
}

// DELETAR NOTÍCIA (1.5)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $_GET['action'] === 'deletar_noticia') {
    parse_str(file_get_contents("php://input"), $data);
    $stmt = $pdo->prepare("DELETE FROM noticias WHERE id = :id");
    $stmt->execute(['id' => $data['id']]);
    echo json_encode(["success" => true, "message" => "Notícia deletada"]);
}
