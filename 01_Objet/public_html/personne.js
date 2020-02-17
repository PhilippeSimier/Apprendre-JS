/* 
 * Classe Personne
 * 
 */
/**
             * Constructeur Personne
             * @param {type} prenom
             * @param {type} nom
             * @param {type} age
             * @param {type} genre
             * @param {type} interets
             * @returns {Personne}
             */
            function Personne(prenom, nom, age, genre, interets) {
                this.nom_complet = {
                    prenom,
                    nom
                };
                this.age = age;
                this.genre = genre;
                this.interets = interets;                
            };
            
            /**
             * Methode salutation
             * @returns {undefined}
             */
            Personne.prototype.saluer = function() {
                alert('Bonjour ! Je m\'appelle ' + this.nom_complet.prenom + '.');
            };
            
            /**
             * Methode presenter bio
             * @returns {undefined}
             */
            Personne.prototype.presenter = function() {
                    var presentation =  this.nom_complet.prenom + ' ' + this.nom_complet.nom + ' a ' + this.age + ' ans. ';
                    if (this.genre === 'homme'){
                        presentation += 'il aime '; 
                    }else{
                        presentation += 'elle aime ';
                    }
                    for (i=0; i < this.interets.length; i++){
                        presentation += this.interets[i] + ' ';
                    }
                    presentation += '.';
                    alert(presentation);
            };
             
            // ajout d'une méthode aurevoir
            Personne.prototype.aurevoir = function() {
                alert(this.nom_complet.prenom + ' est sorti. Au revoir !');
            };
            
/* 
 * Classe Professeur
 * herite de personne
 */

    function Professeur(prenom, nom, age, genre, interets, matiere) {
        Personne.call(this, prenom, nom, age, genre, interets);
        // ajout d'un attribut spécifique pour profeseur
        this.matiere = matiere;
    }

    // Création du prototype de Professeur à partir du prototype de Personne
    Professeur.prototype = Object.create(Personne.prototype);
    // Ajout du constructeur Professeur au prototype
    Professeur.prototype.constructor = Professeur;
            
    // Surcharge de la méthode saluer()
    Professeur.prototype.saluer = function() {
        var prefix;

        if (this.genre === 'homme' || this.genre === 'Homme' || this.genre === 'h' || this.genre === 'H') {
            prefix = 'M.';
        } else if (this.genre === 'femme' || this.genre === 'Femme' || this.genre === 'f' || this.genre === 'F') {
            prefix = 'Mme';
        } else {
            prefix = '';
        }

        alert('Bonjour. Mon nom est ' + prefix + ' ' + this.nom_complet.nom + ', et j\'enseigne ' + this.matiere + '.');
    };   
    
    /* 
 * Classe Etudiant
 * herite de personne
 */

    function Etudiant(prenom, nom, age, genre, interets) {
        Personne.call(this, prenom, nom, age, genre, interets);

    }

    // Création du prototype de Etudiant à partir du prototype de Personne
    Etudiant.prototype = Object.create(Personne.prototype);
    // Ajout du constructeur Etudiant au prototype
    Etudiant.prototype.constructor = Etudiant;
            
    // Surcharge de la méthode saluer()
    Etudiant.prototype.saluer = function() {
        alert("Hello mon nom est " + this.nom_complet.nom + '.');
    }


