#!/bin/bash

#################################################################
# Script de automação de projeto
# Requisitos: docker, docker-compose
#
# Descrição: Script de inicialização de projeto docker
#
# uso: bash start.sh   ou sh start.sh
#
#################################################################

echo '  -- build  -- \n'
docker-compose up -d --build

echo '  -- migrations  -- \n'
docker exec -it api-taskmanager yarn migrate

