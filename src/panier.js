class Panier {
    constructor() {
        this.articles = [];
        this.remiseTotale = 0;
    }

    ajouterArticle(article) {
        this.articles.push(article);
    }

    appliquerCoupon(coupon) {
        this.articles.forEach(article => {
            if (article.prixRemise === article.prix && coupon.pourcentageRemise > 0) {
                const remise = article.prix * (coupon.pourcentageRemise / 100);
                article.prixRemise = Math.max(article.prix - remise, 0);
                this.remiseTotale += remise;
            }
        });
    }
    calculerMontantTotal() {
        return this.articles.reduce((total, article) => total + article.prixRemise, 0) - this.remiseTotale;
    }
}

module.exports = Panier;
