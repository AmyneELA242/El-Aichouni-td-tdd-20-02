const { expect } = require('chai');
const sinon = require('sinon');
const { Produit, Rayon } = require('./votre_fichier_contenant_les_classes');

describe('Gestion des stocks', () => {
    let rayon;

    beforeEach(() => {
        rayon = new Rayon();
    });

    it('devrait ajouter un produit au stock', () => {
        const produit = new Produit('Pommes', 50, '2024-02-28');
        rayon.ajouterProduit(produit);
        expect(rayon.stock).to.have.lengthOf(1);
    });

    it('devrait supprimer un produit du stock', () => {
        const produit = new Produit('Pommes', 50, '2024-02-28');
        rayon.stock = [produit];
        rayon.supprimerProduit('Pommes');
        expect(rayon.stock).to.have.lengthOf(0);
    });

    it('devrait vérifier que la quantité de produits est correcte après un ajout', () => {
        const produit = new Produit('Pommes', 50, '2024-02-28');
        rayon.ajouterProduit(produit);
        const produitAjoute = rayon.stock.find(p => p.nom === 'Pommes');
        expect(produitAjoute.quantite).to.equal(50);
    });

    it('ne devrait pas avoir une quantité de stock négative', () => {
        const consoleSpy = sinon.spy(console, 'log');
        const produit = new Produit('Pommes', -10, '2024-02-28');
        rayon.ajouterProduit(produit);
        expect(consoleSpy.calledWith('Attention! Stock négatif pour Pommes')).to.be.true;
        consoleSpy.restore();
    });

    it('ne devrait pas avoir de produit périmé', () => {
        const consoleSpy = sinon.spy(console, 'log');
        const produitPerime = new Produit('Lait', 20, '2023-12-01');
        rayon.ajouterProduit(produitPerime);
        expect(consoleSpy.calledWith('Attention! Produit périmé : Lait')).to.be.true;
        consoleSpy.restore();
    });

    it('devrait avoir une cohérence dans la périodicité d\'évolution du stock', () => {
        // Assurez-vous que les méthodes pour visualiser l'évolution du stock fonctionnent correctement.
        // Vous pouvez simuler l'ajout/suppression de produits sur différentes périodes et vérifier les résultats.
    });
});