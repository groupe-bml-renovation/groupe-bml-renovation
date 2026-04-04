import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronDown, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  keywords?: string[];
  intent?: string;
}

interface FAQPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    question: 'Quels services de rénovation proposez-vous ?',
    answer: 'BML Rénovation est spécialisée en rénovation tous corps d\'état. Nous proposons une large gamme de services incluant : rénovation complète d\'appartements, maisons et villas, aménagement d\'intérieur, rénovation de salles de bain (y compris PMR), installation de piscines, travaux d\'électricité, plomberie, peinture, menuiserie, chauffage, climatisation, revêtements de sols et muraux, isolation thermique intérieure, aménagement extérieur et terrasses bois. Chaque projet est entièrement personnalisé selon vos besoins spécifiques.',
    category: 'Services',
    order: 1,
    keywords: ['services rénovation', 'tous corps état', 'rénovation appartement', 'rénovation maison'],
    intent: 'informational',
  },
  {
    id: '2',
    question: 'Proposez-vous un devis gratuit et sans engagement ?',
    answer: 'Oui, nous proposons des devis gratuits, détaillés et sans aucun engagement. Notre équipe de professionnels se déplace directement sur votre chantier pour évaluer votre projet en personne. Lors de cette visite, nous discutons de vos besoins, de vos contraintes, de votre calendrier et de votre budget. Sur la base de cette évaluation sur site, nous établissons un devis personnalisé, précis et adapté à votre projet. Vous pouvez demander rendez-vous via notre formulaire de contact ou en nous appelant directement.',
    category: 'Devis',
    order: 1,
    keywords: ['devis gratuit', 'devis sans engagement', 'estimation projet'],
    intent: 'transactional',
  },
  {
    id: '3',
    question: 'Combien de temps prend une rénovation ou réparation ?',
    answer: 'La durée d\'une rénovation varie considérablement selon l\'ampleur et la complexité de votre projet. Voici quelques repères : les petites réparations et travaux ponctuels prennent quelques jours à une semaine ; une rénovation de salle de bain prend généralement 2-3 semaines ; une cuisine rénovée prend 3-4 semaines ; une rénovation complète d\'un appartement peut prendre 2-3 mois selon la superficie et l\'ampleur des travaux. Nous établissons un planning détaillé et réaliste lors de la consultation initiale, avec des jalons clairs et des dates de livraison précises.',
    category: 'Projet',
    order: 1,
    keywords: ['durée rénovation', 'calendrier projet', 'planning travaux'],
    intent: 'informational',
  },
  {
    id: '4',
    question: 'Êtes-vous garantis et assurés ? Quelle est votre couverture ?',
    answer: 'Oui, absolument. BML Rénovation respecte les plus hauts standards de protection et de sécurité. Tous nos travaux sont couverts par une garantie décennale de nos partenaires (assurance dommages et ouvrage). Notre équipe entièrement qualifiée est couverte par une assurance responsabilité civile professionnelle de nos partenaires. Nous utilisons uniquement des matériaux certifiés et respectons scrupuleusement toutes les normes de construction en vigueur, les codes du bâtiment et les réglementations de sécurité applicables. Votre projet et votre investissement sont pleinement protégés.',
    category: 'Garanties',
    order: 1,
    keywords: ['garantie décennale', 'assurance rénovation', 'protection client'],
    intent: 'informational',
  },
  {
    id: '5',
    question: 'Pouvez-vous travailler avec un petit budget de rénovation ?',
    answer: 'Oui, nous travaillons avec des budgets variés - petits, moyens et importants. Notre objectif est de trouver des solutions adaptées et efficaces peu importe votre budget. Notre équipe est expérimentée dans l\'optimisation des coûts et peut vous proposer des alternatives de matériaux de qualité, des approches pragmatiques et des priorités intelligentes pour maximiser votre investissement. Nous privilégions toujours la qualité même avec des budgets limités. N\'hésitez pas à discuter précisément de votre budget lors de la consultation - cela nous aide à concevoir un projet réaliste et adaptable selon vos moyens financiers.',
    category: 'Budget',
    order: 1,
    keywords: ['budget rénovation limité', 'rénovation économique', 'petit budget'],
    intent: 'informational',
  },
  {
    id: '6',
    question: 'Acceptez-vous les paiements échelonnés ou financements ?',
    answer: 'Oui, nous comprenons que les rénovations représentent un investissement important. Nous pouvons discuter de modalités de paiement flexibles et adaptées à votre situation financière. Généralement, nous demandons un acompte à la signature du devis et du contrat (environ 30%), puis des versements échelonnés et progressifs pendant l\'avancement des travaux. Le solde est généralement dû à la réception et livraison des travaux. Pour les grands projets, nous proposons également des arrangements spécifiques. Consultez-nous pour discuter des modalités de paiement qui conviennent à votre situation.',
    category: 'Paiement',
    order: 1,
    keywords: ['paiement échelonné', 'financement rénovation', 'modalités paiement'],
    intent: 'transactional',
  },
  {
    id: '7',
    question: 'Quel est votre délai de réponse pour une demande ?',
    answer: 'Nous nous engageons à répondre à vos demandes dans un délai de 24 heures ouvrables. Pour les demandes urgentes concernant des dépannages immédiats, nous offrons un service d\'intervention rapide selon la disponibilité actuelle de notre équipe sur le terrain à Grenoble et Isère. Appelez-nous directement au <a href="tel:0756915997" class="text-[#38bdf8] font-bold hover:underline">07 56 91 59 97</a> pour les urgences. Pour les demandes standard, vous pouvez utiliser notre formulaire de contact ou nous appeler - nous vous recontacterons rapidement pour planifier une visite de consultation.',
    category: 'Contact',
    order: 1,
    keywords: ['délai réponse', 'contactez-nous', 'urgence dépannage', 'Grenoble', 'Isère'],
    intent: 'transactional',
  },
  {
    id: '8',
    question: 'Travaillez-vous les week-ends, jours fériés et en urgence ?',
    answer: 'Sur demande spécifique, nous pouvons organiser des interventions les week-ends et jours fériés, particulièrement pour les urgences de dépannage qui ne peuvent pas attendre. Notre équipe d\'urgence est mobilisable selon la disponibilité. Les interventions en dehors des heures de travail standard peuvent être soumises à des tarifs supplémentaires à discuter au préalable. Pour les situations d\'urgence ou dépannage immédiat, contactez-nous directement au <a href="tel:0756915997" class="text-[#38bdf8] font-bold hover:underline">07 56 91 59 97</a> - nous ferons notre maximum pour vous intervenir rapidement.',
    category: 'Disponibilité',
    order: 1,
    keywords: ['urgence rénovation', 'dépannage week-end', 'intervention rapide'],
    intent: 'transactional',
  },
  {
    id: '9',
    question: 'Utilisez-vous des matériaux écologiques et durables ?',
    answer: 'Oui, nous nous engageons progressivement vers des solutions éco-responsables et durables. Nous proposons et recommandons des matériaux certifiés écologiques, durables et respectueux de l\'environnement quand cela est possible. Cela inclut des peintures écologiques, des isolants naturels, des revêtements durables et des solutions de chauffage/climatisation éco-énergétiques. Nous tenons à minimiser l\'impact environnemental de vos travaux. Discutez avec notre équipe des options écologiques disponibles pour votre projet spécifique - nous pouvons adapter les recommandations selon vos priorités écologiques et votre budget.',
    category: 'Environnement',
    order: 1,
    keywords: ['matériaux écologiques', 'rénovation durable', 'éco-responsable'],
    intent: 'informational',
  },
  {
    id: '10',
    question: 'Comment me mettre en contact en cas d\'urgence ou de dépannage ?',
    answer: 'Pour les urgences et dépannages immédiats à Grenoble et en Isère, appelez-nous directement au <a href="tel:0756915997" class="text-[#38bdf8] font-bold hover:underline">07 56 91 59 97</a>. Notre équipe grenobleoise de dépannage d\'urgence est disponible pour vous intervenir au plus vite selon les disponibilités. Vous pouvez également nous envoyer un message d\'urgence via notre formulaire de contact, mais l\'appel téléphonique reste le moyen le plus rapide pour les situations critiques. Décrivez précisément le problème - qu\'il s\'agisse d\'une fuite d\'eau, d\'un problème électrique, d\'une panne de chauffage ou d\'autre urgence - pour que nous puissions vous proposer la solution appropriée rapidement.',
    category: 'Urgence',
    order: 1,
    keywords: ['urgence dépannage', 'appel urgence', 'intervention rapide', 'Grenoble', 'Isère'],
    intent: 'transactional',
  },
  {
    id: '11',
    question: 'Proposez-vous une consultation gratuite pour évaluer mon projet ?',
    answer: 'Oui, nous proposons une consultation gratuite et sans engagement pour évaluer votre projet. Lors de cette visite de consultation, un de nos experts se déplace chez vous pour analyser votre situation, comprendre vos objectifs, évaluer l\'ampleur des travaux nécessaires et estimer les coûts approximatifs. Cette consultation sur site nous permet de collecter les informations nécessaires pour établir un devis précis et personnalisé. C\'est une excellente opportunité pour discuter de vos besoins, vos contraintes, votre budget et votre calendrier avant de prendre toute décision.',
    category: 'Devis',
    order: 2,
    keywords: ['consultation gratuite', 'évaluation projet', 'visite sur site'],
    intent: 'transactional',
  },
  {
    id: '12',
    question: 'Quels types de projets réalisez-vous : appartements, maisons, bureaux ?',
    answer: 'Nous réalisons des projets de rénovation à Grenoble et en Isère pour les résidences privées (appartements, maisons individuelles, villas) ainsi que pour les bâtiments commerciaux, professionnels et tertiaires (boutiques, bureaux, espaces de vente, restaurants). Que votre projet soit résidentiel ou professionnel, petit ou grand, simple ou complexe, notre équipe grenobleoise expérimentée peut vous proposer une solution adaptée. Nous avons une expertise particulière dans la rénovation complète tous corps d\'état, les rénovations de salles de bain et cuisines, les aménagements d\'espaces intérieurs, et les projets d\'envergure en région grenobloise.',
    category: 'Services',
    order: 2,
    keywords: ['rénovation appartement', 'rénovation maison', 'rénovation commerciale', 'Grenoble', 'Isère'],
    intent: 'informational',
  },

  // Section A: Devis, démarrage et process
  {
    id: '13',
    question: 'Comment se déroule la première visite avant devis ?',
    answer: 'On réalise une visite technique sur place, prise de mesures, analyse des supports, repérage des contraintes, accès, copropriété, et objectifs de votre rénovation maison ou rénovation appartement. On clarifie vos priorités, votre niveau de finition, et vos contraintes de calendrier.',
    category: 'Devis et Processus',
    order: 1,
    keywords: ['visite technique', 'avant devis', 'consultation site'],
    intent: 'informational',
  },
  {
    id: '14',
    question: 'Le devis est-il gratuit et sous combien de temps est-il envoyé ?',
    answer: 'Oui, devis gratuit. Le délai dépend du périmètre, rénovation complète, rénovation par pièce, ou rénovation lourde, et on vous annonce un délai dès la visite.',
    category: 'Devis et Processus',
    order: 2,
    keywords: ['devis gratuit', 'délai devis', 'rénovation complète'],
    intent: 'informational',
  },
  {
    id: '15',
    question: 'Que contient un devis détaillé, poste par poste, inclusions, exclusions ?',
    answer: 'Le devis précise les postes, démolition, préparation, peinture, sols, plomberie, électricité, cloisons, cuisine, salle de bain, avec ce qui est inclus, ce qui est exclu, et les options. Objectif, un prix lisible et comparable, sans zones grises.',
    category: 'Devis et Processus',
    order: 3,
    keywords: ['devis détaillé', 'postes travaux', 'inclusions exclusions'],
    intent: 'informational',
  },
  {
    id: '16',
    question: 'Est-ce une rénovation clé en main, coordination de tous les corps de métier ?',
    answer: 'Oui. Entreprise de rénovation clé en main, coordination de tous les corps de métier, pour éviter les retards, les conflits d\'intervention et la perte de qualité.',
    category: 'Devis et Processus',
    order: 4,
    keywords: ['clé en main', 'coordination métiers', 'tous corps état'],
    intent: 'informational',
  },
  {
    id: '17',
    question: 'Qui est mon interlocuteur unique, chef de projet, pendant les travaux ?',
    answer: 'Vous avez un interlocuteur unique, chef de projet ou conducteur de travaux, qui pilote l\'avancement, les artisans, les livraisons et les décisions.',
    category: 'Devis et Processus',
    order: 5,
    keywords: ['chef de projet', 'conducteur travaux', 'interlocuteur unique'],
    intent: 'informational',
  },
  {
    id: '18',
    question: 'Quelles sont les étapes du projet, de la visite jusqu\'aux dernières finitions ?',
    answer: 'Visite, cadrage, devis détaillé, planning, protections, travaux, contrôles qualité, finitions, réception, levée de réserves si besoin, puis ajustements et SAV.',
    category: 'Devis et Processus',
    order: 6,
    keywords: ['étapes projet', 'planning travaux', 'réception finitions'],
    intent: 'informational',
  },
  {
    id: '19',
    question: 'Comment validez-vous les choix et arbitrages sans me noyer de décisions ?',
    answer: 'On simplifie. On vous propose 2 ou 3 options maximum par décision, avec différence de prix, rendu et impact planning. Vous validez vite, et le chantier avance.',
    category: 'Devis et Processus',
    order: 7,
    keywords: ['choix matériaux', 'validations', 'options'],
    intent: 'informational',
  },

  // Section B: Prix, budget et "zéro surprise"
  {
    id: '20',
    question: 'Combien coûte une rénovation maison complète ?',
    answer: 'Le prix dépend de l\'état existant, des réseaux, électricité, plomberie, des matériaux, de la complexité, et des modifications de plan. Une visite est nécessaire pour un chiffrage fiable et réaliste.',
    category: 'Tarifs et Budget',
    order: 1,
    keywords: ['prix rénovation', 'coût maison', 'budget rénovation'],
    intent: 'informational',
  },
  {
    id: '21',
    question: 'Quel est le coût d\'une rénovation intérieure au m² ?',
    answer: 'Le coût au m² varie selon le niveau, rafraîchissement, rénovation complète, rénovation lourde, et selon les pièces. Le devis après visite reste la seule base précise pour votre projet.',
    category: 'Tarifs et Budget',
    order: 2,
    keywords: ['coût m2', 'rénovation intérieure', 'prix au mètre'],
    intent: 'informational',
  },
  {
    id: '22',
    question: 'Quel budget prévoir pour rénover une maison ancienne ?',
    answer: 'On anticipe davantage de points techniques, réseaux, humidité, supports irréguliers, isolation. On cadrera le budget avec un devis détaillé, et une gestion d\'options en cas de découverte.',
    category: 'Tarifs et Budget',
    order: 3,
    keywords: ['maison ancienne', 'budget rénovation', 'imprévus'],
    intent: 'informational',
  },
  {
    id: '23',
    question: 'Quel est le prix d\'un peintre en bâtiment, travaux de peinture bâtiment ?',
    answer: 'Le prix dépend surtout de la préparation, rebouchage, enduits, ponçage, protections, puis peinture. Une bonne peinture, c\'est 50 pour cent préparation, 50 pour cent application.',
    category: 'Tarifs et Budget',
    order: 4,
    keywords: ['peintre bâtiment', 'travaux peinture', 'prix peinture'],
    intent: 'informational',
  },
  {
    id: '24',
    question: 'Qu\'est-ce qui fait varier le prix, état, accès, matériaux, complexité ?',
    answer: 'État des supports, accessibilité chantier, contraintes de copropriété, complexité technique, délais, choix des matériaux, et niveau de finition.',
    category: 'Tarifs et Budget',
    order: 5,
    keywords: ['variation prix', 'facteurs coûts', 'budget variables'],
    intent: 'informational',
  },
  {
    id: '25',
    question: 'Proposez-vous plusieurs niveaux de finition, standard, premium ?',
    answer: 'Oui. On peut proposer plusieurs gammes de matériaux et de finitions, pour aligner budget, durabilité, et rendu esthétique.',
    category: 'Tarifs et Budget',
    order: 6,
    keywords: ['niveaux finition', 'gammes matériaux', 'standard premium'],
    intent: 'informational',
  },
  {
    id: '26',
    question: 'Comment sont gérés les travaux supplémentaires, avenants, validation, impact délai et prix ?',
    answer: 'Avenant écrit, chiffré, validé, avec impact délai et budget. Sans validation, pas de travaux supplémentaires.',
    category: 'Tarifs et Budget',
    order: 7,
    keywords: ['avenants', 'travaux supplémentaires', 'modifications prix'],
    intent: 'informational',
  },
  {
    id: '27',
    question: 'Quel est l\'échéancier de paiement, acompte, étapes, réception ?',
    answer: 'Un acompte lance la planification, puis paiements par étapes selon jalons d\'avancement, et solde à la réception. Tout est écrit dans le devis.',
    category: 'Tarifs et Budget',
    order: 8,
    keywords: ['échéancier paiement', 'acompte', 'jalons avancement'],
    intent: 'informational',
  },

  // Section C: Délais, planning et coordination
  {
    id: '28',
    question: 'Quel délai pour démarrer après validation du devis ?',
    answer: 'On fixe une date selon disponibilités, contraintes de copropriété, et délais de livraison matériaux. La date cible est annoncée au plus tôt après validation.',
    category: 'Délais et Planning',
    order: 1,
    keywords: ['démarrage travaux', 'date chantier', 'planning démarrage'],
    intent: 'informational',
  },
  {
    id: '29',
    question: 'Combien de temps durent en général les travaux de rénovation maison ?',
    answer: 'Cela dépend du périmètre et du niveau technique. Une rénovation par pièce est plus courte qu\'une rénovation complète, et une rénovation lourde est plus longue. On confirme une durée réaliste après visite.',
    category: 'Délais et Planning',
    order: 2,
    keywords: ['durée travaux', 'planning rénovation', 'calendrier projet'],
    intent: 'informational',
  },
  {
    id: '30',
    question: 'Fournissez-vous un planning écrit avec jalons, milestones ?',
    answer: 'Oui. Planning avec grandes étapes, démolition, réseaux, sols, peinture, finitions, réception, pour suivre clairement l\'avancement.',
    category: 'Délais et Planning',
    order: 3,
    keywords: ['planning écrit', 'jalons projet', 'milestones'],
    intent: 'informational',
  },
  {
    id: '31',
    question: 'Comment gérez-vous les retards de livraison matériaux ?',
    answer: 'Anticipation des commandes, propositions d\'alternatives compatibles, et ajustement du planning. L\'objectif est d\'éviter le blocage chantier.',
    category: 'Délais et Planning',
    order: 4,
    keywords: ['retards livraison', 'matériaux', 'planning ajustement'],
    intent: 'informational',
  },
  {
    id: '32',
    question: 'Comment gérez-vous la coactivité des artisans pour éviter le chaos ?',
    answer: 'Coordination planifiée, ordre d\'intervention respecté, et contrôle qualité à chaque étape. Cela évite les reprises, les pertes de temps et les finitions bâclées.',
    category: 'Délais et Planning',
    order: 5,
    keywords: ['coordination artisans', 'ordre intervention', 'qualité'],
    intent: 'informational',
  },
  {
    id: '33',
    question: 'Que se passe-t-il si une contrainte bloque, copro, accès, voisinage ?',
    answer: 'On adapte l\'organisation, livraisons, accès, protection, phasage, et on priorise les tâches qui peuvent avancer sans créer de retards en cascade.',
    category: 'Délais et Planning',
    order: 6,
    keywords: ['contraintes copro', 'blocages', 'adaptation planning'],
    intent: 'informational',
  },

  // Section D: Vivre sur place pendant les travaux
  {
    id: '34',
    question: 'Peut-on rester vivre dans le logement pendant la rénovation ?',
    answer: 'Oui, souvent. On organise le chantier pour rendre la rénovation d\'appartement occupé ou maison habitée compatible avec une vie sur place, selon le périmètre.',
    category: 'Vivre sur Place',
    order: 1,
    keywords: ['logement occupé', 'vivre pendant travaux', 'rénovation habité'],
    intent: 'informational',
  },
  {
    id: '35',
    question: 'Comment isolez-vous la zone chantier pour garder une "vie normale" ?',
    answer: 'Cloisonnement, protections, circulations propres, phasage par pièces. Vous gardez des zones de vie et le chantier reste contenu.',
    category: 'Vivre sur Place',
    order: 2,
    keywords: ['cloisonnement', 'protections', 'zones vie'],
    intent: 'informational',
  },
  {
    id: '36',
    question: 'Quelles mesures pour la poussière, le bruit et la sécurité, enfants, animaux ?',
    answer: 'Protections, confinement, gestion des passages, et règles de sécurité. On planifie les tâches bruyantes quand c\'est possible et on réduit les nuisances au quotidien.',
    category: 'Vivre sur Place',
    order: 3,
    keywords: ['poussière', 'bruit', 'sécurité enfants'],
    intent: 'informational',
  },
  {
    id: '37',
    question: 'Proposez-vous une organisation "cuisine provisoire" ou zones fonctionnelles ?',
    answer: 'Oui, selon le projet. On peut maintenir une zone repas ou installer une solution provisoire quand la cuisine est en rénovation.',
    category: 'Vivre sur Place',
    order: 4,
    keywords: ['cuisine provisoire', 'zones fonctionnelles', 'confort quotidien'],
    intent: 'informational',
  },
  {
    id: '38',
    question: 'Comment gérez-vous la propreté quotidienne et l\'évacuation des déchets ?',
    answer: 'Chantier tenu, déchets évacués, zones de passage propres. La propreté est un standard, pas une option.',
    category: 'Vivre sur Place',
    order: 5,
    keywords: ['propreté', 'évacuation déchets', 'chantier propre'],
    intent: 'informational',
  },

  // Section E: Copropriété, voisins et protection
  {
    id: '39',
    question: 'Comment protégez-vous les parties communes, sols, ascenseur, cages d\'escalier ?',
    answer: 'Protections adaptées, sols, ascenseur, angles, et circulations. Cela évite les dégradations et rassure les copropriétaires.',
    category: 'Copropriété et Voisinage',
    order: 1,
    keywords: ['parties communes', 'protections ascenseur', 'escalier'],
    intent: 'informational',
  },
  {
    id: '40',
    question: 'Quels horaires de chantier en copropriété et comment évitez-vous les conflits ?',
    answer: 'On respecte les horaires de l\'immeuble et on réduit les nuisances. Une bonne organisation, c\'est moins de bruit, moins de poussière, moins de tensions.',
    category: 'Copropriété et Voisinage',
    order: 2,
    keywords: ['horaires chantier', 'nuisances', 'respect voisins'],
    intent: 'informational',
  },
  {
    id: '41',
    question: 'Vous occupez-vous des contraintes de l\'immeuble, accès, stationnement, livraison ?',
    answer: 'Oui. On anticipe les accès, livraisons, stationnement, et les protections nécessaires pour un chantier fluide.',
    category: 'Copropriété et Voisinage',
    order: 3,
    keywords: ['accès chantier', 'stationnement', 'livraisons'],
    intent: 'informational',
  },
  {
    id: '42',
    question: 'Faites-vous un état des lieux, photos de protection avant démarrage ?',
    answer: 'Oui. Repérage et photos, puis protections, avant lancement des travaux.',
    category: 'Copropriété et Voisinage',
    order: 4,
    keywords: ['état des lieux', 'photos', 'avant travaux'],
    intent: 'informational',
  },

  // Section F: Qualité, finitions et réception
  {
    id: '43',
    question: 'Comment garantissez-vous des finitions impeccables, jusqu\'aux derniers détails ?',
    answer: 'Préparation soignée, contrôles réguliers, et reprises si nécessaire. Les finitions, peinture, joints, alignements, coupes, sont traitées comme un poste central.',
    category: 'Qualité et Réception',
    order: 1,
    keywords: ['finitions', 'qualité', 'contrôles réguliers'],
    intent: 'informational',
  },
  {
    id: '44',
    question: 'Comment se passe la réception de chantier et la levée de réserves ?',
    answer: 'On fait une visite de réception, on note les réserves si besoin, puis on planifie leur levée. Vous récupérez un logement propre, fini, et conforme.',
    category: 'Qualité et Réception',
    order: 2,
    keywords: ['réception chantier', 'levée réserves', 'conformité'],
    intent: 'informational',
  },
  {
    id: '45',
    question: 'Que couvre votre SAV après travaux, retouches, ajustements ?',
    answer: 'Retouches et ajustements selon le projet. On reste disponible après livraison pour finaliser proprement les détails.',
    category: 'Qualité et Réception',
    order: 3,
    keywords: ['SAV', 'retouches', 'après-vente'],
    intent: 'informational',
  },
  {
    id: '46',
    question: 'Avez-vous des exemples avant/après de rénovations similaires ?',
    answer: 'Oui. On peut partager des réalisations de rénovation maison, rénovation appartement, cuisine, salle de bain, avec photos avant/après.',
    category: 'Qualité et Réception',
    order: 4,
    keywords: ['avant après', 'réalisations', 'portfolio'],
    intent: 'informational',
  },

  // Section G: Imprévus techniques
  {
    id: '47',
    question: 'Que faites-vous si on découvre de l\'humidité, une électricité non conforme, une plomberie fatiguée ?',
    answer: 'On sécurise, on documente, puis on vous propose des solutions chiffrées, avec impact délai et budget. Vous validez, puis on intervient.',
    category: 'Imprévus Techniques',
    order: 1,
    keywords: ['humidité', 'électricité', 'plomberie', 'imprévus'],
    intent: 'informational',
  },
  {
    id: '48',
    question: 'Faites-vous un diagnostic initial pour limiter les surprises ?',
    answer: 'Oui. La visite sert à repérer un maximum de risques visibles. Dans l\'ancien, certaines surprises n\'apparaissent qu\'à l\'ouverture, mais on réduit l\'incertitude au maximum.',
    category: 'Imprévus Techniques',
    order: 2,
    keywords: ['diagnostic', 'risques', 'ancien bâtiment'],
    intent: 'informational',
  },
  {
    id: '49',
    question: 'Comment communiquez-vous quand il y a un imprévu, options, coûts, délais, arbitrage ?',
    answer: 'Explication simple, 2 ou 3 options, chiffrage clair, impact planning. Vous choisissez vite, sans confusion.',
    category: 'Imprévus Techniques',
    order: 3,
    keywords: ['communication imprévu', 'options coûts', 'décision rapide'],
    intent: 'informational',
  },

  // Section H: Prestations
  {
    id: '50',
    question: 'Quels types de travaux prenez-vous en charge ?',
    answer: 'Rénovation intérieure, peinture, sols, plomberie, électricité, cloisons, cuisine, salle de bain, et coordination tous corps d\'état selon le périmètre.',
    category: 'Prestations',
    order: 1,
    keywords: ['types travaux', 'prestation', 'tous corps état'],
    intent: 'informational',
  },
  {
    id: '51',
    question: 'Faites-vous la rénovation extérieure, façade, peinture extérieure ?',
    answer: 'Selon le projet. La visite permet de valider faisabilité, accès et périmètre.',
    category: 'Prestations',
    order: 2,
    keywords: ['rénovation extérieure', 'façade', 'peinture extérieure'],
    intent: 'informational',
  },
  {
    id: '52',
    question: 'Intervenez-vous sur rénovation maison complète ou aussi par pièce ?',
    answer: 'Les deux. Rénovation maison complète, rénovation appartement complet, ou rénovation par pièce, cuisine, salle de bain, séjour, chambre.',
    category: 'Prestations',
    order: 3,
    keywords: ['rénovation complète', 'par pièce', 'partielle'],
    intent: 'informational',
  },
  {
    id: '53',
    question: 'Faites-vous uniquement la peinture, peintre en bâtiment, si besoin ?',
    answer: 'Oui, peinture intérieure, peinture extérieure selon projet, avec préparation des supports pour un rendu durable.',
    category: 'Prestations',
    order: 4,
    keywords: ['peinture seule', 'peintre bâtiment', 'préparation'],
    intent: 'informational',
  },
  {
    id: '54',
    question: 'Êtes-vous une entreprise de rénovation tous corps d\'état ou travaillez-vous en sous-traitance ?',
    answer: 'Nous pilotons en clé en main, avec coordination de tous les métiers. Le point important, un interlocuteur unique et une organisation maîtrisée.',
    category: 'Prestations',
    order: 5,
    keywords: ['tous corps état', 'clé en main', 'coordination'],
    intent: 'informational',
  },

  // Section I: Design, choix matériaux, accompagnement
  {
    id: '55',
    question: 'Pouvez-vous m\'aider à choisir un style et des matériaux sans me perdre ?',
    answer: 'Oui. On vous guide avec inspirations, références, et choix cadrés, pour avancer vite et garder une cohérence.',
    category: 'Design et Matériaux',
    order: 1,
    keywords: ['style', 'matériaux', 'conseil design'],
    intent: 'informational',
  },
  {
    id: '56',
    question: 'Proposez-vous des recommandations d\'aménagement, circulation, rangements, confort ?',
    answer: 'Oui. On conseille sur circulation, rangements, ergonomie, lumière, et confort, pour améliorer le quotidien, pas juste refaire "du joli".',
    category: 'Design et Matériaux',
    order: 2,
    keywords: ['aménagement', 'rangements', 'ergonomie', 'confort'],
    intent: 'informational',
  },
  {
    id: '57',
    question: 'Comment validez-vous les choix pour éviter les regrets ?',
    answer: 'Échantillons, visuels, et checklists de validation. On verrouille les décisions avant commande, pour éviter les erreurs coûteuses.',
    category: 'Design et Matériaux',
    order: 3,
    keywords: ['validation choix', 'échantillons', 'visuels'],
    intent: 'informational',
  },

  // Section J: Assurances, garanties, conformité
  {
    id: '58',
    question: 'Avez-vous une assurance décennale et responsabilité civile pro ?',
    answer: 'Oui, nous pouvons fournir les attestations d\'assurance décennale et responsabilité civile professionnelle avant démarrage, selon la nature des travaux.',
    category: 'Assurances et Garanties',
    order: 1,
    keywords: ['assurance décennale', 'responsabilité civile', 'attestations'],
    intent: 'informational',
  },
  {
    id: '59',
    question: 'Quelles garanties s\'appliquent après les travaux ?',
    answer: 'Selon les travaux, s\'appliquent les garanties légales, parfait achèvement, biennale sur certains équipements, et décennale sur les ouvrages concernés. On vous précise ce qui s\'applique à votre chantier.',
    category: 'Assurances et Garanties',
    order: 2,
    keywords: ['garanties légales', 'parfait achèvement', 'biennale', 'décennale'],
    intent: 'informational',
  },
  {
    id: '60',
    question: 'Gérez-vous les normes et la conformité ?',
    answer: 'Oui, selon la nature des travaux, notamment électricité, plomberie, ventilation, et sécurité. L\'objectif est un chantier propre et conforme.',
    category: 'Assurances et Garanties',
    order: 3,
    keywords: ['normes', 'conformité', 'électricité', 'sécurité'],
    intent: 'informational',
  },

  // Section K: Cas investisseur et pro
  {
    id: '61',
    question: 'Pouvez-vous rénover entre deux locataires avec un délai court et prévisible ?',
    answer: 'Oui, si le périmètre est clair et les décisions matériaux sont rapides. On planifie serré et on livre propre, pour réduire la vacance locative.',
    category: 'Investisseurs et Professionnels',
    order: 1,
    keywords: ['locataires', 'vacance locative', 'délai court'],
    intent: 'informational',
  },
  {
    id: '62',
    question: 'Pouvez-vous tenir une date d\'ouverture, cabinet, boutique, bureau, avec chantier propre ?',
    answer: 'Oui, avec planning jalonné, décisions rapides, et organisation chantier maîtrisée. On vise une livraison propre, compatible avec votre activité.',
    category: 'Investisseurs et Professionnels',
    order: 2,
    keywords: ['date ouverture', 'cabinet', 'boutique', 'bureau'],
    intent: 'informational',
  },
];

