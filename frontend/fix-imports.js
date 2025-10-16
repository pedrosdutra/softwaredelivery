// Script para remover versões dos imports nos componentes UI
// Execute com: node fix-imports.js

const fs = require('fs');
const path = require('path');

// Usa o diretório onde o script está localizado
const componentsDir = path.join(__dirname, 'src', 'components', 'ui');

// Função para remover versões dos imports
function removeVersions(content) {
  // Remove @version de imports como @radix-ui/react-label@2.1.2
  // Mantém apenas @radix-ui/react-label
  return content.replace(/("[@\w\-\/]+)@[\d\.]+"/g, '$1"');
}

// Processa todos os arquivos .tsx no diretório
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Erro ao ler diretório:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.tsx')) {
      const filePath = path.join(componentsDir, file);
      
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Erro ao ler ${file}:`, err);
          return;
        }

        const newContent = removeVersions(data);
        
        if (newContent !== data) {
          fs.writeFile(filePath, newContent, 'utf8', (err) => {
            if (err) {
              console.error(`Erro ao escrever ${file}:`, err);
            } else {
              console.log(`✓ Atualizado: ${file}`);
            }
          });
        } else {
          console.log(`- Sem alterações: ${file}`);
        }
      });
    }
  });
});

console.log('Processando arquivos...\n');
