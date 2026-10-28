// ============================================================================
// 🌷 CONFIGURACIÓN DE TU ANIVERSARIO CON LEIDI (1 AÑO Y 6 MESES)
// Fecha de inicio: 27 de Abril de 2025 -> Octubre de 2026 (18 Meses)
// ============================================================================

export const coupleInfo = {
  partnerName: 'Leidi',
  yourName: 'Con todo mi cariño',
  startDateISO: '2025-04-27T00:00:00',
  startDateFormatted: '27 de Abril de 2025',
  anniversaryDateFormatted: '27 de Octubre de 2026',
  milestoneBadge: '27 ABR 2025 — OCT 2026 · 1 AÑO Y 6 MESES',
  heroTitle: 'Donde florecen los tulipanes, florece nuestra historia',
  heroSubtitle:
    'Dieciocho meses desde que nuestros caminos se cruzaron: desde aquel primer ramo de tulipanes tejidos, nuestros viajes a Malabrigo, Pacasmayo, Chimbote y la sierra, hasta verte brillar hoy junto a Aslan. Mi lugar favorito en el mundo siempre será a tu lado.',
  stats: [
    { value: '1 Año 6M', label: 'Junto a ti, Leidi' },
    { value: '18', label: 'Tulipanes de Historia' },
    { value: '548+', label: 'Días de Amor' },
    { value: '∞', label: 'Viajes y Sueños por Vivir' },
  ],
};

// ============================================================================
// 🎵 CONFIGURACIÓN DE MÚSICA DE FONDO
// Para dejar tu canción fija al subir a Vercel:
// 1. Guarda tu archivo MP3 en la carpeta: public/musica/cancion.mp3
// 2. O cambia `audioUrl` por el nombre de tu archivo (ej. '/musica/nuestra-cancion.mp3').
// También puedes subir o cambiar la canción desde el botón de música en la web.
// ============================================================================
export const musicConfig = {
  title: 'Amarte por mil años más (Piano)',
  artist: 'Para Leidi · 1 Año y 6 Meses 🌷',
  audioUrl: '/musica/cancion.mp3',
  defaultVolume: 0.6,
};

export const videoConfig = {
  title: 'Felices 1 Año y 6 Meses, Leidi',
  subtitle: 'Un video especial para celebrar nuestros 18 meses juntos 🌷✨',
  videoUrl: '/video/aniversario.mp4', // Guarda tu video en public/video/aniversario.mp4
};

