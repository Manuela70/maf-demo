#!/bin/bash
# Script de diagnóstico - MAF Perú Wireframes

echo "=== DIAGNÓSTICO DE WIREFRAMES MAF PERÚ ==="
echo ""

echo "1. Verificando archivos principales..."
if [ -f "index.html" ]; then echo "  ✅ index.html existe"; else echo "  ❌ index.html NO EXISTE"; fi
if [ -f "src/App.js" ]; then echo "  ✅ src/App.js existe"; else echo "  ❌ src/App.js NO EXISTE"; fi
if [ -f "mockData.js" ]; then echo "  ✅ mockData.js existe"; else echo "  ❌ mockData.js NO EXISTE"; fi
echo ""

echo "2. Verificando configuración..."
if [ -f "src/config/roles.js" ]; then echo "  ✅ roles.js existe"; else echo "  ❌ roles.js NO EXISTE"; fi
if [ -f "src/config/routes.js" ]; then echo "  ✅ routes.js existe"; else echo "  ❌ routes.js NO EXISTE"; fi
echo ""

echo "3. Verificando agentes de IA..."
if [ -f "src/agents/AgenteCopiloto.js" ]; then echo "  ✅ Agente 1: Copiloto existe"; else echo "  ❌ Agente 1 NO EXISTE"; fi
if [ -f "src/agents/AgenteAsistente.js" ]; then echo "  ✅ Agente 2: Asistente existe"; else echo "  ❌ Agente 2 NO EXISTE"; fi
if [ -f "src/agents/AgentePriorizacion.js" ]; then echo "  ✅ Agente 3: Priorización existe"; else echo "  ❌ Agente 3 NO EXISTE"; fi
if [ -f "src/agents/AgenteCopilotoEjecutivo.js" ]; then echo "  ✅ Agente 4: Copiloto Ejecutivo existe"; else echo "  ❌ Agente 4 NO EXISTE"; fi
echo ""

echo "4. Verificando layout..."
if [ -f "src/components/layout/GlobalHeader.js" ]; then echo "  ✅ GlobalHeader existe"; else echo "  ❌ GlobalHeader NO EXISTE"; fi
if [ -f "src/components/layout/Sidebar.js" ]; then echo "  ✅ Sidebar existe"; else echo "  ❌ Sidebar NO EXISTE"; fi
if [ -f "src/components/layout/MainLayout.js" ]; then echo "  ✅ MainLayout existe"; else echo "  ❌ MainLayout NO EXISTE"; fi
echo ""

echo "5. Verificando context y router..."
if [ -f "src/context/AppContext.js" ]; then echo "  ✅ AppContext existe"; else echo "  ❌ AppContext NO EXISTE"; fi
if [ -f "src/router/Router.js" ]; then echo "  ✅ Router existe"; else echo "  ❌ Router NO EXISTE"; fi
echo ""

echo "6. Verificando estilos..."
if [ -f "src/styles/custom.css" ]; then echo "  ✅ custom.css existe"; else echo "  ❌ custom.css NO EXISTE"; fi
echo ""

echo "7. Contando líneas..."
if [ -f "index.html" ]; then 
  LINEAS=$(wc -l < index.html)
  echo "  📄 index.html: $LINEAS líneas"
fi
if [ -f "src/App.js" ]; then 
  LINEAS=$(wc -l < src/App.js)
  echo "  📄 src/App.js: $LINEAS líneas"
fi
echo ""

echo "=== INSTRUCCIONES PARA EJECUTAR ==="
echo ""
echo "  1. Abre una terminal en este directorio"
echo "  2. Ejecuta: python3 -m http.server 8000"
echo "  3. Abre tu navegador en: http://localhost:8000/index.html"
echo "  4. NO uses file:/// - Los módulos ES6 requieren servidor HTTP"
echo ""
echo "Si ves solo la franja naranja:"
echo "  - Presiona F12 para abrir DevTools"
echo "  - Ve a la pestaña Console"
echo "  - Copia el error que aparece allí"
echo ""
