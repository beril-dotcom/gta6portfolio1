export const image = (name) => '/media/' + name + '.webp';
export const video = (name) => '/media/' + name + '.mp4';

export const heroScenes = [
  { name: 'Night Drive', location: 'VICE CITY / AFTER DARK', clip: 'night-drive', poster: 'night-drive-poster' },
  { name: 'The Keys', location: 'THE LEONIDA KEYS', clip: 'keys-drive', poster: 'keys-drive-poster' },
];

export const characters = [
  { name: 'Jason Duval', tag: 'The Leonida Keys', photo: 'jason', bio: 'An Army veteran looking for an easier life, Jason finds work in the Keys and a new set of complications when he meets Lucia.' },
  { name: 'Lucia Caminos', tag: 'From Liberty City', photo: 'lucia', bio: 'Fresh out of prison, Lucia wants the life her family dreamed about. She sees a future with Jason and is determined to change their odds.' },
  { name: 'Cal Hampton', tag: 'The Leonida Keys', photo: 'cal', bio: 'Jason’s friend and one of Brian’s associates, Cal prefers a few beers at home and an ear on Coast Guard radio.' },
  { name: 'Boobie Ike', tag: 'Vice City', photo: 'boobie', bio: 'A Vice City fixture with interests in real estate, nightlife, and music. His latest bet is Only Raw Records.' },
  { name: 'Dre’Quan Priest', tag: 'Only Raw Records', photo: 'drequan', bio: 'An aspiring music mogul, Dre’Quan is looking to break into the Vice City scene with his new act, Real Dimez.' },
  { name: 'Real Dimez', tag: 'Only Raw Records', photo: 'dimez', bio: 'High school friends Bae-Luxe and Roxy turned viral tracks into a music career. Their next move is with Only Raw Records.' },
  { name: 'Raul Bautista', tag: 'Leonida', photo: 'raul', bio: 'A seasoned bank robber who makes high stakes sound like good business, Raul is always scouting for the right crew.' },
  { name: 'Brian Heder', tag: 'The Leonida Keys', photo: 'brian', bio: 'A veteran of the Keys’ smuggling scene, Brian still runs business through his boatyard and has an arrangement with Jason.' },
];

export const locations = [
  { name: 'Vice City', photo: 'vice-city', description: 'Oceanfront hotels, towering condos, and a nightlife that never clocks out.' },
  { name: 'Leonida Keys', photo: 'keys', description: 'A chain of tropical islands and turquoise shallows at the southern edge of Leonida.' },
  { name: 'Port Gellhorn', photo: 'port-gellhorn', description: 'An old vacation town where shuttered attractions and roadside motels tell another side of Leonida.' },
  { name: 'Grassrivers', photo: 'grassrivers', description: 'A vast stretch of swampland, backwaters, and wildlife beyond the city lights.' },
  { name: 'Ambrosia', photo: 'ambrosia', description: 'An industrial town where the sugar refinery and a local biker gang loom large.' },
  { name: 'Mount Kalaga', photo: 'kalaga', description: 'A national park in northern Leonida with forest trails, rocky terrain, and off-road routes.' },
];

export const gallery = [
  { title: 'Jason and Lucia 20', type: 'Launch gallery', photo: 'hero-night', alt: 'Jason and Lucia seen from above in a neon-lit convertible' },
  { title: 'Jason and Lucia 18', type: 'Launch gallery', photo: 'rusty-anchor', alt: 'Jason and Lucia dancing in a crowded bar' },
  { title: 'Vice City 13', type: 'Launch gallery', photo: 'club', alt: 'A crowded club lit in green and violet' },
  { title: 'Jason and Lucia 16', type: 'Launch gallery', photo: 'sunset', alt: 'Jason and Lucia on a hillside at sunset' },
  { title: 'Leonida Keys 07', type: 'Launch gallery', photo: 'underwater', alt: 'An underwater scene in the Leonida Keys' },
  { title: 'Vice City 06', type: 'Game screenshot', photo: 'ocean-drive', alt: 'People and cars under neon lights in Vice City' },
  { title: 'Jason and Lucia Rooftop', type: 'Official artwork', photo: 'rooftop', alt: 'Illustration of Jason and Lucia overlooking Vice City' },
  { title: 'Official Cover Art', type: 'Official artwork', photo: 'cover', alt: 'Grand Theft Auto VI illustrated cover collage' },
  { title: 'Jason and Lucia 14', type: 'Launch gallery', photo: 'convertible', alt: 'Jason and Lucia under purple lights' },
];

export const sources = {
  characters: 'https://www.rockstargames.com/VI/only-in-leonida',
  gallery: 'https://www.rockstargames.com/VI/launch-gallery',
  media: 'https://www.rockstargames.com/VI/media',
  trailer: 'https://www.rockstargames.com/VI/launch-trailer',
};
