let prenom = 'gael';

/* Chercher si il y a la lettre "a" dans la variable prenom */
let testPrenom = /a/.test(prenom);
console.log(testPrenom); /* Renvoie true ou false */

/* La même chose mais cette fois avec un objet RegExp */
let testPrenomRegExp = new RegExp('a', 'g'); /* Ne pas oublier le flag */
console.log(testPrenomRegExp.test(prenom)); /* .test indispensable pour tester la RegExp */




/******************************************* FORMULAIRE DE CONNEXION **********************************************************/


/***************** ON ATRAPPE LE FORMULAIRE **************************/

let form = document.querySelector('#loginForm');
/* RMQ : On peut acceder aux différents <input> grâce à la partie name="" */


/*************** VALIDATION DE L'EMAIL ******************************/

/* Ecouter la modification de l'email */
form.email.addEventListener('change', () => {
    validEmail(this); /* Appeler la fct "validEmail" lors d'un changement dans form.email. Je dois PASSER (PRESENTER) dans la fct
    "validEmail ce que l'utilisateur est en train de saisir. On utilise l'élément "this" pour dire que l'on veut présenter
    dans la fonction "validEmail" l'élément que l'on est en train d'écouter. RMQ : Pour l'instant la fct validEmail n'est pas encore créé*/
});

/* Création de la fonction "validEmail" */
const validEmail = function(inputEmail) {
    /* Création d'une RegExp pour valider le format de l'email */
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    /* Test via la RegExp de ce que l'utilisateur a rentré */
    let testEmail = emailRegExp.test(inputEmail.value); /* On ajoute ".value" car on veut tester la valeur de "inputEmail */

    /* Récupération de la balise <small> */
    const smallEmail = document.querySelector('#smallEmail');
    /* On veut incorporer un commentaire dans la balise <small> */
    if (testEmail) {
        smallEmail.innerHTML = "Adresse valide";
        /* On veut changer la couleur de "Adresse valide" à l'aide d'une classe. ATTENTION : en faisant classList.add on rajoute des classes les unes 
        après les autres. Nous ne voulons avoir qu'une seule classe c'est pourquoi on doit faire un remove avant */
        smallEmail.classList.remove('text-danger');
        smallEmail.classList.add('text-success');
        return true;
    } 
    else {
        smallEmail.innerHTML = "Adresse invalide";
        smallEmail.classList.remove('text-success');
        smallEmail.classList.add('text-danger');
        return false;

    };
};

/********************* VALIDATION DU MOT DE PASSE ******************* */

/* Ecouter la modification du password */
form.password.addEventListener('change', () => {
    validPassword(this); /* Appeler la fct "validPassword" lors d'un changement dans form.password. Je dois PASSER (PRESENTER) dans la fct
    "validPassword ce que l'utilisateur est en train de saisir. On utilise l'élément "this" pour dire que l'on veut présenter
    dans la fonction "validPassword" l'élément que l'on est en train d'écouter. RMQ : Pour l'instant la fct validPassword n'est pas encore créé*/
})

/* Création de la fonction "validPassword" */
const validPassword = function(inputPassword) {
    /* Creation de la variable pour le message à afficher dans la balise small */
    let msg;
    /* Variable pour la validation du mot de passe, pour l'instant elle reste sur "false". Au fur et à mesure de nos tests cette variable se changera en "true" */
    let valid = false;
    /* Au moins 3 caractères dans le mot de passe  */
    if (inputPassword.length < 3){
        msg = 'Le mot de passe doit contenir au moins trois caractères';
    }
    /* Au moins une majuscule, on va de nouveau utiliser une Regex   */
    else if (!/[A-Z]/.test(inputPassword.value)) { /* ATTENTION: On met un point d'exclamation car on doit tester si IL N'Y A PAS de majuscule dans le password */
    msg = 'Le mot de passe doit contenir au moins une majuscule';
    }
    /* Au moins une minuscule */
    else if (!/[a-z]/.test(inputPassword.value)) { /* ATTENTION: On met un point d'exclamation car on doit tester si IL N'Y A PAS de minuscule dans le password */
    msg = 'Le mot de passe doit contenir au moins une minuscule';
    }
    /* Au moins un chiffre */
    else if (!/[1-9]/.test(inputPassword.value)) { /* ATTENTION: On met un point d'exclamation car on doit tester si IL N'Y A PAS de chiffre dans le password */
    msg = 'Le mot de passe doit contenir au moins un chiffre';
    }

    /* Si toutes ces fonctions sont validées alors le mot de passe est valide */
    else {
        msg = 'Le mot de passe est valide';
        valid = true;
    }

    /* A cette étape, "msg" ne s'inscrit pas encore dans ma balise <small  */
    /* Récupération de la balise <small> */
    const smallPassword = document.querySelector('#smallPassword');
    /* On veut incorporer un commentaire dans la balise <small> */
    if (valid) {
        smallPassword.innerHTML = "Mot de passe valide";
        /* On veut changer la couleur de "Adresse valide" à l'aide d'une classe. ATTENTION : en faisant classList.add on rajoute des classes les unes 
        après les autres. Nous ne voulons avoir qu'une seule classe c'est pourquoi on doit faire un remove avant */
        smallPassword.classList.remove('text-danger');
        smallPassword.classList.add('text-success');
        return true;
    } 
    else {
        smallPassword.innerHTML = msg ; /* En cas de problème on demande à afficher la variable msg */
        smallPassword.classList.remove('text-success');
        smallPassword.classList.add('text-danger');
        return false;

    };
    
};


/* BLOQUER L'ENVOI DE CONNEXION TANT QUE EMAIL ET MOT DE PASSE NE SONT PAS VALIDES */

/* Ecouter la soumission du formulaire */
form.addEventListener('submit', function(e) { /* Je récupère l'evt "e" en paramètre de la fonction. "e" corespond à l'evt "submit" */
    e.preventDefault();
    if (validEmail(form.email) && validPassword(form.password)) {
        form.submit();
    }  /* Je n'ai pas besoin du "else" car si l'email n'est pas valide je ne soumets rien */
    

})



