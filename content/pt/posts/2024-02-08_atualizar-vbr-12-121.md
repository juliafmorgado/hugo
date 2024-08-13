---
title: "Como Atualizar Veeam Backup and Replication 12.0 ao 12.1"
author: "Julia Furst Morgado"
date: 2024-02-08T10:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/upgrade-vbr-121.png
tags: 
    - Veeam
categories: 
    - Tech
slug: /como-atualizar-veeam-backup-replication-12-0-ao-12-1
---

Veeam Backup and Replication lançou a versão 12.1 com [novos recursos e melhorias emocionantes](https://www.veeam.com/whats-new-backup-replication.html), especialmente no campo da cibersegurança. Neste tutorial, vamos guiá-lo através do processo de atualização da versão 12.0 para 12.1 de forma rápida e suave.

## Passo 1: Preparação
Antes de iniciar o processo de atualização, certifique-se de que seus backups estão atualizados, fornecendo uma opção de segurança para reverter, se necessário. Além disso, se você tiver trabalhos em execução contínua, desative-os temporariamente ou encerre-os para evitar interrupções durante a atualização.

## Passo 2: Verificar a Versão Atual e Baixar o ISO
Abra o console do Veeam Backup and Replication e verifique se você está executando a versão 10a a 12 para utilizar o atualizador in-place. Se estiver executando uma versão anterior, o processo de atualização será diferente. Em seguida, visite a página de [Informações de Lançamento para Veeam Backup & Replication 12.1 e Atualizações](https://www.veeam.com/kb4510) no site da Veeam e baixe o último ISO 12.1.

![Baixar ISO 12.1](https://blog-imgs-23.s3.amazonaws.com/download-iso-121.png)

## Passo 3: Montar o ISO e Iniciar a Configuração
Clique com o botão direito no arquivo ISO baixado e monte-o. Em seguida, navegue até o ISO montado e execute o arquivo setup.exe para iniciar o processo de atualização.

![Montar ISO 12.1](https://blog-imgs-23.s3.amazonaws.com/mount-iso-121.png)

![Iniciar Configuração 12.1](https://blog-imgs-23.s3.amazonaws.com/launch-setup-121.png)

## Passo 4: Aceitar os Acordos de Licença
Assim que o instalador for inicializado, você será solicitado a aceitar os termos dos Acordos de Licença. Revise e aceite os acordos para prosseguir com a atualização.

## Passo 5: Verificar Componentes e Instalar Componentes Remotos
Verifique as versões do seu Catálogo de Backup do Veeam, Servidor VBR e Console VBR. Opcionalmente, marque a caixa para instalar automaticamente os componentes remotos, se necessário para sua configuração.

![Atualizar Componentes 12.1](https://blog-imgs-23.s3.amazonaws.com/update-components-121.png)

## Passo 6: Especificar Conta de Serviço e Backend do PostgreSQL
Especifique a conta de serviço a ser usada durante o processo de atualização. O instalador enumerará a instância atual do backend PostgreSQL, que geralmente não exigirá alterações para uma atualização in-place. No entanto, se ocorrer um erro de "Autenticação SSPI falhou para o usuário", siga as etapas fornecidas no [artigo KB](https://www.veeam.com/kb4542) vinculado para resolvê-lo.

![Erro SSPI 12.1](https://blog-imgs-23.s3.amazonaws.com/error-sspi-121.png)

## Passo 7: Concluir o Processo de Atualização
Uma janela pop-up aparecerá indicando que o banco de dados será atualizado automaticamente para a nova versão. Clique em "Sim" para prosseguir e, em seguida, em "Atualizar" na janela seguinte.

O instalador desligará os serviços no backend, realizará as atualizações necessárias e atualizará automaticamente todos os componentes em segundo plano. A duração desse processo pode variar de acordo com seu ambiente e desempenho do servidor.

![Atualizado 12.1](https://blog-imgs-23.s3.amazonaws.com/upgraded-121.png)

## Passo 8: Reativar Trabalhos e Verificar a Operação
Após a conclusão do processo de atualização, reabra a interface do VBR e reative quaisquer trabalhos anteriormente desativados. Verifique se a atualização foi bem-sucedida, garantindo que todas as funções estejam operacionais.

![Verificar Novo 12.1](https://blog-imgs-23.s3.amazonaws.com/verify-new-121.png)

Atualizar o Veeam Backup and Replication da versão 12.0 para 12.1 é um processo direto ao seguir esses passos. Ao garantir a preparação e seguir cada passo cuidadosamente, você pode atualizar rapidamente para a versão mais recente, aproveitando recursos aprimorados e atualizações de segurança.
