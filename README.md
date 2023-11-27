# API-NODE-JS
#la première chose à faire c'est de créer un fichier .env qui contient:
MONGODB_URL=lien_vers_mongo_atlas
PORT=numero_port
#pour lancer l'application merci d'exécuter ces commandes :
-npm install
-npm start
#pour s'inscrire vous devez utiliser la route /register qui attend en POST un email et password
#pour se connecter vous devez utiliser la route /login qui attend en POST un email et password
#pour voire la liste des utilisateurs vous devez utiliser la route /users en GET qui attend en header la variable AUthorization qui contient le token
#vous pouvez trouver dans le dossier capture les instructions en image
