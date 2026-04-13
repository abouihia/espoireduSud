# Plan d'Implémentation : Micro-interaction Footer Newsletter

**Objectif :** Implémenter l'Option 1 (micro-interaction inline) pour le formulaire d'inscription à la newsletter dans le footer afin de le rendre premium.
**Architecture :** Utilisation du flux de contrôle `@if` d'Angular pour alterner entre l'état initial, le succès, et l'erreur. Gestion d'état dans le composant Typescript (incluant un faux délai de chargement), et animations de transition en CSS (glassmorphism).
**Tech Stack :** Angular (TS/HTML), CSS pour les animations.

### Tâche 1 : Ajout de la logique asynchrone (TypeScript)
**Fichiers :**
- Modifier : `src/app/components/footer/footer.component.ts`

**Démarche :**
1. Ajouter la variable d'état `isSubmitting = false;`
2. Mettre à jour la méthode `saveEmail()` pour inclure `this.isSubmitting = true`.
3. Encapsuler les deux cas (succès / retour "déjà inscrit") dans un `setTimeout` de simulation de ~600ms.
4. Assurer que la désactivation des messages soit fixée à `setTimeout(..., 4000)`.

### Tâche 2 : Refactorisation de la vue (HTML)
**Fichiers :**
- Modifier : `src/app/components/footer/footer.component.html`

**Démarche :**
1. Ajouter la directive `@if (!showSuccessPopup && !existMail)` autour du `div.input-group` (et son label).
2. Lier l'attribut `disabled` du bouton à `isSubmitting` et modifier le texte du bouton (`@if (isSubmitting) { Envoi... } @else { Souscrire }`).
3. Créer un sous-bloc `@else if (showSuccessPopup)` qui contient le bloc de félicitations.
4. Créer un sous-bloc `@else if (existMail)` qui contient l'avertissement.
5. Retirer l'ancien code d'alerte en position absolue (les alertes Bootstrap classiques).

### Tâche 3 : Application des Animations (CSS)
**Fichiers :**
- Modifier : `src/app/components/footer/footer.component.css`

**Démarche :**
1. Ajouter des styles `keyframes` pour l'effet `fade-in-scale` (0% opacity/scale 0.95 -> 100% opacity/scale 1).
2. Créer une classe `.inline-feedback-container` qui réutilise et améliore les effets originaux "glassmorphism" (`background: rgba(...)` + `backdrop-filter`).
3. Appliquer ces classes sur les blocs HTML générés à la Tâche 2.

---
*Ce plan est prêt à être exécuté.*