// ============================================================================
// 🌷 EL JARDÍN DE LOS 18 TULIPANES (La historia real mes a mes con Leidi)
// ============================================================================
export const tulips18 = [
  {
    month: 1,
    stage: 'first-6',
    label: 'Mes 01',
    title: 'La primera vez que te veo',
    reason:
      'Desde el primer mes que te conocí jamás pensé que mi vida se cruzaría con la tuya, solo sabe Dios por qué nos juntó aquel día pero estoy agradecido con Él por esta historia.',
    promise: 'Prometí darme la oportunidad de conocerte.',
    variant: 'rose-pastel',
    dateHint: 'El inicio de todo',
  },
  {
    month: 2,
    stage: 'first-6',
    label: 'Mes 02',
    title: 'Los primeros viajes',
    reason:
      'En nuestro segundo mes descubrí que mi melodía favorita es tu risa espontánea. Cada vez que me contabas algo era intrigante y quería saber más de ti y de tu vida.',
    promise: 'Prometí ser mejor persona para que te sintieras cómoda conmigo.',
    variant: 'blush-pink',
    dateHint: 'Conocerte mejor',
  },
  {
    month: 3,
    stage: 'first-6',
    label: 'Mes 03',
    title: 'La primera foto',
    reason:
      'Al tercer mes empezamos a salir más, y cada vez me daba más curiosidad aprender de ti, de tu vida, tus sueños y tus metas.',
    promise:
      'Llegué con un ramo de tulipanes tejidos para demostrarte que eras lo más único que había conocido.',
    variant: 'cream-pearl',
    dateHint: 'El ramo que inició todo',
  },
  {
    month: 4,
    stage: 'first-6',
    label: 'Mes 04',
    title: 'Tu sustentación',
    reason:
      'Admiro la dulzura con la que ves la vida, la dedicación, el esfuerzo y el corazón que pones cuando te propones algo, el brillo en tus ojos cuando aprobaste y culminaste tu carrera.',
    promise: 'Prometí acompañarte y apoyarte en todo lo que necesites, que siempre estaré para ti.',
    variant: 'coral-soft',
    dateHint: 'El primer ramo de tulipanes',
  },
  {
    month: 5,
    stage: 'first-6',
    label: 'Mes 05',
    title: 'El viaje a Malabrigo',
    reason:
      'No importa el destino cuando voy contigo. En el quinto mes aprendí que cualquier lugar a tu lado sería mi favorito, verte en el hermoso atardecer, aunque me estaba distrayendo mirándote.',
    promise:
      'Agradecí infinitamente conocer a tu mamá y decidí que quería quedarme contigo por lo que resta de mi vida.',
    variant: 'rose-pastel',
    dateHint: 'El atardecer que me enamoró más de ti',
  },
  {
    month: 6,
    stage: 'first-6',
    label: 'Mes 06',
    title: 'El mes que se acabó',
    reason:
      'Este mes el 17 de septiembre se acabó, pensé que fue el fin de todo, que toda esta historia terminaría ahí, pero aun así la casualidad o el destino nos volvió a juntar.',
    promise: 'Me sentí perdido, pero jamás perdí la esperanza de volver a verte.',
    variant: 'berry-silk',
    dateHint: '6 meses de historia a punto de terminar',
  },
  {
    month: 7,
    stage: 'year-1',
    label: 'Mes 07',
    title: 'Nos volvimos a ver, volvimos a hablar',
    reason:
      'Hay abrazos que reinician el mundo, y los tuyos tienen ese superpoder. En este mes volvimos a hablar, verte sonreír una vez más.',
    promise: 'Prometí no perderte de vista, que seguiría intentándolo hasta lograr tenerte a mi lado.',
    variant: 'blush-pink',
    dateHint: 'Volver a empezar',
  },
  {
    month: 8,
    stage: 'year-1',
    label: 'Mes 08',
    title: 'Viaje a Pacasmayo',
    reason:
      'A los ocho meses conocí más a tu mamá, no había viaje donde no estemos los 3, incluso hasta para los lugares más lejanos adoraba verte feliz.',
    promise:
      'Prometí caerle de lo mejor a tu mamá, quería que se sintiera tranquila, de que la ayudaría a cuidarte.',
    variant: 'cream-pearl',
    dateHint: 'Caerle de lo mejor a tu mamá',
  },
  {
    month: 9,
    stage: 'year-1',
    label: 'Mes 09',
    title: 'Un regalo para ti',
    reason:
      'Este mes decidí darte un regalo por Navidad, unos hermosos tulipanes tejidos para ti, que puedas usarlos algún día que te vayas a la sierra para que compartas con tu mamita.',
    promise:
      'Prometí seguir dándote regalos, porque quiero que sepas que siempre pienso en ti, sin importar que decidiera irme de tu vida.',
    variant: 'rose-pastel',
    dateHint: 'Segundo punto de inflexión',
  },
  {
    month: 10,
    stage: 'year-1',
    label: 'Mes 10',
    title: 'Empecemos de 0 juntos',
    reason:
      'A pesar de todo el destino volvió a juntarnos, me buscaste y volvimos a intentarlo, viviendo entre amigos pero a tu lado.',
    promise: 'Prometí intentar dar lo mejor de mí para que esta historia funcione, que no te decepcionaría.',
    variant: 'blush-pink',
    dateHint: 'Empezar de nuevo',
  },
  {
    month: 11,
    stage: 'year-1',
    label: 'Mes 11',
    title: 'El primer viaje largo',
    reason:
      'Casi un año de conocerte con altos y bajos. Viajamos a Chimbote, el primer viaje largo que hicimos; aunque no pudiera abrazarte por tu mamá o Yanina, adoraba verte feliz con el vestido que te compré.',
    promise:
      'Prometí que no quería perderte, que pase lo que pase haría todo lo que esté a mi alcance para enamorarte.',
    variant: 'berry-silk',
    dateHint: 'Una vida contigo',
  },
  {
    month: 12,
    stage: 'year-1',
    label: 'Mes 12',
    title: 'El mes que nació mi persona favorita',
    reason:
      'Después de casi un año de haberte conocido, no sabía qué hacer para tu cumpleaños pero tu mamá me dio la iniciativa de hacer que lo pases de una manera inolvidable, decidí que ese día no dejarías de sonreír ni un segundo.',
    promise:
      'Prometí que tu cumpleaños sería el día más importante del año y que no pararía hasta lograr hacerlo inolvidable.',
    variant: 'cream-pearl',
    dateHint: 'Feliz cumpleaños niña hermosa',
  },
  {
    month: 13,
    stage: 'year-1-5',
    label: 'Mes 13',
    title: 'Más viajes y lugares a tu lado',
    reason:
      'Me encantan los grandes planes, pero amo todavía más la calma de estar contigo; cada lugar que conocí no se comparaba con lo hermoso que se veía cuando estabas tú a mi lado.',
    promise:
      'Quiero ser yo el que le enseñe el mundo a tu corazón para verlo resplandecer en cada lugar del mundo.',
    variant: 'rose-pastel',
    dateHint: 'No importa el lugar si estás a mi lado',
  },
  {
    month: 14,
    stage: 'year-1-5',
    label: 'Mes 14',
    title: 'Conocer la sierra nunca fue tan bonito',
    reason:
      'Hemos aprendido que podemos ser un gran equipo, conociendo lugares nuevos y encontrándote en cada rincón del mundo.',
    promise: 'Seguir creando momentos que atesoremos por siempre.',
    variant: 'coral-soft',
    dateHint: 'A todo lugar si es contigo',
  },
  {
    month: 15,
    stage: 'year-1-5',
    label: 'Mes 15',
    title: 'Conocer a tu hermano menor',
    reason:
      'Este mes conocí a tu hermano menor, me sentí muy nervioso porque quería caerle bien porque sé lo que importa él para ti; creo que lo logré y fue muy bonito verte feliz con alguien a quien admiras mucho.',
    promise:
      'Cuidarte y protegerte como lo hace él, para que Niver sepa que te voy a cuidar como lo hace él.',
    variant: 'blush-pink',
    dateHint: 'Conociendo a tu familia',
  },
  {
    month: 16,
    stage: 'year-1-5',
    label: 'Mes 16',
    title: 'Una de mis estupideces',
    reason:
      'No sabía por lo que pasabas y te alejé, a veces siento que soy muy estúpido y que no merezco estar a tu lado, pero quiero intentar ser la paz que tanto anhelas encontrar.',
    promise: 'Prometo entenderte mejor, aunque sea a pasos de tortuga pero quiero ser yo tu lugar seguro.',
    variant: 'cream-pearl',
    dateHint: 'Aprender a amarte como te mereces',
  },
  {
    month: 17,
    stage: 'year-1-5',
    label: 'Mes 17',
    title: 'El mejor mes que pasamos según yo',
    reason:
      'Este mes fue para mí el mejor que tuvimos, vi a la persona de la que me enamoré ser feliz con su cabello, la vi lograr sus metas en un nuevo trabajo, la vi siendo mamá de un cachorro llamado Aslan, en este mes fue más especial porque me sentí incluido en cada momento que pasabas y lo que más amé fue que no dejaras de sonreír ni un solo día.',
    promise:
      'Prometí cuidarte y hacerte feliz, que no te arrepentirías de estar a mi lado, y arrepentirme de aceptar que conocieras a otras personas.',
    variant: 'coral-soft',
    dateHint: 'El día que decidí que no te mentiría diciéndote que fueras feliz con alguien más',
  },
  {
    month: 18,
    stage: 'year-1-5',
    label: 'Mes 18',
    title: '¡Felices 1 Año y 6 Meses, Leidi!',
    reason:
      'Hoy celebramos 18 meses: un año y medio de la historia más hermosa que he vivido. Gracias por existir, por estar conmigo y por ser mi persona favorita en el universo, aunque hayamos enfrentado altos y bajos.',
    promise:
      'Prometo que seré yo el que enamore tu corazón, el que lo cuide, el que te haga sonreír, el que te apoye en tus metas, el que te ama más que a nada en el mundo y el que te quiere ver envejecer.',
    variant: 'berry-silk',
    dateHint: '¡1 Año y 6 Meses!',
  },
];

