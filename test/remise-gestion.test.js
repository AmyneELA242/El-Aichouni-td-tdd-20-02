const { expect } = require('chai');
const Article = require('../src/article.js');
const Coupon = require('../src/coupon.js');
const Panier = require('./panier.js');

describe('Gestion des remises', () => {
    it('devrait appliquer correctement la remise d\'un coupon sur le prix d\'un article', () => {
        const panier = new Panier();
        const article = new Article('ProduitA', 100);
        panier.ajouterArticle(article);
        const coupon = new Coupon('CODE123', 'Réduction ProduitA', 15);
        panier.appliquerCoupon(coupon);
        expect(article.prixRemise).to.equal(85);
    });

    it('ne devrait pas appliquer la remise du coupon plus d\'une fois sur le même article', () => {
        const panier = new Panier();
        const article = new Article('ProduitB', 50);
        panier.ajouterArticle(article);
        const coupon = new Coupon('CODE456', 'Réduction ProduitB', 20);
        panier.appliquerCoupon(coupon);
        panier.appliquerCoupon(coupon);
        expect(article.prixRemise).to.equal(30);
    });
});