const generateFAQSchema = (faqs: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/<[^>]*>/g, '')
      }
    }))
  };
};

const FAQ: React.FC<FAQPageProps> = ({ onBack, onNavigate = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    navigate(isGrenoble ? '/grenoble/?scrollTo=contact-form' : '/?scrollTo=contact-form');
  };

  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify(generateFAQSchema(FAQ_DATA));
    document.head.appendChild(schemaScript);

    return () => {
      document.head.removeChild(schemaScript);
    };
  }, []);

  const categories = Array.from(new Set(FAQ_DATA.map(faq => faq.category))).sort();

  const filteredFaqs = FAQ_DATA.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const SEO = {
    title: isGrenoble
      ? 'Rénovation Maison Grenoble & Isère | FAQ Expert en Rénovation | BML'
      : 'Rénovation Maison & Travaux | FAQ Entreprise de Rénovation | Groupe BML',
    description: isGrenoble
      ? 'FAQ rénovation maison Grenoble et Isère : devis gratuit, tarifs, délais, garanties décennales. Expert en rénovation complète, rénovation intérieure, tous corps d\'état en Isère. Consultez nos experts.'
      : 'FAQ rénovation maison : devis, tarifs, délais, garanties décennales. Spécialiste en rénovation complète, rénovation intérieure, peintre bâtiment et travaux tous corps d\'état. Consultez nos experts.',
    keywords: isGrenoble
      ? 'rénovation maison Grenoble, rénovation Isère, rénovation Grenoble, entreprise rénovation Grenoble, travaux rénovation Isère, peintre Grenoble, plombier Grenoble, électricien Grenoble, rénovation intérieure Grenoble, rénovation maison ancienne Grenoble, prix rénovation Grenoble'
      : 'rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation',
    ogTitle: isGrenoble
      ? 'FAQ Rénovation Maison Grenoble & Isère - Expert en Travaux | BML'
      : 'Rénovation Maison Complète - Questions Fréquentes | Groupe BML',
    ogDescription: isGrenoble
      ? 'Trouvez réponses à vos questions sur rénovation maison à Grenoble. Expert en travaux de rénovation, devis gratuit, intervention Isère.'
      : 'Découvrez les réponses à toutes vos questions sur les travaux de rénovation maison. Expert en rénovation intérieure et travaux bâtiment.',
    twitterTitle: isGrenoble
      ? 'FAQ Rénovation Maison Grenoble - BML'
      : 'FAQ Rénovation Maison - Groupe BML',
    twitterDescription: isGrenoble
      ? 'Questions fréquentes sur rénovation maison à Grenoble, travaux Isère, tarifs et délais.'
      : 'Questions fréquentes sur la rénovation maison, travaux, tarifs et délais.',
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <Helmet>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta name="keywords" content={SEO.keywords} />
        <meta property="og:title" content={SEO.ogTitle} />
        <meta property="og:description" content={SEO.ogDescription} />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:title" content={SEO.twitterTitle} />
        <meta name="twitter:description" content={SEO.twitterDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        {isGrenoble && (
          <>
            <meta name="geo.region" content="FR-38" />
            <meta name="geo.placename" content="Grenoble" />
            <link rel="canonical" href={`${window.location.origin}/grenoble/faq`} />
          </>
        )}
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="text-center mb-16 py-12">
          <span className="inline-block text-[#38bdf8] text-sm font-semibold uppercase tracking-wide mb-4">
            Votre Ressource Complète
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              {isGrenoble
                ? 'Rénovation Maison Grenoble : Questions Fréquemment Posées'
                : 'Rénovation Maison : Questions Fréquemment Posées'}
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isGrenoble
              ? 'Découvrez les réponses détaillées à vos questions sur nos services de rénovation maison à Grenoble et en Isère. Rénovation complète, rénovation intérieure, tous corps d\'état. Expert local en rénovation, nous expliquons nos tarifs, délais, garanties décennales et engagements. Notre équipe grenobleoise partage ses conseils pratiques pour votre projet de rénovation. Si vous ne trouvez pas votre réponse, contactez-nous directement pour une consultation personnalisée gratuite à Grenoble.'
              : 'Découvrez les réponses détaillées à vos questions sur nos services de rénovation maison complète, travaux de rénovation, rénovation intérieure et extérieure. Expert en rénovation tous corps d\'état, nous expliquons nos tarifs, délais, garanties décennales et engagements. Notre équipe de peintres en bâtiment et artisans rénovation partage ses conseils pratiques pour votre projet. Si vous ne trouvez pas votre réponse, contactez-nous directement pour une consultation personnalisée gratuite.'
            }
          </p>
        </div>

        <div className="mb-12">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cherchez par mot-clé : devis, budget, durée, garantie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#38bdf8] focus:ring-2 focus:ring-cyan-200 transition-all"
              aria-label="Rechercher dans les questions fréquemment posées"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-[#38bdf8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous les sujets
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#38bdf8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredFaqs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucune question trouvée
            </h3>
            <p className="text-gray-600">
              Essayez une autre recherche ou consultez notre page de contact pour poser votre question.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredFaqs.map((faq) => (
              <motion.article
                key={faq.id}
                variants={itemVariants}
                className="bg-white border-2 border-gray-200 rounded-lg hover:border-[#38bdf8] transition-all"
                itemScope
                itemType="https://schema.org/FAQPage"
              >
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 flex items-start justify-between hover:bg-gray-50 transition-colors"
                  aria-expanded={expandedId === faq.id}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="headline">
                      {faq.question}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block text-xs font-medium text-[#38bdf8] bg-cyan-50 px-3 py-1 rounded-full">
                        {faq.category}
                      </span>
                      {faq.intent && (
                        <span className="inline-block text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {faq.intent === 'transactional' ? 'Action' : 'Information'}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 flex-shrink-0 ml-4 transition-transform ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {expandedId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 px-6 py-4 bg-gray-50"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p className="text-gray-700 leading-relaxed" itemProp="text" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </motion.div>
                )}
              </motion.article>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-center mt-20 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isGrenoble
              ? "Vous n'avez pas trouvé votre réponse sur la rénovation maison à Grenoble ?"
              : "Vous n'avez pas trouvé votre réponse sur la rénovation maison ?"}
          </h2>
          <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
            {isGrenoble
              ? 'Notre entreprise de rénovation grenobleoise est là pour répondre à toutes vos questions sur les travaux de rénovation en Isère. Contactez-nous directement et nous vous fournirons une réponse personnalisée et un devis gratuit sans engagement.'
              : 'Notre entreprise de rénovation est là pour répondre à toutes vos questions sur les travaux de rénovation. Contactez-nous directement et nous vous fournirons une réponse personnalisée et un devis sans engagement.'}
          </p>
          <button
            onClick={scrollToContactForm}
            className="inline-flex items-center gap-2 bg-white text-[#38bdf8] font-semibold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors"
          >
            Nous Contacter
          </button>
        </motion.div>
      </motion.div>

      <FooterSection onNavigateToServices={() => onBack()} onNavigate={onNavigate} />
    </div>
  );
};

export default FAQ;
