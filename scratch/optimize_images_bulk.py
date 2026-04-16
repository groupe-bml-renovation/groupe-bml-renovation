import os
import re

files_to_process = [
    'src/pages/AgenceGrenoble.tsx',
    'src/pages/Amenagement.tsx',
    'src/pages/Amiante.tsx',
    'src/pages/Appartements.tsx',
    'src/pages/BorneElectrique.tsx',
    'src/pages/BoutiquesBureaux.tsx',
    'src/pages/Chambres.tsx',
    'src/pages/Chauffage.tsx',
    'src/pages/Climatisation.tsx',
    'src/pages/CuisinesRenovation.tsx',
    'src/pages/Electricite.tsx',
    'src/pages/EspaceVerre.tsx',
    'src/pages/MaisonsVillas.tsx',
    'src/pages/Menuiserie.tsx',
    'src/pages/Peinture.tsx',
    'src/pages/Piscine.tsx',
    'src/pages/Plomberie.tsx',
    'src/pages/RevetementsMuraux.tsx',
    'src/pages/RevetementsSols.tsx',
    'src/pages/SallesDeBain.tsx',
    'src/pages/SallesDeBainPMR.tsx',
    'src/pages/TerrasseBois.tsx'
]

cert_pattern = r'<img src={cert\.logo} alt={cert\.name} className="h-10 md:h-12 w-auto mb-3 object-contain[^"]*" />'
cert_replacement = '<img src={cert.logo} alt={cert.name} className="h-10 md:h-12 w-auto mb-3 object-contain transition-transform duration-300 group-hover:scale-110" width={120} height={48} loading="lazy" />'

partner_pattern = r'<img src={p\.logoUrl} alt={p\.name} className="max-h-11 md:max-h-12 w-auto object-contain" />'
partner_replacement = '<img src={p.logoUrl} alt={p.name} className="max-h-11 md:max-h-12 w-auto object-contain" width={120} height={44} loading="lazy" />'

for file_path in files_to_process:
    full_path = os.path.join('/Users/toufikaidjadj/Desktop/Groupe-bml-renovation/groupe-bml-renovation', file_path)
    if not os.path.exists(full_path):
        print(f"Skipping {file_path}, not found.")
        continue
        
    with open(full_path, 'r') as f:
        content = f.read()
        
    new_content = re.sub(cert_pattern, cert_replacement, content)
    new_content = re.sub(partner_pattern, partner_replacement, new_content)
    
    if new_content != content:
        with open(full_path, 'w') as f:
            f.write(new_content)
        print(f"Optimized {file_path}")
    else:
        print(f"No changes for {file_path}")
