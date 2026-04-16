const fs = require('fs');
const path = require('path');

const PARENT_DIR = '/Users/toufikaidjadj/Desktop/Groupe-bml-renovation/groupe-bml-renovation/src/pages';
const filesToProcess = [
  'Salons.tsx', 'CuisinesRenovation.tsx', 'Chambres.tsx', 'SallesDeBain.tsx', 'SallesDeBainPMR.tsx', 'Amenagement.tsx',
  'Piscine.tsx', 'Plomberie.tsx', 'Electricite.tsx', 'Climatisation.tsx', 'Chauffage.tsx', 'Menuiserie.tsx', 'Amiante.tsx',
  'RevetementsSols.tsx', 'WallCoverings.tsx', 'BorneElectrique.tsx', 'Appartements.tsx', 'MaisonsVillas.tsx', 'BoutiquesBureaux.tsx',
  'TerrasseBois.tsx', 'EspaceVerre.tsx'
];

const peintureContent = fs.readFileSync(path.join(PARENT_DIR, 'Peinture.tsx'), 'utf-8');

// Extract the Partners Block from Peinture
const partnersStartMarker = '{/* Nos Partenaires de Confiance Section - Static Grid */}';
const partnersEndMarker = '      {/* FAQ Section */}';
const startIndex = peintureContent.indexOf(partnersStartMarker);
const endIndex = peintureContent.indexOf(partnersEndMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error("Markers not found in Peinture.tsx");
    process.exit(1);
}

const partnersBlock = peintureContent.slice(startIndex, endIndex).trim();

for (const file of filesToProcess) {
    const filePath = path.join(PARENT_DIR, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Most robust way: find the "Nos partenaires de confiance" text
    const pMarker = "Nos partenaires de confiance";
    const markerIndex = content.indexOf(pMarker);
    
    if (markerIndex !== -1) {
        const sectionStart = content.lastIndexOf('<section', markerIndex);
        const sectionEnd = content.indexOf('</section>', markerIndex) + 10;
        
        if (sectionStart !== -1 && sectionEnd !== -1) {
            content = content.substring(0, sectionStart) + partnersBlock + "\n\n      " + content.substring(sectionEnd);
            console.log(`Updated ${file}`);
        }
    } else if (content.includes('<PartnersSection />')) {
        content = content.replace('<PartnersSection />', partnersBlock);
         console.log(`Updated component in ${file}`);
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
}
