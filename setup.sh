#!/bin/bash
# SETUP.sh - Script para inicializar el portafolio
# Ejecutar en terminal: bash setup.sh

echo "🎓 Portafolio EST334 - Setup Inicial"
echo "===================================="
echo ""

# Verificar Git
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado"
    echo "Descarga desde: https://git-scm.com"
    exit 1
fi

echo "✅ Git instalado"
echo ""

# Configurar Git (opcional)
read -p "¿Quieres configurar tu identidad Git? (s/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    read -p "Tu nombre: " nombre
    read -p "Tu email: " email
    git config --global user.name "$nombre"
    git config --global user.email "$email"
    echo "✅ Identidad configurada"
    echo ""
fi

# Inicializar repositorio
if [ -d ".git" ]; then
    echo "ℹ️ Git ya inicializado en esta carpeta"
else
    echo "📦 Inicializando repositorio Git..."
    git init
    echo "✅ Repositorio inicializado"
    echo ""
fi

# Agregar archivos
echo "📝 Agregando archivos..."
git add .
echo "✅ Archivos agregados"
echo ""

# Primer commit
echo "💾 Creando primer commit..."
git commit -m "Portafolio inicial EST334"
echo "✅ Commit creado"
echo ""

# Renombrar rama
echo "🌿 Configurando rama main..."
git branch -M main
echo "✅ Rama configurada"
echo ""

# Mostrar instrucciones
echo "===================================="
echo "🎉 ¡Portafolio inicializado!"
echo "===================================="
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "1. Personaliza tu contenido en index.html"
echo "2. Reemplaza los PDFs en las carpetas de trabajo"
echo ""
echo "3. Crea un repositorio en GitHub:"
echo "   https://github.com/new"
echo ""
echo "4. Conecta tu repositorio remoto:"
echo "   git remote add origin https://github.com/TU_USUARIO/portafolio-est334.git"
echo ""
echo "5. Sube tus cambios:"
echo "   git push -u origin main"
echo ""
echo "6. Activa GitHub Pages:"
echo "   Settings → Pages → Branch: main → Save"
echo ""
echo "7. ¡Tu sitio estará en:"
echo "   https://tu-usuario.github.io/portafolio-est334"
echo ""
echo "===================================="
echo "ℹ️ Para más ayuda, abre INICIO.html en tu navegador"
echo "===================================="
