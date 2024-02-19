class Produit {
    constructor(nom, quantite, datePeremption) {
        this.nom = nom;
        this.quantite = quantite;
        this.datePeremption = datePeremption;
    }
}

class Rayon {
    constructor() {
        this.stock = [];
    }

    ajouterProduit(produit) {
        this.stock.push(produit);
        console.log(`Produit ajouté : ${produit.nom}`);
        this.verifierStock();
    }

    supprimerProduit(nomProduit) {
        const index = this.stock.findIndex(produit => produit.nom === nomProduit);

        if (index !== -1) {
            this.stock.splice(index, 1);
            console.log(`Produit supprimé : ${nomProduit}`);
        } else {
            console.log(`Produit non trouvé : ${nomProduit}`);
        }

        this.verifierStock();
    }

    verifierStock() {
        console.log('Stock actuel :');
        this.stock.forEach(produit => {
            console.log(`${produit.nom} - Quantité : ${produit.quantite} - Date de péremption : ${produit.datePeremption}`);
        });

        // Vérifier les quantités et dates de péremption
        this.stock.forEach(produit => {
            if (produit.quantite < 0) {
                console.log(`Attention! Stock négatif pour ${produit.nom}`);
            }

            if (new Date(produit.datePeremption) < new Date()) {
                console.log(`Attention! Produit périmé : ${produit.nom}`);
            }
        });
    }

    visualiserEvolutionStock(dateDebut, dateFin) {
        console.log(`Evolution du stock entre ${dateDebut} et ${dateFin}:`);
        const produitsPendantPeriode = this.stock.filter(produit => {
            const dateProduit = new Date(produit.datePeremption);
            return dateProduit >= new Date(dateDebut) && dateProduit <= new Date(dateFin);
        });

        produitsPendantPeriode.forEach(produit => {
            console.log(`${produit.nom} - Quantité : ${produit.quantite} - Date de péremption : ${produit.datePeremption}`);
        });
    }
}

// Exemple d'utilisation
const rayon = new Rayon();

const produit1 = new Produit('Pommes', 50, '2024-02-28');
const produit2 = new Produit('Bananes', 30, '2024-03-15');

rayon.ajouterProduit(produit1);
rayon.ajouterProduit(produit2);

rayon.supprimerProduit('Pommes');

rayon.ajouterProduit(new Produit('Oranges', -10, '2024-02-20')); // Stock négatif
rayon.ajouterProduit(new Produit('Lait', 20, '2023-12-01')); // Produit périmé

rayon.visualiserEvolutionStock('2024-01-01', '2024-03-01');