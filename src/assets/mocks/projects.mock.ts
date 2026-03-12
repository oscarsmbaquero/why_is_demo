const stack = [
  {
    id: "1",
    title: "JS",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/js_yd6rc7.png",
  },
  {
    id: "2",
    title: "React",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/physics_tjmsgp.png",
  },
  {
    id: "3",
    title: "Angular",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670760419/samples/oit/angular_g0cur7.jpg",
  },
  {
    id: "4",
    title: "TypeScript",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670614816/samples/oit/Typescript_fi9qth.png",
  },
  {
    id: "5",
    title: "Sass",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670612530/samples/oit/sass_rhp9fj.png",
  },
  {
    id: "6",
    title: "Material Design",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670603091/samples/oit/material_unajuk.png",
  },
  {
    id: "7",
    title: "Bootstrap",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670602736/samples/oit/boostrap_fibkqd.jpg",
  },
  {
    id: "8",
    title: "CSS",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/css-3_k3beri.png",
  },
  {
    id: "9",
    title: "HTML",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
  },
  {
    id: "10",
    title: "Ionic",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674076126/samples/oit/ionic_k4twl3.png",
  },
  {
    id: "11",
    title: "Next",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670789801/samples/oit/next_jgjx7x.jpg",
  },
  {
    id: "12",
    title: "Symfony",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670776566/samples/oit/symfony_bhbmhy.png",
  },
  {
    id: "13",
    title: "PHP",
    type: "front",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/php_uha8m5.png",
  },
  {
    id: "14",
    title: "Nodejs",
    type: "back",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/nodejs_jcgbgz.png",
  },
  {
    id: "15",
    title: "SQL Server",
    type: "back",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674413410/samples/oit/sqlServer_obmwp2.jpg",
  },
  {
    id: "16",
    title: "MongoDB",
    type: "back",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670783265/samples/oit/MongoDB_ofbyn8.png",
  },
  {
    id: "17",
    title: "MySQL",
    type: "back",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670783210/samples/oit/mysql_v2qrgb.png",
  },
  {
    id: "18",
    title: "GitHub",
    type: "generic",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674412432/samples/oit/github_z2401q.png",
  },
  {
    id: "19",
    title: "Jira",
    type: "generic",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674412436/samples/oit/jira_bdrmww.png",
  },
];


