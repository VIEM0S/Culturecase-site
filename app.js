      // ══ MONITORING — capture globale des erreurs JS ══════════════════════════════
      (function () {
        const RATE_LIMIT_KEY = "cc_err_count_" + new Date().toISOString().slice(0, 10);
        const MAX_ERRORS_PER_DAY = 20; // évite le spam Firestore en cas de boucle d'erreur

        function logError(payload) {
          try {
            let count = parseInt(sessionStorage.getItem(RATE_LIMIT_KEY) || "0", 10);
            if (count >= MAX_ERRORS_PER_DAY) return;
            sessionStorage.setItem(RATE_LIMIT_KEY, String(count + 1));

            console.error("[CultureCase Error]", payload);

            const db = window.__db;
            const api = window.__firestoreAPI;
            if (db && api && api.addDoc && api.collection) {
              const data = {
                ...payload,
                url: location.href,
                userAgent: navigator.userAgent,
                createdAt: api.serverTimestamp ? api.serverTimestamp() : new Date().toISOString(),
              };
              api.addDoc(api.collection(db, "error_logs"), data).catch(() => {});
            }
          } catch (_) {
            // jamais bloquer l'app à cause du logger lui-même
          }
        }

        window.addEventListener("error", function (e) {
          logError({
            type: "error",
            message: e.message || "Unknown error",
            file: e.filename || "",
            line: e.lineno || 0,
            col: e.colno || 0,
          });
        });

        window.addEventListener("unhandledrejection", function (e) {
          const reason = e.reason;
          logError({
            type: "unhandledrejection",
            message: (reason && (reason.message || String(reason))) || "Unknown rejection",
            stack: (reason && reason.stack) ? String(reason.stack).slice(0, 500) : "",
          });
        });
      })();

      // ══ DONNÉES STATIQUES (fallback + état initial) ══════════════════════════════
      // Remplacées en temps réel par Firebase dès que Firestore répond.

      // status: 'available' | 'limited' | 'out'
      // Basé sur le backup stock réel du 31 mai 2026
      const DS = [
        {
          id: "D1",
          name: "DJENNÉ",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767538/ynvij5rszvqmamfs9hgm.jpg",
          story:
            "La Grande Mosquée de Djenné — monument le plus emblématique de l'architecture soudano-sahélienne. Ce design célèbre l'une des plus belles constructions d'Afrique, inscrite au patrimoine mondial de l'UNESCO.",
          cat: "MONUMENT",
        },
        {
          id: "D2",
          name: "PORTE DE TOMBOUCTOU",
          status: "available",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767531/idasnkfvznmlzfn6vux1.jpg",
          story:
            "Tombouctou, la ville mystérieuse au bout du désert. Ses portes ont vu passer des siècles de commerce, de savoir et de civilisation. Un hommage à la cité des 333 saints.",
          cat: "MONUMENT",
        },
        {
          id: "D3",
          name: "MUNYU",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767550/erdvdubi3wvbb3pgoirj.jpg",
          story:
            "Munyu — mot bambara qui signifie la patience, la résilience. Une valeur cardinale de la culture malienne. Ce design en porte l'essence et la beauté.",
          cat: "VALEUR",
        },
        {
          id: "D4",
          name: "BLM",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767873/x3wc21gdtcsosbkb8tsk.jpg",
          story:
            "Un design qui porte un message universel — la dignité et la fierté noire. Ancré dans l'identité africaine, ouvert au monde entier.",
          cat: "VALEUR",
        },
        {
          id: "D5",
          name: "INDIGO & CORIS",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767559/bxujdu2161ecy1zttj3y.jpg",
          story:
            "L'indigo, teinture ancestrale des tisserands du Mali. Les cauris, monnaie d'échange et symbole de prospérité. Un mariage de traditions qui traverse les siècles.",
          cat: "TEXTILE",
        },
        {
          id: "D6",
          name: "MASQUE DOGON",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767579/l0zypv1qg1yxkjzt50c3.jpg",
          story:
            "Les masques dogon sont parmi les plus fascinants d'Afrique de l'Ouest. Utilisés lors des cérémonies Dama, ils incarnent les esprits des ancêtres et la connexion entre le monde des vivants et celui des morts.",
          cat: "MASQUE",
        },
        {
          id: "D7",
          name: "AFRICA",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767567/cbryluhomr6fn6ucoc38.jpg",
          story:
            "L'Afrique dans toute sa splendeur. Un design qui célèbre le continent mère, berceau de l'humanité et source inépuisable de culture, de richesse et de créativité.",
          cat: "VALEUR",
        },
        {
          id: "D8",
          name: "TOUAREG",
          img: "",
          story:
            "Peuple du désert, gardiens du Sahara. Les Touaregs du Mali sont des nomades fiers dont la culture, les bijoux et les motifs géométriques constituent un art à part entière.",
          cat: "PEUPLE",
        },
        {
          id: "D9",
          name: "KÔ MUSSO",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767513/g9hlo9nazfns8zio19kh.jpg",
          story:
            "La femme ciwara — symbole de fertilité et de travail. Dans la cosmogonie bambara, le ciwara est mi-homme mi-antilope, enseignant aux hommes l'art de la culture de la terre.",
          cat: "CIWARA",
        },
        {
          id: "D10",
          name: "MUSSO",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767522/rh1twzztxdfkvxszxm2e.jpg",
          story:
            "Musso signifie femme en bambara. Un hommage à la femme malienne — pilier de la famille, gardienne des traditions, force silencieuse d'une société entière.",
          cat: "VALEUR",
        },
        {
          id: "D11",
          name: "DJOLIBA",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767684/kz0hqllpclzst4tdxe4w.jpg",
          story:
            "Le Djoliba — nom bambara du fleuve Niger. Artère vitale du Mali, source de vie pour des millions de personnes depuis des millénaires. Ce design rend hommage au grand fleuve.",
          cat: "NATURE",
        },
        {
          id: "D12",
          name: "BOGOLAN",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767675/zutdygs9wnxbheeilcl9.jpg",
          story:
            "Le bogolan est l'âme textile du Mali. Fabriqué à partir de coton tissé à la main et teint à la boue fermentée, ses motifs géométriques racontent des histoires, des proverbes et des batailles. Le textile africain le plus distinctif au monde.",
          cat: "TEXTILE",
        },
        {
          id: "D13",
          name: "N'KO",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767905/wketzekxsrqlupeqrdi2.jpg",
          story:
            "L'alphabet N'Ko, créé par Solomana Kanté en 1949 pour transcrire les langues mandingues. Un système d'écriture né au Mali, symbole d'indépendance culturelle et de fierté africaine.",
          cat: "CULTURE",
        },
        {
          id: "D14",
          name: "CIWARA MARON",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767813/ujlarvjopqep37hwm2n2.jpg",
          story:
            "Le Ciwara, heaume cérémoniel bambara représentant l'antilope mythique qui enseigna l'agriculture aux hommes. L'une des icônes les plus reconnues de l'art africain dans le monde.",
          cat: "CIWARA",
        },
        {
          id: "D15",
          name: "HOMME BLEU",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767825/aucphxdwahbfgtfvf3aw.jpg",
          story:
            "L'Homme Bleu — surnom des Touaregs dont les vêtements en indigo teignent la peau. Figure mystérieuse du désert, symbole d'un peuple libre et indomptable.",
          cat: "PEUPLE",
        },
        {
          id: "D16",
          name: "AZTÈQUE",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767836/siov0fyjiemh53flyiod.jpg",
          story:
            "Un dialogue entre les civilisations — les motifs aztèques résonnent avec les géométries du bogolan malien. Deux mondes, une même recherche de beauté et de sens.",
          cat: "CULTURE",
        },
        {
          id: "D17",
          name: "CAURIS & BAMBARA",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767944/e9hka8dwnpzsxdiltivc.jpg",
          story:
            "Les cauris, monnaie sacrée et ornement de beauté. Le masque bambara, gardien des rites d'initiation. Deux symboles fondamentaux de la culture malienne réunis dans un design unique.",
          cat: "MASQUE",
        },
        {
          id: "D18",
          name: "MONUMENT DU MALI",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767503/avfyqvpk913qxdhdaluq.jpg",
          story:
            "Le Monument de la Paix de Bamako — symbole de la réconciliation nationale et de l'unité malienne. Porter ce design c'est affirmer son attachement à la paix et à la patrie.",
          cat: "MONUMENT",
        },
        {
          id: "D19",
          name: "DJENNÉ ROUGE",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767700/nnj30wpau0ubjtwkcsuk.jpg",
          story:
            "Djenné dans les teintes du soleil couchant. La grande mosquée baignée de rouge ocre — couleur de la terre du Mali, couleur de la vie et de la chaleur africaine.",
          cat: "MONUMENT",
        },
        {
          id: "D20",
          name: "NYA",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767662/ighfjwqwh4n8qqzxgclm.jpg",
          story:
            "Nya — la divinité de la guérison et de la protection dans la tradition bambara. Un design qui porte en lui la puissance bienveillante des anciennes croyances maliennes.",
          cat: "CULTURE",
        },
        {
          id: "D21",
          name: "CIWARA & BOGOLAN",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767961/cnfo3mbjmc0z6wd9x22l.jpg",
          story:
            "La rencontre des deux grands symboles du Mali — le Ciwara antilope et le bogolan mud cloth. Un design qui condense l'essence même de l'identité malienne.",
          cat: "CIWARA",
        },
        {
          id: "D22",
          name: "SARAMAYA",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767610/lenx0fj5n2cd8zlzauj9.jpg",
          story:
            "Saramaya — \"la beauté de l'effort\" en bambara. Ce design célèbre ceux qui travaillent dans l'ombre pour faire briller les autres. Un hommage à la dignité du labeur.",
          cat: "VALEUR",
        },
        {
          id: "D25",
          name: "WAX",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767470/hvzqpryowauueraiszqj.jpg",
          story:
            "Le wax africain — tissu aux mille couleurs et aux mille histoires. Adopté et réinterprété par toute l'Afrique de l'Ouest, il est devenu un symbole de la mode africaine contemporaine.",
          cat: "TEXTILE",
        },
        {
          id: "D28",
          name: "BÈNKADI",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767718/smtv6hdke2pdelv3z0ob.jpg",
          story:
            'Bènkadi signifie "la bonne entente" en bambara — valeur fondamentale de la société malienne. Un appel à l\'harmonie, au dialogue et au vivre-ensemble.',
          cat: "VALEUR",
        },
        {
          id: "D33",
          name: "SABABU",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767455/ygwn0mfqo8fslzspvjko.jpg",
          story:
            "Sababu — \"la raison d'être\" en bambara. Ce design invite à la réflexion sur le sens et l'identité. Pourquoi sommes-nous là ? Pour porter notre culture et la transmettre.",
          cat: "VALEUR",
        },
        {
          id: "D34",
          name: "WARI",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767415/sfayi0sxmnru3sjmcynq.jpg",
          story:
            "Le Wari — jeu de stratégie ancestral répandu dans toute l'Afrique de l'Ouest. Bien plus qu'un jeu, c'est un exercice de sagesse, de calcul et de patience transmis de génération en génération.",
          cat: "CULTURE",
        },
        {
          id: "D42",
          name: "AFRO QUEEN",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779767356/yeiqf4sdqghcpuzjetti.jpg",
          story:
            "La Reine Afro — célébration de la beauté naturelle africaine. Ce design est un hommage aux femmes noires qui portent leur identité avec fierté et élégance.",
          cat: "VALEUR",
        },
        {
          id: "D43",
          name: "KAKÔLÔ",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779926695/scyw8ovkaojowkrnbibc.jpg",
          story:
            "Kakôlô — terme bambara évoquant l'origine, les racines profondes. Se souvenir d'où l'on vient pour savoir où l'on va.",
          cat: "CULTURE",
        },
        {
          id: "D44",
          name: "BOZO",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779926709/fozrtqbz0gzwn6nvgegu.jpg",
          story:
            "Les Bozo — peuple pêcheur du fleuve Niger, maîtres de l'eau et gardiens du Djoliba. Leur savoir-faire ancestral et leur lien intime avec le fleuve sont au cœur de ce design.",
          cat: "PEUPLE",
        },
        {
          id: "D45",
          name: "N'MA",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779926721/f3mjcfsij2dwxljd1jzx.jpg",
          story:
            "N'Ma — \"la mère\" en bambara. La mère est le pilier de la société malienne, source d'amour, de sagesse et de continuité culturelle.",
          cat: "VALEUR",
        },
        {
          id: "D46",
          name: "SOUDAN",
          img: "https://res.cloudinary.com/dknfqd2xp/image/upload/v1779926774/zqfkjq0fug2htgxl1mql.jpg",
          story:
            "Le Soudan français — nom historique du Mali avant l'indépendance. Un design qui rappelle les racines historiques du pays et le chemin parcouru vers la liberté.",
          cat: "MONUMENT",
        },
      ];

      // stock réel par design × modèle — extrait du backup 31/05/2026
      const STOCK_MAP = {
        D1: {
          "iPhone 12": 2,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 2,
          "iPhone 13 Pro": 1,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 1,
          "iPhone 14 Plus": 1,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 2,
          "iPhone 15": 1,
          "iPhone 15 Plus": 1,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 1,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 5,
          "iPhone 17 Pro Max": 6,
        },
        D2: {
          "iPhone 12": 1,
          "iPhone 12 Pro Max": 1,
          "iPhone 13": 2,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 1,
          "iPhone 14 Plus": 1,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 1,
          "iPhone 15": 2,
          "iPhone 15 Plus": 2,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 1,
          "iPhone 17": 0,
          "iPhone 17 Air": 1,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D3: {
          "iPhone 12": 1,
          "iPhone 12 Pro Max": 1,
          "iPhone 13": 1,
          "iPhone 13 Pro": 1,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 1,
          "iPhone 14 Plus": 1,
          "iPhone 14 Pro": 1,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 2,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 1,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 0,
          "iPhone 17 Pro Max": 0,
        },
        D4: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 1,
          "iPhone 14 Plus": 1,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 1,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 1,
          "iPhone 17": 0,
          "iPhone 17 Air": 1,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D5: {
          "iPhone 12": 3,
          "iPhone 12 Pro Max": 1,
          "iPhone 13": 3,
          "iPhone 13 Pro": 1,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 1,
          "iPhone 14 Plus": 2,
          "iPhone 14 Pro": 1,
          "iPhone 14 Pro Max": 1,
          "iPhone 15": 1,
          "iPhone 15 Plus": 1,
          "iPhone 15 Pro": 1,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 1,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D6: {
          "iPhone 12": 1,
          "iPhone 12 Pro Max": 1,
          "iPhone 13": 1,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 1,
          "iPhone 14": 2,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 1,
          "iPhone 15 Plus": 1,
          "iPhone 15 Pro": 1,
          "iPhone 15 Pro Max": 1,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 1,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D7: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 1,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 2,
          "iPhone 14 Plus": 1,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 1,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 1,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 1,
          "iPhone 17 Pro": 0,
          "iPhone 17 Pro Max": 0,
        },
        D8: {
          "iPhone 12": 1,
          "iPhone 12 Pro Max": 1,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 2,
          "iPhone 14": 2,
          "iPhone 14 Plus": 1,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 1,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 1,
          "iPhone 15 Pro Max": 1,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D9: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 1,
          "iPhone 13 Pro": 1,
          "iPhone 13 Pro Max": 2,
          "iPhone 14": 0,
          "iPhone 14 Plus": 3,
          "iPhone 14 Pro": 1,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 1,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 1,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D10: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 0,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 1,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 2,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 1,
        },
        D11: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 2,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 1,
          "iPhone 14 Plus": 1,
          "iPhone 14 Pro": 1,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 1,
          "iPhone 15 Plus": 1,
          "iPhone 15 Pro": 2,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 1,
          "iPhone 17 Pro": 0,
          "iPhone 17 Pro Max": 1,
        },
        D12: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 1,
          "iPhone 14": 0,
          "iPhone 14 Plus": 1,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 1,
          "iPhone 15": 1,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 1,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 9,
        },
        D13: {},
        D14: {
          "iPhone 12": 1,
          "iPhone 12 Pro Max": 1,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 1,
          "iPhone 14": 1,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 1,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 1,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 3,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 2,
        },
        D15: {},
        D16: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 0,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 1,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 2,
          "iPhone 17 Pro Max": 1,
        },
        D17: {},
        D18: {},
        D19: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 2,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 1,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D20: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 1,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 1,
          "iPhone 14 Plus": 2,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 1,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 2,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D21: {},
        D22: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 0,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 0,
          "iPhone 17 Pro Max": 1,
        },
        D25: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 1,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 0,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 1,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D28: {
          "iPhone 12": 1,
          "iPhone 12 Pro Max": 1,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 1,
          "iPhone 14": 1,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 2,
          "iPhone 17 Pro Max": 0,
        },
        D33: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 0,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 2,
          "iPhone 17 Pro Max": 0,
        },
        D34: {},
        D42: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 0,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 1,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 3,
          "iPhone 17 Pro": 2,
          "iPhone 17 Pro Max": 2,
        },
        D43: {},
        D44: {
          "iPhone 12": 0,
          "iPhone 12 Pro Max": 0,
          "iPhone 13": 0,
          "iPhone 13 Pro": 0,
          "iPhone 13 Pro Max": 0,
          "iPhone 14": 0,
          "iPhone 14 Plus": 0,
          "iPhone 14 Pro": 0,
          "iPhone 14 Pro Max": 0,
          "iPhone 15": 0,
          "iPhone 15 Plus": 0,
          "iPhone 15 Pro": 0,
          "iPhone 15 Pro Max": 0,
          "iPhone 16": 0,
          "iPhone 16 Plus": 0,
          "iPhone 16 Pro": 0,
          "iPhone 16 Pro Max": 0,
          "iPhone 17": 0,
          "iPhone 17 Air": 0,
          "iPhone 17 Pro": 1,
          "iPhone 17 Pro Max": 0,
        },
        D45: {},
        D46: {},
      };

      function getModelStock(designId, model) {
        const map = STOCK_MAP[designId] || {};
        return map[model] ?? -1; // -1 = pas de données
      }

      function getDesignGlobalStatus(designId) {
        const map = STOCK_MAP[designId] || {};
        const vals = Object.values(map);
        if (vals.length === 0) return "unknown";
        const total = vals.reduce((a, b) => a + b, 0);
        const dispo = vals.filter((v) => v > 0).length;
        if (total === 0) return "out";
        if (dispo <= 3) return "limited";
        return "available";
      }

      // NOTE: Ces tableaux sont mutables — Firebase les met à jour en temps réel
      // MDS_G1 = modèles ≤ 3 500 FCFA | MDS_G2 = modèles > 3 500 FCFA
      const MDS_G1 = [
        "iPhone 12",
        "iPhone 12 Pro Max",
        "iPhone 13",
        "iPhone 13 Pro",
        "iPhone 13 Pro Max",
      ];
      const MDS_G2 = [
        "iPhone 14",
        "iPhone 14 Plus",
        "iPhone 14 Pro",
        "iPhone 14 Pro Max",
        "iPhone 15",
        "iPhone 15 Plus",
        "iPhone 15 Pro",
        "iPhone 15 Pro Max",
        "iPhone 16",
        "iPhone 16 Plus",
        "iPhone 16 Pro",
        "iPhone 16 Pro Max",
        "iPhone 17",
        "iPhone 17 Air",
        "iPhone 17 Pro",
        "iPhone 17 Pro Max",
      ];
      const ALL_MDS = [...MDS_G1, ...MDS_G2]; // Firebase remplace le contenu via .length=0 + push

      let curD = null,
        dQty = 1,
        prevPg = "catalogue",
        activeTag = "all",
        stockFilter = "all";

      function fp(n) {
        return Number(n).toLocaleString("fr-FR") + " FCFA";
      }

      // ── Sécurité : échapper le HTML pour éviter les injections XSS ────────────
      function escapeHTML(str) {
        if (str == null) return "";
        return String(str).replace(/[&<>"']/g, (c) => ({
          "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
        }[c]));
      }

      // ── Mini-rendu Markdown → HTML (échappe d'abord, puis applique le markdown) ─
      function renderMarkdown(src) {
        if (!src) return "";
        let html = escapeHTML(src);
        // Titres
        html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
        html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
        html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");
        // Gras / italique
        html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        html = html.replace(/_(.+?)_/g, "<em>$1</em>");
        // Citation
        html = html.replace(/^&gt; (.*)$/gm, "<blockquote>$1</blockquote>");
        // Séparateur
        html = html.replace(/^---$/gm, "<hr>");
        // Listes
        html = html.replace(/^- (.*)$/gm, "<li>$1</li>");
        html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => "<ul>" + m + "</ul>");
        // Paragraphes (lignes restantes non vides, non déjà des balises bloc)
        html = html
          .split(/\n{2,}/)
          .map((block) => {
            const trimmed = block.trim();
            if (!trimmed) return "";
            if (/^<(h1|h2|h3|ul|li|blockquote|hr)/.test(trimmed)) return trimmed;
            return `<p>${trimmed.replace(/\n/g, "<br>")}</p>`;
          })
          .join("\n");
        return html;
      }

      // ticker
      const tItems = [
        "BOGOLAN",
        "DJENNÉ",
        "N'KO",
        "TOUAREG",
        "AFRICA",
        "CIWARA",
        "MUNYU",
        "WAX",
        "SARAMAYA",
        "AFRO QUEEN",
        "BÈNKADI",
        "MASQUE DOGON",
        "DJOLIBA",
        "NYA",
        "SABABU",
        "WARI",
        "MONUMENT DU MALI",
      ];

      // Le script est après le DOM — on initialise directement
      const tEl = document.getElementById("ttick");
      if (tEl) {
        const tH = tItems
          .map(
            (x) => `<span class="ti"><span class="ti-dot"></span>${x}</span>`,
          )
          .join("");
        tEl.innerHTML = tH + tH;
      }
      // Année dynamique dans le footer
      const fyEl = document.getElementById("footer-year");
      if (fyEl) fyEl.textContent = new Date().getFullYear();
      initHome();

      function getPrice(model) {
        return MDS_G1.includes(model) ? fp(3500) : fp(5000);
      }

      function updatePrice() {
        if (!curD) return;
        const model = document.getElementById("d-mod").value;
        const sb = document.getElementById("d-stock-badge");
        const waBtn = document.getElementById("wa-order-btn");
        const waSpan = waBtn.querySelector("span");
        const cartBtn = document.getElementById("det-cart-btn");

        // Aucun modèle disponible
        if (!model) {
          sb.className = "det-stock out";
          sb.innerHTML =
            '<i class="ti ti-alert-circle"></i> Aucun modèle disponible';
          waBtn.disabled = true;
          waBtn.style.opacity = ".35";
          waBtn.style.cursor = "not-allowed";
          waSpan.textContent = "Aucun modèle disponible";
          if (cartBtn) {
            cartBtn.disabled = true;
            cartBtn.style.opacity = ".35";
          }
          document.getElementById("d-price-display").textContent = "—";
          return;
        }

        const qty = getModelStock(curD.id, model);
        const price = MDS_G1.includes(model) ? 3500 : 5000;

        // Ajuster dQty si dépasse le stock (ignorer si qty=-1 = pas de données)
        if (qty > 0 && dQty > qty) {
          dQty = Math.max(1, qty);
          document.getElementById("d-qty").textContent = dQty;
        }
        const plusBtn = document.querySelectorAll(".qb")[1];
        if (plusBtn)
          plusBtn.style.opacity = qty > 0 && dQty >= qty ? ".3" : "1";

        document.getElementById("d-price-display").textContent =
          fp(price) + " × " + dQty + " = " + fp(price * dQty);

        if (qty === -1) {
          // Pas de données stock — on laisse commander
          sb.className = "det-stock available";
          sb.innerHTML = '<i class="ti ti-circle-check"></i> En stock';
          waBtn.disabled = false;
          waBtn.style.opacity = "1";
          waBtn.style.cursor = "pointer";
          waSpan.textContent = "Commander";
          if (cartBtn) {
            cartBtn.disabled = false;
            cartBtn.style.opacity = "1";
          }
        } else if (qty === 0) {
          sb.className = "det-stock out";
          sb.innerHTML = '<i class="ti ti-clock"></i> Rupture pour ce modèle';
          waBtn.disabled = true;
          waBtn.style.opacity = ".35";
          waBtn.style.cursor = "not-allowed";
          waSpan.textContent = "Indisponible pour ce modèle";
          if (cartBtn) {
            cartBtn.disabled = true;
            cartBtn.style.opacity = ".35";
          }
        } else if (qty <= 2) {
          sb.className = "det-stock limited";
          sb.innerHTML = `<i class="ti ti-alert-triangle"></i> Plus que ${qty} en stock — commandez vite`;
          waBtn.disabled = false;
          waBtn.style.opacity = "1";
          waBtn.style.cursor = "pointer";
          waSpan.textContent = "Commander";
          if (cartBtn) {
            cartBtn.disabled = false;
            cartBtn.style.opacity = "1";
          }
        } else {
          sb.className = "det-stock available";
          sb.innerHTML = '<i class="ti ti-circle-check"></i> En stock';
          waBtn.disabled = false;
          waBtn.style.opacity = "1";
          waBtn.style.cursor = "pointer";
          waSpan.textContent = "Commander";
          if (cartBtn) {
            cartBtn.disabled = false;
            cartBtn.style.opacity = "1";
          }
        }
        syncMobileBar();
      }

      function toast(msg) {
        const el = document.getElementById("toast-el");
        el.textContent = msg;
        el.classList.add("show");
        setTimeout(() => el.classList.remove("show"), 2800);
      }

      // ══ CLOUDINARY — optimisation automatique des images ══════════════════════
      // Injecte w_auto,f_auto,q_auto dans les URLs Cloudinary pour 3-5x moins de poids
      function cldImg(url, w) {
        if (!url) return ""; // guard — pas de requête vide
        if (!url.includes("cloudinary.com")) return url;
        var width = w || 500;
        return url.replace(
          "/upload/",
          "/upload/w_" + width + ",f_auto,q_auto/",
        );
      }

      // ══ BLOG — Firestore (géré depuis culturecase-gs) ══════════════════════════
      let BLOG = []; // rempli en temps réel depuis la collection blog_posts

      function listenBlog() {
        if (window.__blogListening) return;
        window.__blogListening = true;

        const { collection, query, where, orderBy, onSnapshot } =
          window.__firestoreAPI;
        const q = query(
          collection(window.__db, "blog_posts"),
          where("published", "==", true),
          orderBy("createdAt", "desc"),
        );

        onSnapshot(
          q,
          function (snap) {
            BLOG = snap.docs.map(function (d) {
              const data = d.data();
              return {
                id: d.id,
                title: data.title || "",
                excerpt: data.excerpt || "",
                content: data.content || "",
                cover: data.cover || "",
                tag: data.tags?.[0] || "culture",
                tags: data.tags || [],
                createdAt: data.createdAt,
                published: data.published,
              };
            });
            if (document.querySelector(".pg.on")?.id === "pg-blog")
              renderBlog();
          },
          function (err) {
            console.error("[CultureCase] Blog Firestore error:", err);
          },
        );
      }

      let activeBlogTag = "all";

      function filterBlog(tag, btn) {
        activeBlogTag = tag;
        document
          .querySelectorAll(".blog-cats .ftag")
          .forEach((x) => x.classList.remove("on"));
        if (btn) btn.classList.add("on");
        renderBlog();
      }

      function renderBlog() {
        const filtered = BLOG.filter(
          (b) => activeBlogTag === "all" || b.tag === activeBlogTag,
        );
        const grid = document.getElementById("blog-grid");
        if (!grid) return;
        let html = "";
        filtered.forEach((b, i) => {
          if (i === 0 && activeBlogTag === "all") {
            html += `<div class="blog-featured" onclick="openBlog('${b.id}')">
        <div class="bf-img"><img src="${cldImg(b.img, 600)}" alt="${escapeHTML(b.title)}" loading="lazy"></div>
        <div class="bf-body">
          <span class="bf-tag">${escapeHTML(b.tag)}</span>
          <div class="bf-title">${escapeHTML(b.title)}</div>
          <div class="bf-excerpt">${escapeHTML(b.excerpt)}</div>
          <div class="bf-meta"><span class="bf-date">${escapeHTML(b.date)}</span><span>·</span><span>${escapeHTML(b.read)}</span></div>
        </div>
      </div>`;
          } else {
            html += `<div class="bcard" onclick="openBlog('${b.id}')">
        <div class="bc-img"><img src="${cldImg(b.img, 600)}" alt="${escapeHTML(b.title)}" loading="lazy"></div>
        <div class="bc-body">
          <span class="bc-tag">${escapeHTML(b.tag)}</span>
          <div class="bc-title">${escapeHTML(b.title)}</div>
          <div class="bc-excerpt">${escapeHTML(b.excerpt)}</div>
          <div class="bc-meta"><span class="bc-date">${escapeHTML(b.date)}</span><span>·</span><span>${escapeHTML(b.read)}</span></div>
        </div>
      </div>`;
          }
        });
        grid.innerHTML =
          html ||
          `<p style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--muted)">Aucun article dans cette catégorie pour l'instant.</p>`;
      }

      function openBlog(id) {
        const b = BLOG.find((x) => x.id === id);
        if (!b) return;
        document.getElementById("bd-tag").textContent = b.tag;
        document.getElementById("bd-title").textContent = b.title;
        document.getElementById("bd-date").textContent = b.date;
        document.getElementById("bd-read").textContent = b.read;
        document.getElementById("bd-img").src = cldImg(b.img, 900);
        document.getElementById("bd-content").innerHTML = renderMarkdown(b.content);
        // related
        const rel = BLOG.filter((x) => x.id !== id).slice(0, 3);
        document.getElementById("bd-related").innerHTML = rel
          .map(
            (r) => `<div class="bcard" onclick="openBlog('${r.id}')">
    <div class="bc-img"><img src="${cldImg(r.img, 400)}" alt="${escapeHTML(r.title)}" loading="lazy"></div>
    <div class="bc-body"><span class="bc-tag">${escapeHTML(r.tag)}</span><div class="bc-title">${escapeHTML(r.title)}</div><div class="bc-meta"><span class="bc-date">${escapeHTML(r.date)}</span><span>·</span><span>${escapeHTML(r.read)}</span></div></div>
  </div>`,
          )
          .join("");
        go("blogdet");
      }

      function toggleMobileMenu() {
        const ham = document.getElementById("nav-ham");
        const menu = document.getElementById("nav-mobile");
        ham.classList.toggle("open");
        menu.classList.toggle("open");
      }

      // ── Sticky mobile order bar ───────────────────────────────────────────────
      var CART = []; // [{ designId, name, img, model, qty, price }]

      // ── Persistance du panier (localStorage) ──────────────────────────────────
      const CART_STORAGE_KEY = "cc_cart";
      function saveCart() {
        try {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(CART));
        } catch (e) {
          console.error("[CultureCase] Impossible de sauvegarder le panier:", e);
        }
      }
      function loadCart() {
        try {
          const raw = localStorage.getItem(CART_STORAGE_KEY);
          if (!raw) return;
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            parsed.forEach((item) => {
              if (item && item.designId && item.model && item.qty > 0) {
                CART.push(item);
              }
            });
          }
        } catch (e) {
          console.error("[CultureCase] Impossible de charger le panier:", e);
          try { localStorage.removeItem(CART_STORAGE_KEY); } catch (_) {}
        }
      }
      loadCart();
      if (CART.length > 0) {
        updateCartBadge();
        renderCartItems();
      }
      function syncMobileBar() {
        if (typeof CART !== "undefined") updateCartBadge();
        if (window.innerWidth > 640) return;
        const bar = document.getElementById("mobile-order-bar");
        const pg = document.querySelector(".pg.on")?.id;
        if (!bar) return;

        // Masquer si pas sur page détail ou curD pas défini
        if (pg !== "pg-detail" || !curD) {
          bar.style.display = "none";
          return;
        }

        // Masquer si toutes ruptures de stock
        const hasStock = ALL_MDS.some((m) => getModelStock(curD.id, m) > 0);
        if (!hasStock) {
          bar.style.display = "none";
          return;
        }

        bar.style.display = "block";
        const nameEl = document.getElementById("mob-design-name");
        const priceEl = document.getElementById("mob-price");
        if (nameEl) nameEl.textContent = curD.name;
        if (priceEl) {
          const priceBox = document.getElementById("d-price-display");
          priceEl.textContent = priceBox ? priceBox.textContent : "";
        }
      }

      // Fermer le menu si clic en dehors
      document.addEventListener("click", function (e) {
        const ham = document.getElementById("nav-ham");
        const menu = document.getElementById("nav-mobile");
        if (
          ham &&
          menu &&
          !ham.contains(e.target) &&
          !menu.contains(e.target)
        ) {
          ham.classList.remove("open");
          menu.classList.remove("open");
        }
      });

      // Afficher hamburger sur mobile
      function checkMobile() {
        const ham = document.getElementById("nav-ham");
        if (ham) ham.style.display = window.innerWidth <= 640 ? "flex" : "none";
        syncMobileBar();
      }
      window.addEventListener("resize", checkMobile);
      checkMobile();

      function go(p) {
        var target = document.getElementById("pg-" + p);
        if (!target) {
          toast("⚠️ Page introuvable");
          return;
        } // guard — évite TypeError si page absente
        document
          .querySelectorAll(".pg")
          .forEach((x) => x.classList.remove("on"));
        target.classList.add("on");
        document
          .querySelectorAll(".nb")
          .forEach((x) => x.classList.remove("on"));
        var nb = document.getElementById("nm-" + p);
        if (nb) nb.classList.add("on");
        var nbm = document.getElementById("nm-" + p + "-m");
        if (nbm) nbm.classList.add("on");
        window.scrollTo(0, 0);
        if (p === "catalogue") initCat();
        if (p === "home") initHome();
        if (p === "blog") renderBlog();
        syncMobileBar();
      }

      function card(d) {
        const gmEl = document.getElementById("global-model");
        const gm = gmEl ? gmEl.value : "";

        // Badge dispo si modèle sélectionné
        let availBadge = "";
        let stockDot = '<span class="pc-stock-dot dot-ok"></span>';
        let stockHint = "Disponible";
        if (gm) {
          const qty = getModelStock(d.id, gm);
          if (qty === -1) {
            // Pas de données stock pour ce design × modèle
            availBadge = "";
            stockDot = '<span class="pc-stock-dot dot-out"></span>';
            stockHint = `Stock inconnu pour ${gm}`;
          } else if (qty > 0 && qty <= 3) {
            availBadge = `<div class="stock-badge stock-limited">Derniers</div>`;
            stockDot = '<span class="pc-stock-dot dot-lim"></span>';
            stockHint = `${qty} restant${qty > 1 ? "s" : ""} pour ${gm}`;
          } else if (qty > 3) {
            availBadge = `<div class="stock-badge stock-available">Dispo</div>`;
            stockHint = `En stock pour ${gm}`;
          } else {
            availBadge = `<div class="stock-badge stock-out">Rupture</div>`;
            stockDot = '<span class="pc-stock-dot dot-out"></span>';
            stockHint = `Rupture pour ${gm}`;
          }
        }

        const price = gm
          ? MDS_G1.includes(gm)
            ? "3 500 FCFA"
            : "5 000 FCFA"
          : "3 500 – 5 000 FCFA";
        const isOut = gm && getModelStock(d.id, gm) === 0;

        return `<div class="pcard${isOut ? " is-out" : ""}" onclick="openDet('${d.id}')">
    <div class="pc-img">
      <img src="${cldImg(d.img, 400)}" alt="${d.name}" loading="lazy" onerror="this.parentNode.style.background='var(--sand)'">
      <div class="pc-overlay">
        <button class="pc-ov-btn" onclick="event.stopPropagation();openDet('${d.id}')">Voir le design</button>
      </div>
      ${availBadge}
    </div>
    <div class="pc-body">
      <div class="pc-name">${d.name}</div>
      <div class="pc-hint">${stockDot}${stockHint}</div>
      <div class="pc-row">
        <div class="pc-price">${price}</div>
      </div>
    </div>
  </div>`;
      }

      function goToCatalogueWithModel(model) {
        go("catalogue");
        if (model) {
          setTimeout(() => {
            const sel = document.getElementById("global-model");
            if (sel) {
              sel.value = model;
              onGlobalModelChange();
            }
          }, 100);
        }
      }

      function initHome() {
        const grid = document.getElementById("home-grid");
        if (grid) grid.innerHTML = DS.slice(0, 8).map(card).join("");
        // Stats dynamiques
        const statD = document.getElementById("stat-designs");
        const statM = document.getElementById("stat-models");
        if (statD) statD.textContent = DS.length;
        if (statM) statM.textContent = ALL_MDS.length;
      }

      function initCat() {
        filt();
      }

      var activeSort = "popular"; // 'popular' | 'new'

      function setSort(sort, btn) {
        activeSort = sort;
        document
          .querySelectorAll("#sort-pop, #sort-new")
          .forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        const label = document.getElementById("cat-sort-label");
        if (label)
          label.textContent =
            sort === "popular"
              ? "Tous les designs"
              : "✦ Les 6 derniers ajoutés";
        filt();
      }

      function toggleDispo(btn) {
        const gm = document.getElementById("global-model")?.value || "";
        if (!gm) return; // guard — le bouton est disabled mais au cas où
        stockFilter = stockFilter === "available" ? "all" : "available";
        btn.classList.toggle("on");
        filt();
      }

      function onGlobalModelChange() {
        const sel = document.getElementById("global-model");
        const m = sel.value;
        sel.classList.toggle("chosen", !!m);
        const hint = document.getElementById("mb-price-hint");
        const info = document.getElementById("mb-info");
        // Activer/désactiver le bouton "Disponible" selon si un modèle est choisi
        const dispoBtn = document.getElementById("dispo-btn");
        if (dispoBtn) {
          if (m) {
            dispoBtn.disabled = false;
            dispoBtn.style.opacity = "1";
            dispoBtn.style.cursor = "pointer";
            dispoBtn.title = "";
          } else {
            dispoBtn.disabled = true;
            dispoBtn.style.opacity = ".38";
            dispoBtn.style.cursor = "not-allowed";
            dispoBtn.title = "Choisis d'abord ton modèle iPhone";
            // Désactiver le filtre si actif
            if (stockFilter === "available") {
              stockFilter = "all";
              dispoBtn.classList.remove("on");
            }
          }
        }
        if (m) {
          hint.textContent = MDS_G1.includes(m) ? "3 500 FCFA" : "5 000 FCFA";
          const dispo = DS.filter((d) => getModelStock(d.id, m) > 0).length;
          info.innerHTML = `<strong>${dispo} design${dispo > 1 ? "s" : ""}</strong> disponibles pour ${m}`;
        } else {
          if (hint) hint.textContent = "";
          if (info) info.textContent = "";
        }
        filt();
      }

      function filt() {
        if (!DS || DS.length === 0) return;
        const q = (document.getElementById("sinp")?.value || "")
          .trim()
          .toLowerCase();
        const gm = document.getElementById("global-model")?.value || "";
        let res = DS.filter((d) => {
          if (
            stockFilter === "available" &&
            gm &&
            getModelStock(d.id, gm) === 0
          )
            return false;
          if (q && !d.name.toLowerCase().includes(q)) return false;
          return true;
        });

        // Tri selon activeSort
        if (activeSort === "popular") {
          // TOUS — ordre éditorial DS[], ruptures totales en fin de liste
          const dsOrder = DS.map((d) => d.id);
          res.sort((a, b) => {
            const aOut = ALL_MDS.every((m) => getModelStock(a.id, m) === 0);
            const bOut = ALL_MDS.every((m) => getModelStock(b.id, m) === 0);
            if (aOut !== bOut) return aOut ? 1 : -1;
            return dsOrder.indexOf(a.id) - dsOrder.indexOf(b.id);
          });
        } else if (activeSort === "new") {
          // NOUVEAUTÉS — les 6 derniers ajoutés (fin de DS[]), du plus récent au plus ancien
          res = [...res].reverse().slice(0, 6);
        }

        // Compteur
        let countTxt = `${res.length} design${res.length > 1 ? "s" : ""}`;
        if (gm) {
          const dispo = res.filter((d) => getModelStock(d.id, gm) > 0).length;
          countTxt += ` · <span style="color:var(--leaf);font-weight:600">${dispo} disponible${dispo > 1 ? "s" : ""} pour ${gm}</span>`;
        }
        document.getElementById("cat-count").innerHTML = countTxt;
        document.getElementById("cat-grid").innerHTML = res.length
          ? res.map(card).join("")
          : `<p style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--muted)">Aucun résultat.</p>`;
      }

      function openDet(id) {
        prevPg =
          document.querySelector(".pg.on")?.id?.replace("pg-", "") ||
          "catalogue";
        curD = DS.find((d) => d.id === id);
        if (!curD) return;
        dQty = 1;
        document.getElementById("d-img").src = cldImg(curD.img, 800);
        document.getElementById("d-name").textContent = curD.name;
        document.getElementById("d-story").textContent = curD.story;
        document.getElementById("d-qty").textContent = "1";
        // sélecteur avec stock visible par modèle
        const sel = document.getElementById("d-mod");
        sel.innerHTML = ALL_MDS.map((m) => {
          const qty = getModelStock(curD.id, m);
          if (qty === 0) return "";
          let label = m;
          if (qty === 1) label += " — 1 restant";
          else if (qty <= 3) label += " — " + qty + " restants";
          return `<option value="${m}">${label}</option>`;
        })
          .filter(Boolean)
          .join("");
        if (!sel.innerHTML)
          sel.innerHTML = '<option value="">Aucun modèle disponible</option>';
        // pré-sélectionner le modèle global si choisi, sinon le premier dispo
        const gm = document.getElementById("global-model")?.value || "";
        // Utiliser gm seulement si ce modèle est bien disponible pour ce design
        const gmAvail = gm && getModelStock(curD.id, gm) > 0;
        const firstAvail = gmAvail
          ? gm
          : ALL_MDS.find((m) => getModelStock(curD.id, m) > 0) || "";
        if (firstAvail) sel.value = firstAvail;
        // pré-remplir infos client si mémorisées
        try {
          const sn = localStorage.getItem("cc_nom") || "";
          const st = localStorage.getItem("cc_tel") || "";
          if (sn) document.getElementById("lf-nom").value = sn;
          if (st) document.getElementById("lf-tel").value = st;
        } catch (e) {}
        updatePrice();
        go("detail");
      }

      function goBack() {
        go(prevPg);
      }
      function dq(d) {
        dQty = Math.max(1, dQty + d);
        document.getElementById("d-qty").textContent = dQty;
        updatePrice();
      }

      function orderWA() {
        if (!curD) return;
        const model = document.getElementById("d-mod").value;
        if (!model) {
          toast("⚠️ Choisis un modèle iPhone d'abord");
          return;
        }
        const nom = (document.getElementById("lf-nom").value || "").trim();
        const tel = (document.getElementById("lf-tel").value || "").trim();
        const quartier = (
          document.getElementById("lf-quartier").value || ""
        ).trim();
        if (!nom) {
          toast("⚠️ Indique ton prénom pour qu'on te retrouve");
          return;
        }
        if (!tel) {
          toast("⚠️ Indique ton numéro de téléphone");
          return;
        }
        try {
          localStorage.setItem("cc_nom", nom);
          localStorage.setItem("cc_tel", tel);
          if (quartier) localStorage.setItem("cc_quartier", quartier);
        } catch (e) {}
        const safeQty = typeof dQty === "number" && dQty > 0 ? dQty : 1;
        const unitPrice = MDS_G1.includes(model) ? 3500 : 5000; // source unique — même logique que getCartPrice
        const total = fp(unitPrice * safeQty);
        let msg = `Bonjour CultureCase 👋\n\n🎨 Design : ${curD.name}\n📱 Modèle : ${model}\n🔢 Quantité : ${safeQty}\n💰 Total : ${total}`;
        if (nom) msg += `\n\n👤 Nom : ${nom}`;
        if (tel) msg += `\n📞 Téléphone : ${tel}`;
        if (quartier) msg += `\n📍 Quartier : ${quartier}`;
        msg += `\n\nMerci !`;
        window.open(
          "https://wa.me/22375992482?text=" + encodeURIComponent(msg),
          "_blank",
        );
        // Toast de confirmation
        toast("✓ Message WhatsApp ouvert — on te confirme sous 30 min !");
      }

      function orderQuick(id) {
        const d = DS.find((x) => x.id === id);
        if (!d) return;
        const gm = document.getElementById("global-model")?.value || "";
        const nom = localStorage.getItem("cc_nom") || "";
        const tel = localStorage.getItem("cc_tel") || "";
        const _price = gm
          ? fp(MDS_G1.includes(gm) ? 3500 : 5000)
          : "3 500 – 5 000 FCFA";
        let msg = `Bonjour CultureCase 👋\n\nJe voudrais commander :\n🎨 Design : ${d.name}\n📱 Modèle : ${gm || "(à préciser)"}\n🔢 Quantité : 1\n💰 Prix unitaire : ${_price}`;
        if (nom) msg += `\n\n👤 Nom : ${nom}`;
        if (tel) msg += `\n📞 Téléphone : ${tel}`;
        msg += `\n\nMerci !`;
        window.open(
          "https://wa.me/22375992482?text=" + encodeURIComponent(msg),
          "_blank",
        );
      }

      // ══════════════════════════════════════════════════════════════════════════════
      // SYSTÈME DE PANIER
      // ══════════════════════════════════════════════════════════════════════════════

      function getCartPrice(model) {
        // Même logique que le reste du site
        return typeof MDS_G1 !== "undefined" && MDS_G1.includes(model)
          ? 3500
          : 5000;
      }

      function cartTotal() {
        return CART.reduce((s, item) => s + item.price * item.qty, 0);
      }

      function updateCartBadge() {
        const total = CART.reduce((s, i) => s + i.qty, 0);
        const badge = document.getElementById("cart-badge");
        const label = document.getElementById("cart-count-label");
        if (!badge) return;
        if (total > 0) {
          badge.textContent = total;
          badge.classList.add("visible");
          if (label)
            label.textContent = total + " article" + (total > 1 ? "s" : "");
        } else {
          badge.classList.remove("visible");
          if (label) label.textContent = "Panier";
        }
        document.getElementById("cart-total") &&
          (document.getElementById("cart-total").textContent = fp(cartTotal()));
      }

      function showCartToast(msg) {
        const t = document.getElementById("cart-toast");
        if (!t) return;
        t.textContent = msg;
        t.classList.add("show");
        setTimeout(() => t.classList.remove("show"), 2500);
      }

      let _pickDesignId = null; // design en attente de choix de modèle

      function addToCart(designId, modelOverride) {
        const d = DS.find((x) => x.id === designId);
        if (!d) return;

        // Bloquer si rupture totale sur tous les modèles
        const hasAnyStock = ALL_MDS.some((m) => getModelStock(designId, m) > 0);
        if (!hasAnyStock) {
          showCartToast("❌ " + d.name + " est épuisé");
          return;
        }

        const gm = document.getElementById("global-model")?.value || "";

        // Si modèle déjà connu ET en stock → ajout direct fluide
        if (modelOverride || gm) {
          const model = modelOverride || gm;
          // Vérifier le stock pour ce modèle précis
          if (getModelStock(designId, model) === 0) {
            // Ce modèle est épuisé → ouvrir la popup pour choisir un autre
            showCartToast("⚠️ " + model + " épuisé pour ce design");
            // Continuer vers la popup
          } else {
            _doAddToCart(designId, model);
            return;
          }
        }

        // Sinon → ouvrir la popup légère de choix de modèle
        _pickDesignId = designId;
        const nameEl = document.getElementById("model-pick-name");
        if (nameEl) nameEl.textContent = d.name;

        const sel = document.getElementById("model-pick-sel");
        if (sel) {
          sel.innerHTML = ALL_MDS.map((m) => {
            const stock = getModelStock(designId, m);
            if (stock === 0) return ""; // masquer complètement les ruptures
            const label =
              stock <= 2
                ? m + " — " + stock + " restant" + (stock > 1 ? "s" : "")
                : m;
            return `<option value="${m}">${label}</option>`;
          })
            .filter(Boolean)
            .join("");
          if (!sel.innerHTML)
            sel.innerHTML = '<option value="">Aucun modèle disponible</option>';
          // Pré-sélectionner le dernier modèle utilisé si dispo
          const lastModel = localStorage.getItem("cc_last_model");
          const firstDispo =
            lastModel && getModelStock(designId, lastModel) > 0
              ? lastModel
              : ALL_MDS.find((m) => getModelStock(designId, m) > 0);
          if (firstDispo) sel.value = firstDispo;
        }

        // Afficher la popup
        const overlay = document.getElementById("model-pick-overlay");
        const popup = document.getElementById("model-pick-popup");
        if (overlay) overlay.style.display = "block";
        if (popup) {
          popup.style.display = "block";
          setTimeout(() => (popup.style.transform = "translateY(0)"), 10);
        }
      }

      function closeModelPick() {
        const overlay = document.getElementById("model-pick-overlay");
        const popup = document.getElementById("model-pick-popup");
        if (popup) popup.style.transform = "translateY(100%)";
        setTimeout(() => {
          if (overlay) overlay.style.display = "none";
          if (popup) popup.style.display = "none";
        }, 300);
        _pickDesignId = null;
      }

      function confirmModelPick() {
        if (!_pickDesignId) return;
        const sel = document.getElementById("model-pick-sel");
        const model = sel ? sel.value : "";
        if (!model || model === "") {
          showCartToast("⚠️ Choisis un modèle");
          return;
        }
        try {
          localStorage.setItem("cc_last_model", model);
        } catch (e) {}
        const designId = _pickDesignId; // capturer avant closeModelPick() qui nullifie _pickDesignId
        closeModelPick();
        setTimeout(() => _doAddToCart(designId, model), 320);
      }

      function _doAddToCart(designId, model) {
        const d = DS.find((x) => x.id === designId);
        if (!d || !model) return;
        const price = getCartPrice(model);

        const existing = CART.find(
          (i) => i.designId === designId && i.model === model,
        );
        if (existing) {
          existing.qty++;
        } else {
          CART.push({
            designId,
            name: d.name,
            img: d.img,
            model,
            qty: 1,
            price,
          });
        }

        updateCartBadge();
        renderCartItems();
        saveCart();
        showCartToast("✓ " + d.name + " · " + model + " ajouté");
      }

      function removeFromCart(idx) {
        CART.splice(idx, 1);
        updateCartBadge();
        renderCartItems();
        saveCart();
      }

      function updateCartQty(idx, delta) {
        const item = CART[idx];
        if (!item) return;
        const _s = getModelStock(item.designId, item.model);
        const maxQty = _s > 0 ? _s : 99; // -1 = pas de données → on laisse libre
        item.qty = Math.min(maxQty, Math.max(1, item.qty + delta));
        updateCartBadge();
        renderCartItems();
        saveCart();
      }

      function renderCartItems() {
        const container = document.getElementById("cart-items");
        const footer = document.getElementById("cart-footer");
        if (!container) return;

        if (CART.length === 0) {
          container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Ton panier est vide.<br>Ajoute des designs pour commander.</p>
        <button class="cart-empty-cta" onclick="closeCart();go('catalogue')">
          Voir le catalogue
        </button>
      </div>`;
          if (footer) footer.style.display = "none";
          return;
        }

        // Pré-remplir les champs avec localStorage
        try {
          const sn = localStorage.getItem("cc_nom") || "";
          const st = localStorage.getItem("cc_tel") || "";
          const sq = localStorage.getItem("cc_quartier") || "";
          setTimeout(() => {
            if (
              sn &&
              document.getElementById("cart-nom") &&
              !document.getElementById("cart-nom").value
            )
              document.getElementById("cart-nom").value = sn;
            if (
              st &&
              document.getElementById("cart-tel") &&
              !document.getElementById("cart-tel").value
            )
              document.getElementById("cart-tel").value = st;
            if (
              sq &&
              document.getElementById("cart-quartier") &&
              !document.getElementById("cart-quartier").value
            )
              document.getElementById("cart-quartier").value = sq;
          }, 50);
        } catch (e) {}

        // Construction sécurisée anti-XSS (textContent pour les données utilisateur)
        container.innerHTML = "";
        CART.forEach((item, idx) => {
          const wrap = document.createElement("div");
          wrap.className = "cart-item";

          const imgBox = document.createElement("div");
          imgBox.className = "cart-item-img";
          if (item.img) {
            const img = document.createElement("img");
            img.src = cldImg(item.img, 120);
            img.alt = item.name;
            img.loading = "lazy";
            const fallback = document.createElement("span");
            fallback.style.cssText =
              "font-size:28px;display:none;align-items:center;justify-content:center;width:100%;height:100%";
            fallback.textContent = "📱";
            img.onerror = function () {
              this.style.display = "none";
              fallback.style.display = "flex";
            };
            imgBox.appendChild(img);
            imgBox.appendChild(fallback);
          } else {
            const fallback = document.createElement("span");
            fallback.style.cssText =
              "font-size:28px;display:flex;align-items:center;justify-content:center;width:100%;height:100%";
            fallback.textContent = "📱";
            imgBox.appendChild(fallback);
          }

          const info = document.createElement("div");
          info.className = "cart-item-info";

          const nameEl = document.createElement("div");
          nameEl.className = "cart-item-name";
          nameEl.textContent = item.name;

          const modelEl = document.createElement("div");
          modelEl.className = "cart-item-model";
          modelEl.textContent = item.model;

          const bottom = document.createElement("div");
          bottom.className = "cart-item-bottom";

          const priceEl = document.createElement("div");
          priceEl.className = "cart-item-price";
          priceEl.textContent = fp(item.price * item.qty);

          const qtyEl = document.createElement("div");
          qtyEl.className = "cart-item-qty";
          qtyEl.innerHTML = `<button onclick="updateCartQty(${idx},-1)">−</button><span>${item.qty}</span><button onclick="updateCartQty(${idx},+1)">+</button>`;

          bottom.appendChild(priceEl);
          bottom.appendChild(qtyEl);
          info.appendChild(nameEl);
          info.appendChild(modelEl);
          info.appendChild(bottom);

          const del = document.createElement("button");
          del.className = "cart-item-del";
          del.title = "Retirer";
          del.textContent = "✕";
          del.onclick = () => removeFromCart(idx);

          wrap.appendChild(imgBox);
          wrap.appendChild(info);
          wrap.appendChild(del);
          container.appendChild(wrap);
        });

        if (footer) {
          footer.style.display = "block";
          document.getElementById("cart-total").textContent = fp(cartTotal());
        }
      }

      function showOrderConfirmation(nom) {
        const items = document.getElementById("cart-items");
        const footer = document.getElementById("cart-footer");
        if (!items) return;
        if (footer) footer.style.display = "none";

        const prenom = nom.split(" ")[0];
        items.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem 1.5rem;text-align:center;flex:1;gap:1rem">
      <div style="width:64px;height:64px;background:rgba(37,211,102,.12);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px">✓</div>
      <div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:var(--ink);margin-bottom:.3rem">Commande envoyée !</div>
        <div style="font-size:13px;color:var(--muted);line-height:1.6">Merci ${prenom} 🙏<br>Ton message WhatsApp a bien été ouvert.<br>On te confirme <strong style="color:var(--ink)">sous 30 min</strong>.</div>
      </div>
      <div style="background:var(--sand);border-radius:var(--radius-lg);padding:1rem 1.25rem;width:100%;font-size:12px;color:var(--muted);line-height:1.8;text-align:left">
        <div style="font-weight:700;color:var(--ink);margin-bottom:.4rem;font-size:11px;letter-spacing:1px">ET APRÈS ?</div>
        <div>📲 Envoie le message WhatsApp si ce n'est pas encore fait</div>
        <div>⏱ On te répond sous 30 min avec confirmation</div>
        <div>🛵 Livraison le jour même ou le lendemain</div>
      </div>
      <div style="display:flex;gap:8px;width:100%;margin-top:.5rem">
        <button onclick="closeCart();go('catalogue')"
          style="flex:1;padding:10px;background:var(--ember);color:#fff;border:none;border-radius:var(--radius);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit">
          Continuer les achats
        </button>
        <button onclick="closeCart()"
          style="padding:10px 16px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:var(--radius);font-size:13px;cursor:pointer;font-family:inherit">
          Fermer
        </button>
      </div>
    </div>`;
      }

      function openCart() {
        renderCartItems();
        document.getElementById("cart-overlay").classList.add("open");
        document.getElementById("cart-drawer").classList.add("open");
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", _cartEscHandler);
      }

      function closeCart() {
        document.getElementById("cart-overlay").classList.remove("open");
        document.getElementById("cart-drawer").classList.remove("open");
        document.body.style.overflow = "";
        document.removeEventListener("keydown", _cartEscHandler);
      }
      function _cartEscHandler(e) {
        if (e.key === "Escape") closeCart();
      }

      function cartOrderWA() {
        if (CART.length === 0) return;
        const nom = (document.getElementById("cart-nom").value || "").trim();
        const tel = (document.getElementById("cart-tel").value || "").trim();
        const quartier = (
          document.getElementById("cart-quartier").value || ""
        ).trim();

        // Validation minimale
        if (!nom) {
          showCartToast("⚠️ Indique ton prénom pour qu'on te retrouve");
          return;
        }
        if (!tel) {
          showCartToast("⚠️ Indique ton numéro de téléphone");
          return;
        }

        // Mémoriser infos client
        try {
          localStorage.setItem("cc_nom", nom);
          localStorage.setItem("cc_tel", tel);
          if (quartier) localStorage.setItem("cc_quartier", quartier);
        } catch (e) {}

        let msg = "Bonjour CultureCase 👋\n\n🛒 *MA COMMANDE :*\n";
        msg += "─────────────────\n";
        CART.forEach((item, i) => {
          msg += `\n${i + 1}. 🎨 *${item.name}*\n   📱 Modèle : ${item.model}\n   🔢 Quantité : ${item.qty}\n   💰 ${fp(item.price * item.qty)}\n`;
        });
        msg += "─────────────────\n";
        msg += `💰 *TOTAL : ${fp(cartTotal())}*`;
        if (nom) msg += `\n\n👤 Nom : ${nom}`;
        if (tel) msg += `\n📞 Téléphone : ${tel}`;
        if (quartier) msg += `\n📍 Quartier : ${quartier}`;
        msg += "\n\nMerci ! 🙏";

        // Ouvrir WhatsApp
        window.open(
          "https://wa.me/22375992482?text=" + encodeURIComponent(msg),
          "_blank",
        );

        // Vider le panier et afficher confirmation
        CART.length = 0;
        saveCart();
        updateCartBadge();
        showOrderConfirmation(nom);
      }

      // Ajouter depuis la page détail au panier
      function addToCartFromDet() {
        if (!curD) return;
        const model = document.getElementById("d-mod").value;
        if (!model) {
          showCartToast("⚠️ Choisis un modèle iPhone d'abord");
          return;
        }
        const stock = getModelStock(curD.id, model);
        if (stock === 0) {
          showCartToast("❌ Ce modèle est épuisé");
          return;
        }
        const price = getCartPrice(model);
        const existing = CART.find(
          (i) => i.designId === curD.id && i.model === model,
        );
        if (existing) {
          const newQty = existing.qty + dQty;
          existing.qty = stock > 0 ? Math.min(newQty, stock) : newQty;
        } else {
          const qty = stock > 0 ? Math.min(dQty, stock) : dQty;
          CART.push({
            designId: curD.id,
            name: curD.name,
            img: curD.img,
            model,
            qty,
            price,
          });
        }
        updateCartBadge();
        renderCartItems();
        saveCart();
        showCartToast("✓ " + curD.name + " · " + model + " ajouté au panier");
        openCart();
      }

      function sendContact() {
        const n = document.getElementById("cf-n").value.trim();
        const m = document.getElementById("cf-m").value.trim();
        if (!n) {
          toast("⚠️ Votre nom est requis");
          return;
        }
        if (m.length < 10) {
          toast("⚠️ Votre message est trop court");
          return;
        }
        const msg = encodeURIComponent(
          `Bonjour CultureCase 👋\nNom : ${n}\nTéléphone : ${document.getElementById("cf-p").value}\n\n${m}`,
        );
        window.open("https://wa.me/22375992482?text=" + msg, "_blank");
      }

      // ══ SYSTÈME D'AVIS ═══════════════════════════════════════════════════════════
      var _stars = 0;

      function pickStar(n) {
        _stars = n;
        document.querySelectorAll("#star-row span").forEach(function (s, i) {
          s.style.color = n > 0 && i < n ? "var(--gold)" : "var(--border2)";
        });
      }

      function submitAvis() {
        var nom = (document.getElementById("av-nom").value || "").trim();
        var loc = (document.getElementById("av-loc").value || "").trim();
        var txt = (document.getElementById("av-txt").value || "").trim();
        var err = document.getElementById("av-err");
        if (!_stars) {
          err.textContent = "Veuillez choisir une note.";
          err.style.display = "block";
          return;
        }
        if (!nom) {
          err.textContent = "Veuillez indiquer votre prénom.";
          err.style.display = "block";
          return;
        }
        if (txt.length < 15) {
          err.textContent = "Votre avis doit faire au moins 15 caractères.";
          err.style.display = "block";
          return;
        }
        err.style.display = "none";

        // Désactiver le bouton pendant l'envoi
        var btn = document.querySelector(
          '#av-err ~ button, .cf-btn[onclick="submitAvis()"]',
        );
        if (btn) {
          btn.disabled = true;
          btn.textContent = "Envoi…";
        }

        var payload = {
          nom: nom,
          loc: loc || "Bamako, Mali",
          txt: txt,
          stars: _stars,
          status: "pending", // en attente de modération dans le back-office
          createdAt:
            window.__firestoreAPI && window.__firestoreAPI.serverTimestamp
              ? window.__firestoreAPI.serverTimestamp()
              : new Date().toISOString(),
        };

        var db = window.__db;
        var api = window.__firestoreAPI;

        if (db && api && api.addDoc && api.collection) {
          api
            .addDoc(api.collection(db, "reviews"), payload)
            .then(function () {
              _resetAvisForm();
              toast(
                "Merci " +
                  nom.split(" ")[0] +
                  " ! Votre avis est en cours de vérification. ✨",
              );
              go("home");
            })
            .catch(function (e) {
              console.error("[CultureCase] submitAvis error:", e);
              if (btn) {
                btn.disabled = false;
                btn.textContent = "Publier mon avis →";
              }
              err.textContent = "Erreur d'envoi — vérifiez votre connexion.";
              err.style.display = "block";
            });
        } else {
          // Firestore pas encore prêt (rare) — on réessaie dans 2s
          setTimeout(submitAvis, 2000);
        }
      }

      function _resetAvisForm() {
        document.getElementById("av-nom").value = "";
        document.getElementById("av-loc").value = "";
        document.getElementById("av-txt").value = "";
        pickStar(0);
        var btn = document.querySelector('.cf-btn[onclick="submitAvis()"]');
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Publier mon avis →";
        }
      }
