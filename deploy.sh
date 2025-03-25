#!/bin/bash

echo "📦 Buildando o frontend..."
cd frontend || exit
npm run build || exit

echo "⬆️ Voltando para a raiz do projeto..."
cd ..

echo "🧹 Derrubando containers antigos..."
docker-compose down

echo "🚀 Subindo tudo com build novo..."
docker-compose up --build -d

echo "✅ Deploy finalizado com sucesso!"
