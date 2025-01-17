.@echo off
REM Script pour automatiser git add, commit et push

REM Vérifie si un message de commit a été fourni
if "%~1"=="" (
    echo Erreur: Veuillez fournir un message de commit
    echo Usage: git-push "votre message de commit"
    exit /b 1
)

REM Exécute les commandes git
git add .
git commit -m "%~1"
git push

echo Opérations git terminées avec succès!