// ============================================================================
// 📸 GALERÍA POLAROID 3D (Adaptada con los momentos reales de su historia)
// Puedes subir las fotos reales desde el botón "Subir tus fotos" en la web
// o colocando tus archivos en public/fotos/
// ============================================================================
export const defaultMemories3D = [
  {
    id: 'mem-1',
    slot: 1,
    title: 'La primera foto y tus tulipanes tejidos',
    date: 'Mes 03 · El ramo que inició todo',
    location: 'Nuestras primeras salidas',
    caption: 'Para la mujer más única que he conocido 🌷',
    secretBackNote:
      'Cuando empezamos a salir más, llegué con aquel ramo de tulipanes tejidos porque quería demostrarte lo especial y única que eras para mí desde el primer instante.',
    image: '/fotos/foto1.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=85',
    rotation: -3,
  },
  {
    id: 'mem-2',
    slot: 2,
    title: 'Tu Sustentación y tu Primer Ramo',
    date: 'Mes 04 · Orgulloso de ti',
    location: 'Culminando tu carrera',
    caption: 'El brillo en tus ojos al lograr tu meta 🎓🌸',
    secretBackNote:
      'Admiro el corazón, la dulzura y el esfuerzo que pones en todo. Verte aprobar tu sustentación con tu primer ramo de tulipanes me hizo prometer que siempre estaré para apoyarte.',
    image: '/fotos/foto2.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=900&q=85',
    rotation: 2.5,
  },
  {
    id: 'mem-3',
    slot: 3,
    title: 'El Atardecer en Malabrigo',
    date: 'Mes 05 · Puerto Malabrigo',
    location: 'Malabrigo · Conociendo a tu mamá',
    caption: 'El atardecer era hermoso, pero yo te miraba a ti 🌅',
    secretBackNote:
      'En Malabrigo aprendí que cualquier lugar a tu lado es mi favorito. Me distraje del atardecer por mirarte a ti, agradecí conocer a tu mamá y decidí quedarme contigo toda la vida.',
    image: '/fotos/foto3.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=900&q=85',
    rotation: -2,
  },
  {
    id: 'mem-4',
    slot: 4,
    title: 'Viajes a Pacasmayo los Tres',
    date: 'Mes 08 · Pacasmayo',
    location: 'Pacasmayo · Con tu mamita',
    caption: 'Adoraba verte feliz en cada viaje 🌊✨',
    secretBackNote:
      'No había viaje donde no estuviéramos los tres junto a tu mamá. Mi mayor deseo era ver tu sonrisa y que tu mamita sintiera la tranquilidad de que siempre te ayudaré a cuidarte.',
    image: '/fotos/foto4.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85',
    rotation: 3,
  },
  {
    id: 'mem-5',
    slot: 5,
    title: 'Nuestro Primer Viaje Largo a Chimbote',
    date: 'Mes 11 · Chimbote',
    location: 'Chimbote · Una vida contigo',
    caption: 'Qué hermosa te veías con el vestido que te compré 💖',
    secretBackNote:
      'Aunque no pudiera abrazarte por tu mamá o Yanina, verte tan radiante y feliz con el vestido que te compré me hizo prometer que haría todo a mi alcance para enamorarte siempre.',
    image: '/fotos/foto5.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85',
    rotation: -2.5,
  },
  {
    id: 'mem-6',
    slot: 6,
    title: 'El Cumpleaños de Mi Persona Favorita',
    date: 'Mes 12 · Tu Cumpleaños',
    location: 'Feliz cumpleaños, niña hermosa',
    caption: 'Un día para que no dejaras de sonreír ni un segundo 🎂🌷',
    secretBackNote:
      'Gracias a la iniciativa de tu mamá preparamos todo para que tu cumpleaños fuera inolvidable. Prometí que ese día sería el más importante del año porque naciste tú.',
    image: '/fotos/foto6.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85',
    rotation: 2,
  },
  {
    id: 'mem-7',
    slot: 7,
    title: 'La Sierra y Conocer a tu Hermano Niver',
    date: 'Mes 14 y 15 · En Familia',
    location: 'La Sierra · Conociendo a Niver',
    caption: 'A cualquier rincón del mundo si es contigo ⛰️🤍',
    secretBackNote:
      'Conocer la sierra juntos fue hermoso, y conocer a tu hermano menor Niver me llenó de orgullo al verte tan feliz. Prometí cuidarte y protegerte siempre tanto como lo hace él.',
    image: '/fotos/foto7.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85',
    rotation: -2,
  },
  {
    id: 'mem-8',
    slot: 8,
    title: 'Tu Sonrisa, Tu Trabajo y el Pequeño Aslan',
    date: 'Mes 17 y 18 · ¡1 Año y 6 Meses, Leidi!',
    location: 'Nuestro mejor momento · Con Aslan 🐾',
    caption: 'Quiero ser quien te ame y te vea envejecer 💖🌷',
    secretBackNote:
      'Verte feliz con tu cabello, logrando tus metas en tu nuevo trabajo y siendo mamá de tu cachorro Aslan fue el regalo más hermoso. ¡Felices 1 año y 6 meses, Leidi!',
    image: '/fotos/foto8.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=85',
    rotation: 2.5,
  },
];

