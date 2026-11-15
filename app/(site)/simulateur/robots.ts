/** Robots proposés par le simulateur. Données inchangées depuis la version d'avant la V2. */

export type Robot = {
  nom: string
  marque: string
  surfaceMax: number
  penteMax: string
  prix: number
  bruit: string
  sansFil: boolean
  url: string
  badge?: string
}

export const ROBOTS: Robot[] = [
  // Mammotion — Yuka (vision, sans fil, 45%)
  { nom: 'YUKA Mini 2 500', marque: 'Mammotion', surfaceMax: 500, penteMax: '45%', prix: 699, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GCCLW2PL', badge: 'Sans fil' },
  { nom: 'YUKA Mini Vision', marque: 'Mammotion', surfaceMax: 700, penteMax: '45%', prix: 1099, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FKTBKDQ1' },
  { nom: 'YUKA Mini 2 1000', marque: 'Mammotion', surfaceMax: 1000, penteMax: '45%', prix: 1299, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GJ4TWVVV' },
  { nom: 'YUKA 2000', marque: 'Mammotion', surfaceMax: 2000, penteMax: '45%', prix: 1385, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FJFW87T4' },
  { nom: 'YUKA 3000', marque: 'Mammotion', surfaceMax: 3000, penteMax: '45%', prix: 1449, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0DT47TX7V' },
  // Mammotion — Luba (LiDAR+RTK, sans fil, 80%)
  { nom: 'LUBA Mini AWD LiDAR', marque: 'Mammotion', surfaceMax: 1500, penteMax: '80%', prix: 1699, bruit: '55 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FCFRC4HP', badge: 'Pentes extrêmes' },
  { nom: 'LUBA Mini 2 AWD 1000', marque: 'Mammotion', surfaceMax: 1000, penteMax: '80%', prix: 1799, bruit: '55 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GJ5T8DRC' },
  { nom: 'LUBA 3 AWD 1500', marque: 'Mammotion', surfaceMax: 1500, penteMax: '80%', prix: 2299, bruit: '55 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GHMGVHWN' },
  { nom: 'LUBA 3 AWD 3000', marque: 'Mammotion', surfaceMax: 3000, penteMax: '80%', prix: 2699, bruit: '55 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0GCZSSZRZ' },
  // Husqvarna
  { nom: 'Automower Aspire R4', marque: 'Husqvarna', surfaceMax: 400, penteMax: '40%', prix: 699, bruit: '59 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B0D9BRY75Y' },
  { nom: 'Automower 310 Mark II', marque: 'Husqvarna', surfaceMax: 1000, penteMax: '40%', prix: 1173, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B0BWKF1VWS', badge: 'Valeur sûre' },
  // Gardena
  { nom: 'SILENO city 500', marque: 'Gardena', surfaceMax: 500, penteMax: '35%', prix: 850, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B078BC3XDQ' },
  { nom: 'SILENO city 600', marque: 'Gardena', surfaceMax: 600, penteMax: '35%', prix: 880, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B09M75W6QD' },
  { nom: 'SILENO life 750', marque: 'Gardena', surfaceMax: 750, penteMax: '35%', prix: 700, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B07MXR9S5K', badge: 'Bon rapport qualité-prix' },
  { nom: 'SILENO life 1000 smart set', marque: 'Gardena', surfaceMax: 1000, penteMax: '35%', prix: 1000, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B09M76JPSB' },
  { nom: 'SILENO life 1250', marque: 'Gardena', surfaceMax: 1250, penteMax: '35%', prix: 825, bruit: '58 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B07MXR49QW' },
  { nom: 'Smart SILENO Free 600', marque: 'Gardena', surfaceMax: 600, penteMax: '35%', prix: 1100, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0DMF8HN4T', badge: 'Sans fil' },
  { nom: 'Smart SILENO Free 750', marque: 'Gardena', surfaceMax: 750, penteMax: '35%', prix: 1250, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0DMF6FRCX' },
  // Worx
  { nom: 'Landroid Plus WR169E', marque: 'Worx', surfaceMax: 250, penteMax: '35%', prix: 424, bruit: '65 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B0DPMTL3HZ', badge: 'Meilleur prix' },
  { nom: 'Landroid Plus WR165E', marque: 'Worx', surfaceMax: 500, penteMax: '35%', prix: 449, bruit: '65 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B0913J9BTB' },
  { nom: 'Landroid Vision WR205E', marque: 'Worx', surfaceMax: 500, penteMax: '35%', prix: 812, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0DHLM3NT5', badge: 'Sans fil' },
  { nom: 'Vision Cloud 2WD WR305E', marque: 'Worx', surfaceMax: 500, penteMax: '35%', prix: 799, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG2L52Q' },
  { nom: 'Vision Cloud 2WD WR308E', marque: 'Worx', surfaceMax: 800, penteMax: '35%', prix: 999, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG31S3K' },
  { nom: 'Vision Cloud 2WD WR312E', marque: 'Worx', surfaceMax: 1200, penteMax: '35%', prix: 1199, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG6VC6M' },
  { nom: 'Vision Cloud 2WD WR318E', marque: 'Worx', surfaceMax: 1800, penteMax: '35%', prix: 1499, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG4B9XR' },
  { nom: 'Vision Cloud 2WD WR330E', marque: 'Worx', surfaceMax: 3000, penteMax: '35%', prix: 2299, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG4WYT4' },
  { nom: 'Vision Cloud 4WD WR340E', marque: 'Worx', surfaceMax: 600, penteMax: '84%', prix: 1499, bruit: '62 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0FVG3XLBJ' },
  // Bosch
  { nom: 'VISIMOW 18V-100', marque: 'Bosch', surfaceMax: 100, penteMax: '25%', prix: 480, bruit: '57 dB', sansFil: true, url: 'https://www.amazon.fr/dp/B0G4RDLH3R' },
  { nom: 'Indego S+ 500', marque: 'Bosch', surfaceMax: 500, penteMax: '27%', prix: 450, bruit: '63 dB', sansFil: false, url: 'https://www.amazon.fr/dp/B08VJJKFBX' },
]
