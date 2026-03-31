# Audit GEO & SEO - Groupe BML Rénovation

Ce document présente l'audit complet du site, la classification des pages et la stratégie GEO (Generative Engine Optimization) pour maximiser la visibilité sur les moteurs de recherche IA (Perplexity, SearchGPT, Gemini, etc.).

## 🚀 État d'avancement (Mars 2026)

### ✅ Phase 1 : Audit & Inventaire (100% Terminé)
- Mapping complet des URL.
- Classification par intention (Locale / Service / Informationnelle).
- Identification des manques E-E-A-T.

### 🔄 Phase 2 : Refonte "Answer-First" (40% - En cours)
- [x] **Page d'accueil (Global)** : `GEOSummary` ajouté, Meta et Schema enrichis.
- [x] **Page d'accueil (Grenoble)** : `GEOSummary` local ajouté, SEO local optimisé.
- [x] **Service Salles de Bain** : `GEOSummary` + `FAQSection` + Réponse directe ajoutée.
- [x] **Service Cuisines** : `GEOSummary` + `FAQSection` + Réponse directe ajoutée.
- [ ] Service Rénovation Énergétique : (À venir)
- [ ] Service Peinture : (À venir)
- [ ] Page À Propos : Renforcement des preuves E-E-A-T (À venir)

### 🔄 Phase 3 : Structuration Technique (60% - En cours)
- [x] Schémas Globaux (`Organization`, `LocalBusiness`, `ServiceCatalog`) enrichis.
- [x] Schémas Locaux (Grenoble) avec coordonnées précises et FAQ structurée.
- [x] Composant `GEOSummary` réutilisable créé.
- [x] Composant `FAQSection` réutilisable créé.
- [ ] Balisage sémantique Hn vérifié sur 100% des pages (En cours).

---

## 1. Inventaire des URLs et Classification

| URL (Path) | Type de Page | Sujet Principal | Intention | Valeur Business | État |
|:---|:---|:---|:---|:---|:---|
| `/` | Accueil | Rénovation globale | Information/Conversion | Critique | ✅ GEO Optimized |
| `/grenoble` | Accueil Local | Rénovation Grenoble | Locale/Conversion | Critique | ✅ GEO Optimized |
| `/salles-de-bain` | Service | Rénovation SDB | Spécifique/Conversion | Haute | ✅ GEO Optimized |
| `/cuisines` | Service | Rénovation Cuisine | Spécifique/Conversion | Haute | ✅ GEO Optimized |
| `/salles-de-bain-pmr`| Service | SDB PMR | Niche/Conversion | Haute | ⏳ |
| `/projets` | Portfolio | Réalisations | Confiance/Exemple | Haute | ⏳ |
| `/apropos` | À propos | Qui sommes-nous ? | Confiance/Autorité | Haute | 🔄 En cours |

---

## 2. Stratégie de Configuration GEO Par Page

### Objectifs Généraux Appliqués :
1. **Réponse Directe (H0)** : Bloc `GEOSummary` placé après le Hero pour capter l'attention des IA et des utilisateurs pressés.
2. **FAQ GEO** : Intégration du composant `FAQSection` répondant aux intentions de prix, de délai et de faisabilité.
3. **E-E-A-T enrichi** : Rappel systématique de la Garantie Décennale et des certifications (RGE).
4. **Schémas JSON-LD** : Injection dynamique de schémas `FAQPage` et `Service` complexes.

---

## 🛠 Prochaines Étapes Immédiates
1. **Extension** : Déployer le modèle "Answer-First" sur les pages "Énergie" et "Peinture".
2. **Maillage** : Créer des liens sémantiques entre les réponses de la FAQ et les formulaires de devis.
3. **Visual Proof** : Utiliser des légendes d'images (Alt text) hautement descriptives pour le SEO visuel (IA Vision).