const projects = [
  {
    title: "News",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674075242/samples/oit/news_ojhvod.png",
    description: "App de Noticias desarrollada en Ionic y Typescript",
    stack: [
      {
        id: "1",
        type: "front",
        title: "Ionic",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674076126/samples/oit/ionic_k4twl3.png",
      },
      {
        id: "2",
        type: "front",
        title: "Angular",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670760419/samples/oit/angular_g0cur7.jpg",
      },
      {
        id: "3",
        type: "front",
        title: "HTML",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
      },
      {
        id: "4",
        type: "front",
        title: "Sass",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670612530/samples/oit/sass_rhp9fj.png",
      },
    ],
    links: [
      {
        id: "1",
        type: "front",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/ionic-movies",
      },
    ],
    fecha: "01/2023",
    id: "1",
  },
  {
    title: "Movies",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674075242/samples/oit/movies_rzbkjn.png",
    description: "App Buscador de películas desarrollada en Ionic y Typescript",
    stack: [
      {
        id: "1",
        type: "front",
        title: "Ionic",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674076126/samples/oit/ionic_k4twl3.png",
      },
      {
        id: "2",
        type: "front",
        title: "Angular",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670760419/samples/oit/angular_g0cur7.jpg",
      },
      {
        id: "3",
        type: "front",
        title: "HTML",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
      },
      {
        id: "4",
        type: "front",
        title: "Sass",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670612530/samples/oit/sass_rhp9fj.png",
      },
    ],
    links: [
      {
        id: "1",
        type: "front",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/ionic-movies",
      },
    ],
    fecha: "01/2023",
    id: "2",
  },
  {
    title: "Roberto Carlos Calefacción",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674077457/samples/oit/robertocarlos_jea29y.png",
    description:
      "Aplicación Full Stack de gestión de avisos, material y clientes desarrollada en React, Nodejs y MongoDB ",
    stack: [
      {
        id: "1",
        type: "front",
        title: "React",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/physics_tjmsgp.png",
      },
      {
        id: "2",
        type: "front",
        title: "Boostrasp",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670602736/samples/oit/boostrap_fibkqd.jpg",
      },
      {
        id: "3",
        type: "front",
        title: "Material",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670603091/samples/oit/material_unajuk.png",
      },
      {
        id: "4",
        type: "back",
        title: "Nodejs",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/nodejs_jcgbgz.png",
      },
      {
        id: "5",
        type: "front",
        title: "HTML",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
      },
      {
        id: "6",
        type: "front",
        title: "Sass",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670612530/samples/oit/sass_rhp9fj.png",
      },
    ],
    links: [
      {
        id: "1",
        name: "Git",
        linkGit:
          "https://github.com/oscarsmbaquero/react-fontaneriacalefaccion",
      },
      {
        id: "2",
        name: "Vercel",
        linkVer: "https://react-fontaneriacalefaccion.vercel.app/",
      },
    ],
    fecha: "01/2023",
    id: "3",
  },
  {
    title: "OIT",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1674577942/samples/oit/oit_yxf4e6.png",
    description: "PortFolio personal realizado con React",
    stack: [
      {
        id: "1",
        type: "front",
        title: "React",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/c_scale,e_auto_saturation,w_150/v1670524121/samples/oit/physics_tjmsgp.png",
      },
      {
        id: "2",
        type: "front",
        title: "Bootrasp",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/c_scale,w_150/v1670602736/samples/oit/boostrap_fibkqd.jpg",
      },
      {
        id: "3",
        type: "front",
        title: "Material",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670603091/samples/oit/material_unajuk.png",
      },
      {
        id: "4",
        type: "front",
        title: "HTML",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
      },
      {
        id: "5",
        type: "front",
        title: "Sass",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670612530/samples/oit/sass_rhp9fj.png",
      },
    ],
    links: [
      {
        id: "1",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/oit",
      },
      {
        id: "2",
        name: "Vercel",
        linkVer: "https://oit-gules.vercel.app/",
      },
    ],
    fecha: "12/2022 ",
    id: "4",
  },
  {
    title: "Astron",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670597539/samples/oit/astron_hvbaqe.png",
    description:
      "Aplicación Full Stack de gestión de avisos y material desarrollada en React, Nodejs y MongoDB ",
    stack: [
      {
        id: "1",
        type: "front",
        title: "React",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/physics_tjmsgp.png",
      },
      {
        id: "2",
        type: "front",
        title: "Boostrasp",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670602736/samples/oit/boostrap_fibkqd.jpg",
      },
      {
        id: "3",
        type: "front",
        title: "Material Design",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670603091/samples/oit/material_unajuk.png",
      },
      {
        id: "4",
        type: "back",
        title: "Nodejs",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/nodejs_jcgbgz.png",
      },
      {
        id: "5",
        type: "front",
        title: "HTML",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
      },
      {
        id: "6",
        type: "front",
        title: "Sass",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670612530/samples/oit/sass_rhp9fj.png",
      },
    ],
    links: [
      {
        id: "1",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/react-astron",
      },
      {
        id: "2",
        name: "Vercel",
        linkVer: "https://react-astron.vercel.app/",
      },
    ],
    fecha: "12/2022",
    id: "5",
  },
  {
    title: "Favorit",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670597539/samples/oit/favorit_sng71f.png",
    description: "Web Gastro Bar Favorit",
    stack: [
      {
        id: "1",
        type: "front",
        title: "React",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/physics_tjmsgp.png",
      },
      {
        id: "2",
        type: "front",
        title: "Boostrasp",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670602736/samples/oit/boostrap_fibkqd.jpg",
      },
      {
        id: "3",
        type: "front",
        title: "Material",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670603091/samples/oit/material_unajuk.png",
      },
      {
        id: "4",
        type: "front",
        title: "HTML",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
      },
      {
        id: "5",
        type: "front",
        title: "CSS3",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/css-3_k3beri.png",
      },
    ],
    links: [
      {
        id: "1",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/favorit",
      },
      {
        id: "2",
        name: "Vercel",
        linkVer: "https://favorit.vercel.app/",
      },
    ],
    fecha: "11/2022",
    id: "6",
  },
  {
    title: "CVTae",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670597539/samples/oit/cvtae_yelzw3.png",
    description: "Aplicación Full Stack en equipo fin Bootcamp ",
    stack: [
      {
        id: "1",
        type: "front",
        title: "React",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/physics_tjmsgp.png",
      },
      {
        id: "2",
        type: "front",
        title: "Material",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670603091/samples/oit/material_unajuk.png",
      },
      {
        id: "3",
        type: "front",
        title: "HTML",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
      },
      {
        id: "4",
        type: "front",
        title: "CSS3",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/css-3_k3beri.png",
      },
    ],
    links: [
      {
        id: "1",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/react-final-project",
      },
      {
        id: "2",
        name: "Vercel",
        linkVer: "https://react-final-project-lilac.vercel.app/",
      },
    ],
    fecha: "07/2022",
    id: "7",
  },
  {
    title: "Spotify",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670597540/samples/oit/spoti_pzqbnh.png",
    description: "Aplicación Spotify Angular",
    stack: [
      {
        id: "1",
        type: "front",
        title: "TypeScript",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670614816/samples/oit/Typescript_fi9qth.png",
      },
      {
        id: "2",
        type: "front",
        title: "Javascript",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/js_yd6rc7.png",
      },
      {
        id: "3",
        type: "front",
        title: "Angular",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670614816/samples/oit/Typescript_fi9qth.png",
      },
      {
        id: "4",
        type: "front",
        title: "Sass",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670612530/samples/oit/sass_rhp9fj.png",
      },
    ],
    links: [
      {
        id: "1",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/angularSpotyApp",
      },
      {
        id: "2",
        name: "Vercel",
        linkVer: "https://spotyapp-gamma.vercel.app/#/home",
      },
    ],
    fecha: "10/2022",
    id: "8",
  },
  {
    title: "U2",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670760303/samples/oit/U2_y65g1y.png",
    description: "Api Discrografia U2, desarrollada en Angular",
    stack: [
      {
        id: "1",
        type: "front",
        title: "TypeScript",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670614816/samples/oit/Typescript_fi9qth.png",
      },
      {
        id: "2",
        type: "front",
        title: "Angular",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670760419/samples/oit/angular_g0cur7.jpg",
      },
      {
        id: "3",
        type: "front",
        title: "HTML",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
      },
      {
        id: "4",
        type: "front",
        title: "Sass",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670612530/samples/oit/sass_rhp9fj.png",
      },
    ],
    links: [
      {
        id: "1",
        type: "front",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/angular-Api-U2",
      },
    ],
    fecha: "04/2022",
    id: "9",
  },
  {
    title: "Extremoduro",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670776598/samples/oit/extremoduro_o9tqor.png",
    description: "Crud Discografia Extremoduro, desarrollada en PHP Symfony",
    stack: [
      {
        id: "1",
        type: "front",
        title: "PHP",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/php_uha8m5.png",
      },
      {
        id: "2",
        type: "front",
        title: "Symfony",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670776566/samples/oit/symfony_bhbmhy.png",
      },
    ],
    links: [
      {
        id: "1",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/symfony-crud",
      },
    ],
    fecha: "06/2022",
    id: "10",
  },
  {
    title: "Word Stats",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670777127/samples/oit/world-state_etqfe0.png",
    description: "Aplicación Nextjs",
    stack: [
      {
        id: "1",
        type: "front",
        title: "Next.JS",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670777151/samples/oit/next_xdaxbo.png",
      },
      {
        id: "2",
        type: "front",
        title: "JS",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/js_yd6rc7.png",
      },
      {
        id: "3",
        type: "front",
        title: "CSS3",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/css-3_k3beri.png",
      },
    ],
    links: [
      {
        id: "1",
        name: "Git",
        linkGit: "https://github.com/oscarsmbaquero/next-worldstate",
      },
    ],
    fecha: "08/2022",
    id: "11",
  },
  {
    title: "Caat Astron",
    image:
      "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1671050985/samples/oit/caatAstron_yjavb6.png",
    description:
      "Aplicación para la gestión de avisos, desarrollada en PHP, Ajax y MySql",
    stack: [
      {
        id: "1",
        type: "front",
        title: "JS",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/js_yd6rc7.png",
      },
      {
        id: "2",
        type: "front",
        title: "CSS3",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/css-3_k3beri.png",
      },
      {
        id: "3",
        type: "front",
        title: "HTML",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524120/samples/oit/html-5_czjmsh.png",
      },
      {
        id: "4",
        type: "front",
        title: "PHP",
        image:
          "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1670524121/samples/oit/php_uha8m5.png",
      },
    ],
    links: [
      {
        id: "1",
        name: "Vercel",
        linkGit: "http://caatastron.ddns.net/astron/",
      },
    ],
    fecha: "12/2021",
    id: "12",
  },
];

export { stack, projects };
