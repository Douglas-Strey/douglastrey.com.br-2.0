export type Language = "pt-BR" | "en";

export const siteContent = {
  "pt-BR": {
    nav: {
      about: "Sobre",
      experience: "Experiência",
      education: "Formação",
      projects: "Projetos",
      stack: "Stack",
      contact: "Contato",
    },
    accessibility: {
      title: "Acessibilidade de cor",
      currentLabel: "Atuação atual",
      publicProjectLabel: "Projeto público",
      privateProjectLabel: "Projeto interno",
      options: [
        { label: "Padrão", value: "default" },
        { label: "Deuteranopia", value: "deuteranopia" },
        { label: "Protanopia", value: "protanopia" },
        { label: "Tritanopia", value: "tritanopia" },
        { label: "Monocromacia", value: "monochromacy" },
      ],
    },
    hero: {
      badge: "Portfólio 2026",
      title: "Lidero times e desenvolvo soluções full-stack para produtos digitais, integrações e operações críticas.",
      description:
        "Atuo com liderança técnica e desenvolvimento full-stack, criando aplicações, integrações e estruturas de software voltadas para eficiência operacional, escalabilidade e qualidade de entrega.",
      primaryCta: "Vamos conversar",
      secondaryCta: "Ver LinkedIn",
      currentRoleLabel: "Atuação atual",
      currentRole: "Tech Lead",
      currentCompanyLabel: "Empresa",
      currentCompany: "HiSoft",
      experienceLabel: "Experiência",
      experienceValue: "Desde 2018",
      locationLabel: "Base",
      locationValue: "Joinville, SC · Brasil",
      strip: [
        "PHP",
        "Laravel",
        "React",
        "Vue",
        "Angular",
        "Swift",
        "Go",
        "TypeScript",
        "Node.js",
      ],
    },
    about: {
      eyebrow: "Posicionamento",
      title: "Tecnologia, liderança e entrega orientada a resultado.",
      description:
        "Atuo na criação e evolução de produtos digitais, unindo visão técnica, liderança de times, integrações complexas e foco constante em performance, organização e qualidade de entrega.",
      paragraphs: [
        "Minha trajetória reúne experiências em desenvolvimento full-stack, backend, liderança técnica e estruturação de soluções para diferentes contextos de negócio.",
        "Tenho atuação prática com automação, integrações, arquitetura de aplicações e acompanhamento de equipes multidisciplinares, sempre buscando soluções escaláveis e sustentáveis.",
      ],
      highlights: [
        "Liderança técnica e gestão de entregas",
        "Integrações e arquitetura de sistemas",
        "Produtos web com foco em escala",
        "Automação e evolução contínua",
      ],
    },
    experience: {
      eyebrow: "Trajetória",
      title: "Experiência construída em desenvolvimento, liderança e evolução de produtos.",
      description:
        "Uma trajetória com atuação crescente em desenvolvimento full-stack, backend, liderança técnica e organização de times e processos.",
      items: [
        {
          period: "Jan 2026 - Atual",
          current: true,
          title: "Tech Lead",
          company: "HiSoft",
          summary:
            "Liderança técnica com foco em organização de entregas, direcionamento de time e evolução de soluções escaláveis.",
        },
        {
          period: "Jun 2025 - Atual",
          current: true,
          title: "Desenvolvedor Backend PHP Sênior",
          company: "HiSoft",
          summary:
            "Atuação backend em PHP em contexto sênior, com foco em arquitetura, performance, manutenção e crescimento técnico dos produtos.",
        },
        {
          period: "Abr 2025 - Jun 2025",
          title: "Tech Lead",
          company: "O2 Projetos",
          summary:
            "Gestão de equipe, melhoria de entregas, apoio em contratações e reforço operacional em projetos de curto prazo.",
        },
        {
          period: "Nov 2024 - Abr 2025",
          title: "Desenvolvedor Full-stack Pleno",
          company: "O2 Projetos",
          summary:
            "Desenvolvimento e manutenção de aplicações SPA com PHP, Laravel, Angular, React e Next.js, incluindo engenharia, escopo e estruturação técnica.",
        },
        {
          period: "Out 2024 - Jun 2025",
          title: "Desenvolvedor Full-stack Pleno",
          company: "Koopere / Eloverde",
          summary:
            "Atuação full-stack em projetos de clientes, melhorando layouts, fluxos e processamento de dados com Angular, React, PHP e MySQL.",
        },
        {
          period: "Fev 2024 - Out 2024",
          title: "Sócio / Desenvolvedor Full-stack Pleno",
          company: "Bash Technology",
          summary:
            "Atuação com Go, Nuxt.js, Vue.js, Pinia, TypeScript, Node.js, JIRA e GitHub em produtos e operação técnica.",
        },
        {
          period: "Nov 2023 - Out 2024",
          title: "Desenvolvedor Full-stack Pleno",
          company: "Bash Technology",
          summary:
            "Atuação em produtos e rotinas técnicas com Go, Nuxt.js, Vue.js, Pinia, TypeScript, Node.js, JIRA e GitHub.",
        },
        {
          period: "Fev 2023 - Nov 2023",
          title: "Desenvolvedor Full-stack Pleno",
          company: "BOM JESUS/IELUSC",
          summary:
            "Mentoria de devs e analistas, integrações com Totvs RM, Secullum e ControlID, APIs, consultas Oracle, sustentação de sistemas e regras de negócio.",
        },
        {
          period: "Dez 2021 - Mar 2023",
          title: "Desenvolvedor Full Stack Jr",
          company: "BOM JESUS/IELUSC",
          summary:
            "Suporte e manutenção de aplicações, integrações com Totvs RM, APIs, consultas Oracle, criação de projetos em servidores e atendimento de chamados.",
        },
        {
          period: "Jul 2021 - Dez 2021",
          title: "Estagiário de Desenvolvimento",
          company: "BOM JESUS/IELUSC",
          summary:
            "Suporte a sites WordPress, desenvolvimento em PHP, manutenção de aplicações com MySQL, Composer, Bootstrap e JQuery, além de apoio ao backend.",
        },
        {
          period: "Mai 2021 - Jul 2021",
          title: "Gestor Administrativo",
          company: "CDL de Garuva",
          summary:
            "Gestão financeira e administrativa, apoio comercial, relacionamento institucional e suporte de TI e infraestrutura.",
        },
        {
          period: "Mar 2021 - Mai 2021",
          title: "Estagiário",
          company: "CDL de Garuva",
          summary:
            "Apoio administrativo, relatórios, marketing, comunicação e suporte geral à gestão da instituição.",
        },
        {
          period: "Jul 2019 - Abr 2020",
          title: "Auxiliar Administrativo",
          company: "C&K Construções",
          summary:
            "Controle de relatórios operacionais, apoio ao RH, gestão de combustível e suporte administrativo ao escritório.",
        },
        {
          period: "Ago 2018 - Mai 2019",
          title: "Iniciação Científica",
          company: "Instituto Federal Catarinense",
          summary:
            "Participação em projeto de pesquisa em aquicultura com foco em análise experimental e acompanhamento técnico.",
        },
      ],
    },
    education: {
      eyebrow: "Formação",
      title: "Base acadêmica e formação complementar voltadas para tecnologia e evolução contínua.",
      description:
        "Uma trajetória de formação que combina engenharia de software, inteligência artificial, automação e especialização prática em desenvolvimento.",
      academicTitle: "Formação acadêmica",
      certificationTitle: "Cursos e especializações",
      studies: [
        {
          period: "Mar 2026 - Set 2027",
          title: "Graduação Tecnológica em Inteligência Artificial e Automação Digital",
          institution: "UniFECAF",
        },
        {
          period: "Jan 2024 - Dez 2024",
          title: "Bacharelado em Engenharia de Software",
          institution: "Universidade da Região de Joinville",
        },
        {
          period: "2021 - Dez 2023",
          title: "Graduação em Engenharia de Software",
          institution: "Católica de Santa Catarina - Centro Universitário",
        },
        {
          period: "2019 - 2020",
          title: "Ensino Médio",
          institution: "Escola Estadual Carmem Seara Leite",
        },
      ],
      certifications: [
        "Ignite ReactJS",
        "Maratona 0 ao Código III",
        "PHP - POO",
        "Jornada de Empreendedorismo, Desenvolvimento e Inovação",
        "PHP - Básico",
      ],
    },
    projects: {
      eyebrow: "Projetos",
      title: "Projetos que refletem experiência prática em produto, sistema e desenvolvimento web.",
      description:
        "Uma seleção de trabalhos que passa por produto interno, aplicações públicas, integrações e experiências voltadas para entrega real.",
      viewProject: "Abrir projeto",
      viewCode: "Ver código",
      privateLabel: "Projeto interno",
      items: [
        {
          title: "Vaulta",
          description:
            "App iOS criado em Swift para funcionar como um double check rápido do estado do carro, combinando Bluetooth, histórico local, notificações e uma base de contexto para futuras automações com localização e movimento.",
          image: "/img/Vaulta.jpeg",
          gallery: [
            "/img/Vaulta.jpeg",
            "/img/Vaulta-2.jpeg",
            "/img/Vaulta-3.jpeg",
            "/img/Vaulta-4.jpeg",
          ],
          href: "https://www.linkedin.com/posts/douglas-strey_swift-iosdevelopment-softwareengineering-activity-7435571496774758401-y2nk?utm_source=share&utm_medium=member_desktop&rcm=ACoAADQSzG8B1bDZuTiaberxL_l1EibRjiaA0Pw",
          repo: "",
          status: "iOS · Swift · Side project",
        },
        {
          title: "Buscar Meu Filho",
          description:
            "Sistema para comunicação de chegada dos responsáveis, com previsão baseada em localização e dashboard operacional para a equipe escolar.",
          image: "/img/bmf-01.png",
          gallery: [
            "/img/bmf-01.png",
            "/img/bmf-02.png",
            "/img/bmf-03.png",
            "/img/bmf-04.png",
            "/img/bmf-05.png",
            "/img/bmf-06.png",
            "/img/bmf-07.png",
            "/img/bmf-08.png",
          ],
          href: "",
          repo: "",
          status: "Interno · Google Maps API",
        },
        {
          title: "Finances Website",
          description:
            "Aplicação responsiva para controle financeiro com armazenamento local, animações e acompanhamento de despesas em tempo real.",
          image: "/img/portfolio1.png",
          href: "https://finances-controller.vercel.app/",
          repo: "https://github.com/Douglas-Strey/finance-control",
          status: "Frontend · Produto pessoal",
        },
        {
          title: "Q&A Website",
          description:
            "Aplicação criada durante o NLW para coleta e organização de perguntas em contextos de aula, lives e comunidades.",
          image: "/img/portfolio2.png",
          href: "https://letmeask-316da.web.app/",
          repo: "https://github.com/Douglas-Strey/NLW-Together",
          status: "Realtime app · Comunidade",
        },
        {
          title: "Shop Website",
          description:
            "Projeto acadêmico de e-commerce para apresentação de produtos escolares com foco em navegação e visual.",
          image: "/img/portfolio3.png",
          href: "https://edi-store.vercel.app/",
          repo: "https://github.com/Douglas-Strey/EdiStore",
          status: "Projeto acadêmico",
        },
        {
          title: "DougHour",
          description:
            "Experimento em JavaScript com foco em componentes de tempo, interface e atualização dinâmica de estado.",
          image: "/img/portfolio4.png",
          href: "https://doughour.vercel.app/",
          repo: "https://github.com/Douglas-Strey/DougHour",
          status: "JavaScript playground",
        },
        {
          title: "Netflix Clone",
          description:
            "Clone feito em React para praticar integração com API, organização de interface e consumo de dados.",
          image: "/img/portfolio6.png",
          href: "https://netflix-clone-douglas.vercel.app/",
          repo: "https://github.com/Douglas-Strey/Netflix-Clone",
          status: "React · API integration",
        },
      ],
    },
    stack: {
      eyebrow: "Competências",
      title: "Tecnologias e competências aplicadas no dia a dia.",
      description:
        "Uma base técnica construída com foco em desenvolvimento full-stack, backend, frontend, bancos de dados, integrações e liderança.",
      groups: [
        {
          title: "Frontend",
          items: ["React", "Vue 3", "Angular", "Next.js", "Nuxt 3", "TypeScript", "HTML", "CSS", "Bootstrap", "JQuery"],
        },
        {
          title: "Backend",
          items: ["PHP", "Laravel", "CodeIgniter", "Laminas", "Node.js", "Go", "APIs", "Integrações", "Composer"],
        },
        {
          title: "Mobile, dados e operação",
          items: ["Swift", "iOS", "CoreBluetooth", "MySQL", "Oracle", "CockroachDB", "WordPress", "GitHub", "JIRA", "Liderança técnica", "Automação"],
        },
      ],
    },
    contact: {
      eyebrow: "Contato",
      title: "Aberto a novas oportunidades, projetos e conexões profissionais.",
      description:
        "Se fizer sentido para o seu time ou projeto, vamos conversar sobre tecnologia, produto, liderança técnica e novas construções digitais.",
      cardTitle: "Fale comigo",
      cardDescription:
        "Se quiser discutir produto, desenvolvimento ou colaboração, pode usar o formulário ou ir direto pelos links.",
      call: "Telefone",
      email: "E-mail",
      location: "Localização",
      form: {
        name: "Nome",
        email: "E-mail",
        project: "Projeto",
        message: "Mensagem",
        submit: "Enviar mensagem",
      },
    },
    footer: "Desenvolvedor full-stack com foco em produtos web modernos.",
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      projects: "Projects",
      stack: "Stack",
      contact: "Contact",
    },
    accessibility: {
      title: "Color accessibility",
      currentLabel: "Current role",
      publicProjectLabel: "Public project",
      privateProjectLabel: "Internal project",
      options: [
        { label: "Default", value: "default" },
        { label: "Deuteranopia", value: "deuteranopia" },
        { label: "Protanopia", value: "protanopia" },
        { label: "Tritanopia", value: "tritanopia" },
        { label: "Monochromacy", value: "monochromacy" },
      ],
    },
    hero: {
      badge: "Portfolio 2026",
      title: "I lead teams and build full-stack solutions for digital products, integrations, and critical operations.",
      description:
        "I work across technical leadership and full-stack development, building applications, integrations, and software structures focused on operational efficiency, scalability, and delivery quality.",
      primaryCta: "Let's talk",
      secondaryCta: "View LinkedIn",
      currentRoleLabel: "Current role",
      currentRole: "Tech Lead",
      currentCompanyLabel: "Company",
      currentCompany: "HiSoft",
      experienceLabel: "Experience",
      experienceValue: "Since 2018",
      locationLabel: "Base",
      locationValue: "Joinville, SC · Brazil",
      strip: ["PHP", "Laravel", "React", "Vue", "Angular", "Swift", "Go", "TypeScript", "Node.js"],
    },
    about: {
      eyebrow: "Positioning",
      title: "Technology, leadership, and delivery driven by outcomes.",
      description:
        "I work on building and evolving digital products by combining technical vision, team leadership, complex integrations, and a strong focus on performance, organization, and delivery quality.",
      paragraphs: [
        "My path brings together full-stack development, backend engineering, technical leadership, and solution design across different business contexts.",
        "I work hands-on with automation, integrations, application architecture, and multidisciplinary teams, always aiming for scalable and sustainable solutions.",
      ],
      highlights: [
        "Technical leadership and delivery management",
        "Systems integration and architecture",
        "Web products built for scale",
        "Automation and continuous improvement",
      ],
    },
    experience: {
      eyebrow: "Journey",
      title: "Experience shaped by product delivery, engineering, and technical leadership.",
      description:
        "A professional path built through full-stack development, backend work, technical leadership, and team and process organization.",
      items: [
        {
          period: "Jan 2026 - Present",
          current: true,
          title: "Tech Lead",
          company: "HiSoft",
          summary:
            "Technical leadership focused on delivery organization, team direction, and the evolution of scalable solutions.",
        },
        {
          period: "Jun 2025 - Present",
          current: true,
          title: "Senior PHP Backend Developer",
          company: "HiSoft",
          summary:
            "Senior backend work in PHP with focus on architecture, performance, maintenance, and product growth.",
        },
        {
          period: "Apr 2025 - Jun 2025",
          title: "Tech Lead",
          company: "O2 Projetos",
          summary:
            "Team management, delivery improvement, hiring support, and hands-on execution in short-cycle projects.",
        },
        {
          period: "Nov 2024 - Apr 2025",
          title: "Mid-level Full-stack Developer",
          company: "O2 Projetos",
          summary:
            "Built and maintained SPA applications with PHP, Laravel, Angular, React, and Next.js, including engineering documents and technical structuring.",
        },
        {
          period: "Oct 2024 - Jun 2025",
          title: "Mid-level Full-stack Developer",
          company: "Koopere / Eloverde",
          summary:
            "Full-stack work for client projects, improving layouts, data processing flows, and application behavior with Angular, React, PHP, and MySQL.",
        },
        {
          period: "Feb 2024 - Oct 2024",
          title: "Partner / Mid-level Full-stack Developer",
          company: "Bash Technology",
          summary:
            "Worked with Go, Nuxt.js, Vue.js, Pinia, TypeScript, Node.js, JIRA, and GitHub across products and technical operations.",
        },
        {
          period: "Nov 2023 - Oct 2024",
          title: "Mid-level Full-stack Developer",
          company: "Bash Technology",
          summary:
            "Worked across products and technical routines using Go, Nuxt.js, Vue.js, Pinia, TypeScript, Node.js, JIRA, and GitHub.",
        },
        {
          period: "Feb 2023 - Nov 2023",
          title: "Mid-level Full-stack Developer",
          company: "BOM JESUS/IELUSC",
          summary:
            "Mentored developers and analysts, delivered Totvs RM integrations, APIs, Oracle queries, legacy system integrations, and internal business rules.",
        },
        {
          period: "Dec 2021 - Mar 2023",
          title: "Junior Full Stack Developer",
          company: "BOM JESUS/IELUSC",
          summary:
            "Handled application maintenance, Totvs RM integrations, APIs, Oracle queries, server project setup, and user support routines.",
        },
        {
          period: "Jul 2021 - Dec 2021",
          title: "Development Intern",
          company: "BOM JESUS/IELUSC",
          summary:
            "Supported WordPress websites, PHP development, MySQL-based applications, and backend routines using Composer, Bootstrap, and JQuery.",
        },
        {
          period: "May 2021 - Jul 2021",
          title: "Administrative Manager",
          company: "CDL de Garuva",
          summary:
            "Led administrative and financial routines, commercial support, institutional relationships, and IT infrastructure assistance.",
        },
        {
          period: "Mar 2021 - May 2021",
          title: "Intern",
          company: "CDL de Garuva",
          summary:
            "Supported reporting, marketing, communication, and daily administrative work for the institution.",
        },
        {
          period: "Jul 2019 - Apr 2020",
          title: "Administrative Assistant",
          company: "C&K Construções",
          summary:
            "Managed operational reports, supported HR routines, fuel control, and office administration tasks.",
        },
        {
          period: "Aug 2018 - May 2019",
          title: "Scientific Research Intern",
          company: "Instituto Federal Catarinense",
          summary:
            "Worked on an aquaculture research project focused on experimental analysis and technical follow-up.",
        },
      ],
    },
    education: {
      eyebrow: "Education",
      title: "Academic background and complementary training focused on technology and continuous growth.",
      description:
        "An educational path that combines software engineering, artificial intelligence, automation, and hands-on specialization in development.",
      academicTitle: "Academic background",
      certificationTitle: "Courses and specializations",
      studies: [
        {
          period: "Mar 2026 - Sep 2027",
          title: "Technology Degree in Artificial Intelligence and Digital Automation",
          institution: "UniFECAF",
        },
        {
          period: "Jan 2024 - Dec 2024",
          title: "Bachelor's Degree in Software Engineering",
          institution: "Universidade da Região de Joinville",
        },
        {
          period: "2021 - Dec 2023",
          title: "Software Engineering Degree",
          institution: "Católica de Santa Catarina - Centro Universitário",
        },
        {
          period: "2019 - 2020",
          title: "High School",
          institution: "Escola Estadual Carmem Seara Leite",
        },
      ],
      certifications: [
        "Ignite ReactJS",
        "Maratona 0 ao Código III",
        "PHP - OOP",
        "Entrepreneurship, Development and Innovation Journey",
        "PHP - Basics",
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Projects that reflect practical experience across product, systems, and web development.",
      description:
        "A selection of work spanning internal products, public applications, integrations, and hands-on delivery.",
      viewProject: "Open project",
      viewCode: "View code",
      privateLabel: "Internal product",
      items: [
        {
          title: "Vaulta",
          description:
            "An iOS app built in Swift to act as a quick double check for car lock status, combining Bluetooth, local history, notifications, and a product foundation for future location and motion-based automations.",
          image: "/img/Vaulta.jpeg",
          gallery: [
            "/img/Vaulta.jpeg",
            "/img/Vaulta-2.jpeg",
            "/img/Vaulta-3.jpeg",
            "/img/Vaulta-4.jpeg",
          ],
          href: "https://www.linkedin.com/posts/douglas-strey_swift-iosdevelopment-softwareengineering-activity-7435571496774758401-y2nk?utm_source=share&utm_medium=member_desktop&rcm=ACoAADQSzG8B1bDZuTiaberxL_l1EibRjiaA0Pw",
          repo: "",
          status: "iOS · Swift · Side project",
        },
        {
          title: "Buscar Meu Filho",
          description:
            "A system for school pickup communication with arrival prediction based on live location and an operations dashboard for the staff.",
          image: "/img/bmf-01.png",
          gallery: [
            "/img/bmf-01.png",
            "/img/bmf-02.png",
            "/img/bmf-03.png",
            "/img/bmf-04.png",
            "/img/bmf-05.png",
            "/img/bmf-06.png",
            "/img/bmf-07.png",
            "/img/bmf-08.png",
          ],
          href: "",
          repo: "",
          status: "Internal · Google Maps API",
        },
        {
          title: "Finances Website",
          description:
            "Responsive finance app with local storage, animated interactions, and real-time expense tracking.",
          image: "/img/portfolio1.png",
          href: "https://finances-controller.vercel.app/",
          repo: "https://github.com/Douglas-Strey/finance-control",
          status: "Frontend · Personal product",
        },
        {
          title: "Q&A Website",
          description:
            "Application built during NLW to collect and organize questions for classes, streams, and communities.",
          image: "/img/portfolio2.png",
          href: "https://letmeask-316da.web.app/",
          repo: "https://github.com/Douglas-Strey/NLW-Together",
          status: "Realtime app · Community",
        },
        {
          title: "Shop Website",
          description:
            "Academic e-commerce concept focused on product presentation, browsing, and storefront structure.",
          image: "/img/portfolio3.png",
          href: "https://edi-store.vercel.app/",
          repo: "https://github.com/Douglas-Strey/EdiStore",
          status: "Academic project",
        },
        {
          title: "DougHour",
          description:
            "A JavaScript experiment focused on time-based UI behavior and dynamic state updates.",
          image: "/img/portfolio4.png",
          href: "https://doughour.vercel.app/",
          repo: "https://github.com/Douglas-Strey/DougHour",
          status: "JavaScript playground",
        },
        {
          title: "Netflix Clone",
          description:
            "React-based clone used to practice API consumption, interface structure, and data-driven screens.",
          image: "/img/portfolio6.png",
          href: "https://netflix-clone-douglas.vercel.app/",
          repo: "https://github.com/Douglas-Strey/Netflix-Clone",
          status: "React · API integration",
        },
      ],
    },
    stack: {
      eyebrow: "Capabilities",
      title: "Technologies and capabilities applied in real delivery contexts.",
      description:
        "A technical foundation built around full-stack development, backend systems, frontend engineering, databases, integrations, and leadership.",
      groups: [
        {
          title: "Frontend",
          items: ["React", "Vue 3", "Angular", "Next.js", "Nuxt 3", "TypeScript", "HTML", "CSS", "Bootstrap", "JQuery"],
        },
        {
          title: "Backend",
          items: ["PHP", "Laravel", "CodeIgniter", "Laminas", "Node.js", "Go", "APIs", "Integrations", "Composer"],
        },
        {
          title: "Mobile, data, and operations",
          items: ["Swift", "iOS", "CoreBluetooth", "MySQL", "Oracle", "CockroachDB", "WordPress", "GitHub", "JIRA", "Technical leadership", "Automation"],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Open to new opportunities, projects, and professional connections.",
      description:
        "If it makes sense for your team or product, let's talk about technology, product development, technical leadership, and new digital initiatives.",
      cardTitle: "Get in touch",
      cardDescription:
        "If you want to discuss product, software delivery, or collaboration, use the form or reach out directly.",
      call: "Phone",
      email: "Email",
      location: "Location",
      form: {
        name: "Name",
        email: "Email",
        project: "Project",
        message: "Message",
        submit: "Send message",
      },
    },
    footer: "Full-stack developer focused on modern web products.",
  },
} as const;