// ============================================================================
// 🌸 MINI GALERÍA SOLO DE LEIDI (Instax / Mini Polaroids 3D)
// Coloca sus fotos o videos en la carpeta: public/leidi/
// con nombres: leidi1.jpeg (o foto1.jpeg) hasta leidi8.jpeg (o .jpg / .mp4)
// ============================================================================
export const defaultLeidiPortraits = [
  {
    id: 'leidi-1',
    slot: 1,
    phrase: 'Eres hermosa',
    badge: 'Mi Niña Hermosa 🌷',
    caption: 'No existe flor que se compare contigo ✨',
    secretBackNote:
      'Eres hermosa por fuera y aún más hermosa por dentro. Cada vez que te miro siento que estoy viendo la maravilla más bonita del universo.',
    image: '/leidi/leidi1.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=80',
    rotation: -2.5,
  },
  {
    id: 'leidi-2',
    slot: 2,
    phrase: 'Eres grandiosa',
    badge: 'Mi Orgullo 💖',
    caption: 'Todo lo que te propones lo haces brillar 🌟',
    secretBackNote:
      'Eres grandiosa, Leidi. Admiro tu inteligencia, tu valentía, tu dedicación en tu trabajo y la forma tan increíble en que sales adelante siempre.',
    image: '/leidi/leidi2.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=700&q=80',
    rotation: 2,
  },
  {
    id: 'leidi-3',
    slot: 3,
    phrase: 'Eres lo más bonito de mi vida',
    badge: 'Mi Casualidad Favorita 🌸',
    caption: 'Llegaste para iluminar todos mis días ☀️',
    secretBackNote:
      'Sin duda alguna, eres lo más bonito que ha llegado a mi vida. Gracias a Dios por cruzar nuestros caminos y permitirme amarte.',
    image: '/leidi/leidi3.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80',
    rotation: -1.8,
  },
  {
    id: 'leidi-4',
    slot: 4,
    phrase: 'Tu sonrisa es mi magia',
    badge: 'Mi Melodía 🎶',
    caption: 'Cuando sonríes, el mundo entero se detiene 💫',
    secretBackNote:
      'Tu sonrisa espontánea y el brillo de tus ojos tienen el poder de alegrarme el alma al instante. Prometo cuidar esa sonrisa todos los días.',
    image: '/leidi/leidi4.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    rotation: 2.5,
  },
  {
    id: 'leidi-5',
    slot: 5,
    phrase: 'Eres única e inolvidable',
    badge: 'Como tus Tulipanes 🌷',
    caption: 'Delicada, radiante y llena de dulzura 🤍',
    secretBackNote:
      'No hay nadie en el mundo como tú: tu ternura, tu forma de querer a tu mamita, a Niver y a Aslan hacen que mi corazón te ame más cada día.',
    image: '/leidi/leidi5.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80',
    rotation: -2,
  },
  {
    id: 'leidi-6',
    slot: 6,
    phrase: 'Eres mi paz y mi refugio',
    badge: 'Mi Lugar Seguro 🏡',
    caption: 'A tu lado todo se siente cálido y en calma ✨',
    secretBackNote:
      'Estar cerca de ti me da una paz que no encuentro en ningún otro lugar. Quiero ser siempre ese apoyo y ese refugio seguro para tu corazón.',
    image: '/leidi/leidi6.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=700&q=80',
    rotation: 1.8,
  },
  {
    id: 'leidi-7',
    slot: 7,
    phrase: 'Eres mi sueño hecho realidad',
    badge: 'Mi Ilusión 💫',
    caption: 'Me encantas hoy más que el primer día 💖',
    secretBackNote:
      'Mirarte es darme cuenta de lo afortunado que soy de conocerte. Cada detalle tuyo, tu cabello, tu voz y tu mirada me enamoran sin parar.',
    image: '/leidi/leidi7.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=80',
    rotation: -2.2,
  },
  {
    id: 'leidi-8',
    slot: 8,
    phrase: 'Eres mi persona favorita',
    badge: 'Por Mil Años Más 💍',
    caption: 'En el universo entero, siempre te elijo a ti 🌷',
    secretBackNote:
      'Eres hermosa, eres grandiosa y eres la mujer con la que quiero compartir cada viaje, cada meta y cada etapa de mi vida. ¡Te amo, Leidi!',
    image: '/leidi/leidi8.jpeg',
    fallbackImage:
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=700&q=80',
    rotation: 2.2,
  },
];
