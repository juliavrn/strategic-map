import type { Theme } from "../types"

export const themes: Theme = {
  id: "mapa",

  name: "MAPA",

  description:
    "Interactive overview of the main strategic areas and indicators.",

  children: [
    {
      id: "environment",

      name: "Environment",

      description:
        "Topics related to the natural environment, sustainability and ecological transition.",

      image:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",

      objectives: [
        "Protect natural ecosystems",
        "Promote sustainable development",
        "Improve environmental resilience"
      ],

      links: [
        {
          title: "United Nations Environment Programme",
          url: "https://www.unep.org/"
        }
      ],

      children: [
        {
          id: "climate",

          name: "Climate",

          description:
            "Climate change, adaptation strategies and resilience planning for territories facing environmental challenges.",

          value: 18,

          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",

          objectives: [
            "Reduce greenhouse gas emissions",
            "Strengthen climate resilience",
            "Develop adaptation strategies"
          ],

          links: [
            {
              title: "UN Climate Change",
              url: "https://unfccc.int/"
            },
            {
              title: "IPCC",
              url: "https://www.ipcc.ch/"
            }
          ]
        },

        {
          id: "biodiversity",

          name: "Biodiversity",

          description:
            "Protection of ecosystems, endangered species and preservation of biological diversity.",

          value: 14,

          image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",

          objectives: [
            "Protect endangered species",
            "Restore damaged ecosystems",
            "Increase biodiversity conservation"
          ],

          links: [
            {
              title: "World Wildlife Fund",
              url: "https://www.worldwildlife.org/"
            }
          ]
        },

        {
          id: "natural-resources",

          name: "Natural Resources",

          description:
            "Sustainable management of forests, water resources, minerals and natural assets.",

          value: 10,

          image:
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",

          objectives: [
            "Promote sustainable resource management",
            "Protect freshwater resources",
            "Reduce resource depletion"
          ]
        },

        {
          id: "pollution",

          name: "Pollution",

          description:
            "Monitoring and reduction of air, water and soil pollution caused by human activities.",

          value: 8,

          image:
            "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51",

          objectives: [
            "Improve air quality",
            "Reduce industrial pollution",
            "Protect water ecosystems"
          ]
        }
      ]
    },
        {
      id: "health",

      name: "Health",

      description:
        "Topics related to healthcare systems, prevention, public health and well-being.",

      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",

      objectives: [
        "Improve access to healthcare",
        "Strengthen prevention programs",
        "Promote population well-being"
      ],

      links: [
        {
          title: "World Health Organization",
          url: "https://www.who.int/"
        }
      ],

      children: [
        {
          id: "public-health",

          name: "Public Health",

          description:
            "Population-level health policies, disease prevention and community health strategies.",

          value: 16,

          image:
            "https://images.unsplash.com/photo-1584515933487-779824d29309",

          objectives: [
            "Prevent major health risks",
            "Improve health monitoring",
            "Increase public awareness"
          ]
        },

        {
          id: "healthcare",

          name: "Healthcare",

          description:
            "Healthcare systems, hospitals, medical services and accessibility for populations.",

          value: 13,

          image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f",

          objectives: [
            "Improve healthcare accessibility",
            "Modernize healthcare services",
            "Reduce inequalities in healthcare"
          ]
        },

        {
          id: "prevention",

          name: "Prevention",

          description:
            "Actions designed to prevent diseases, promote healthy behaviors and reduce health risks.",

          value: 9,

          image:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773",

          objectives: [
            "Promote healthy lifestyles",
            "Increase preventive screenings",
            "Reduce avoidable diseases"
          ]
        }
      ]
    },

    {
      id: "education",

      name: "Education",

      description:
        "Topics related to learning, teaching systems, skills development and knowledge access.",

      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",

      objectives: [
        "Improve education accessibility",
        "Develop future skills",
        "Support lifelong learning"
      ],

      links: [
        {
          title: "UNESCO",
          url: "https://www.unesco.org/"
        }
      ],

      children: [
        {
          id: "primary-education",

          name: "Primary Education",

          description:
            "Early education systems focused on fundamental knowledge and learning development.",

          value: 12,

          image:
            "https://images.unsplash.com/photo-1588072432836-e10032774350",

          objectives: [
            "Improve basic education quality",
            "Support early learning",
            "Reduce educational inequalities"
          ]
        },

        {
          id: "higher-education",

          name: "Higher Education",

          description:
            "Universities, research institutions and advanced academic programs.",

          value: 15,

          image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",

          objectives: [
            "Strengthen research capacity",
            "Improve university access",
            "Increase international collaboration"
          ]
        },

        {
          id: "vocational-training",

          name: "Vocational Training",

          description:
            "Professional and technical education supporting workforce development.",

          value: 8,

          image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",

          objectives: [
            "Develop professional skills",
            "Support employment transition",
            "Match education with industry needs"
          ]
        },

        {
          id: "lifelong-learning",

          name: "Lifelong Learning",

          description:
            "Continuous learning opportunities throughout professional and personal life.",

          value: 6,

          image:
            "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",

          objectives: [
            "Encourage continuous education",
            "Support career development",
            "Adapt skills to future challenges"
          ]
        },

        {
          id: "digital-learning",

          name: "Digital Learning",

          description:
            "Technology-supported education, online learning platforms and digital resources.",

          value: 10,

          image:
            "https://images.unsplash.com/photo-1584697964196-5c2a8e6d4a8d",

          objectives: [
            "Increase digital education access",
            "Develop online learning tools",
            "Improve digital literacy"
          ]
        }
      ]
    },
        {
      id: "economy",

      name: "Economy",

      description:
        "Topics related to economic development, employment, innovation and financial systems.",

      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",

      objectives: [
        "Promote sustainable economic growth",
        "Support innovation and entrepreneurship",
        "Create inclusive employment opportunities"
      ],

      links: [
        {
          title: "OECD",
          url: "https://www.oecd.org/"
        }
      ],

      children: [
        {
          id: "employment",

          name: "Employment",

          description:
            "Labour markets, jobs creation, workforce development and employment policies.",

          value: 17,

          image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902",

          objectives: [
            "Increase employment opportunities",
            "Support workforce transitions",
            "Improve working conditions"
          ]
        },

        {
          id: "innovation",

          name: "Innovation",

          description:
            "Research, technological progress and emerging economic activities driving future growth.",

          value: 11,

          image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72",

          objectives: [
            "Support research and development",
            "Encourage entrepreneurship",
            "Accelerate innovation ecosystems"
          ]
        },

        {
          id: "trade",

          name: "Trade",

          description:
            "Domestic and international trade networks, markets and economic exchanges.",

          value: 9,

          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2",

          objectives: [
            "Strengthen economic partnerships",
            "Improve market accessibility",
            "Develop international cooperation"
          ]
        },

        {
          id: "finance",

          name: "Finance",

          description:
            "Financial systems, investment strategies and economic stability mechanisms.",

          value: 13,

          image:
            "https://images.unsplash.com/photo-1559526324-593bc073d938",

          objectives: [
            "Improve financial inclusion",
            "Support responsible investment",
            "Increase economic stability"
          ]
        }
      ]
    },

    {
      id: "technology",

      name: "Technology",

      description:
        "Topics related to digital transformation, emerging technologies and technological development.",

      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",

      objectives: [
        "Accelerate digital transformation",
        "Promote responsible technology",
        "Improve technological accessibility"
      ],

      links: [
        {
          title: "European Commission Digital Strategy",
          url: "https://digital-strategy.ec.europa.eu/"
        }
      ],

      children: [
        {
          id: "artificial-intelligence",

          name: "Artificial Intelligence",

          description:
            "AI technologies, machine learning, automation and governance of intelligent systems.",

          value: 20,

          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995",

          objectives: [
            "Develop ethical AI solutions",
            "Improve AI governance",
            "Support innovation through AI"
          ],

          links: [
            {
              title: "OpenAI",
              url: "https://openai.com/"
            }
          ]
        },

        {
          id: "cybersecurity",

          name: "Cybersecurity",

          description:
            "Protection of digital systems, networks and information against cyber threats.",

          value: 15,

          image:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3",

          objectives: [
            "Protect critical infrastructure",
            "Increase digital security awareness",
            "Strengthen cyber resilience"
          ]
        },

        {
          id: "data",

          name: "Data",

          description:
            "Data management, analytics, governance and strategic use of information.",

          value: 18,

          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71",

          objectives: [
            "Improve data accessibility",
            "Develop data-driven decisions",
            "Strengthen data governance"
          ]
        },

        {
          id: "digital-infrastructure",

          name: "Digital Infrastructure",

          description:
            "Networks, cloud platforms and technological infrastructure supporting digital services.",

          value: 12,

          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",

          objectives: [
            "Expand digital connectivity",
            "Improve technological reliability",
            "Support digital services"
          ]
        },

        {
          id: "emerging-technologies",

          name: "Emerging Technologies",

          description:
            "New technological fields including robotics, quantum computing and advanced systems.",

          value: 7,

          image:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",

          objectives: [
            "Explore future technologies",
            "Support technological research",
            "Prepare for future challenges"
          ]
        },

        {
          id: "automation",

          name: "Automation",

          description:
            "Automation of industrial processes, workflows and operational activities.",

          value: 10,

          image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475",

          objectives: [
            "Increase productivity",
            "Improve industrial efficiency",
            "Support workforce transformation"
          ]
        }
      ]
    },
        {
      id: "society",

      name: "Society",

      description:
        "Topics related to communities, social structures, culture and public life.",

      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",

      objectives: [
        "Promote social inclusion",
        "Strengthen communities",
        "Support cultural development"
      ],

      children: [
        {
          id: "social-inclusion",

          name: "Social Inclusion",

          description:
            "Equality, participation and opportunities for all members of society.",

          value: 14,

          image:
            "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8",

          objectives: [
            "Reduce social inequalities",
            "Improve accessibility",
            "Promote equal opportunities"
          ]
        },

        {
          id: "demographics",

          name: "Demographics",

          description:
            "Population trends, migration patterns and demographic changes.",

          value: 9,

          image:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",

          objectives: [
            "Understand population changes",
            "Plan future services",
            "Support demographic transitions"
          ]
        },

        {
          id: "culture",

          name: "Culture",

          description:
            "Cultural heritage, creative industries and community expression.",

          value: 11,

          image:
            "https://images.unsplash.com/photo-1564399579883-451a5d44ec08",

          objectives: [
            "Preserve cultural heritage",
            "Support creative activities",
            "Increase cultural accessibility"
          ]
        }
      ]
    },

    {
      id: "governance",

      name: "Governance",

      description:
        "Topics related to institutions, public policies, transparency and decision-making.",

      image:
        "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",

      objectives: [
        "Improve institutional effectiveness",
        "Increase transparency",
        "Strengthen citizen participation"
      ],

      links: [
        {
          title: "United Nations Governance",
          url: "https://www.un.org/"
        }
      ],

      children: [
        {
          id: "public-policy",

          name: "Public Policy",

          description:
            "Design and implementation of policies addressing societal challenges.",

          value: 16,

          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",

          objectives: [
            "Improve policy effectiveness",
            "Use evidence-based decisions",
            "Address public challenges"
          ]
        },

        {
          id: "regulation",

          name: "Regulation",

          description:
            "Rules, standards and regulatory frameworks supporting society and economy.",

          value: 12,

          image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",

          objectives: [
            "Improve regulatory clarity",
            "Ensure compliance",
            "Protect public interests"
          ]
        },

        {
          id: "transparency",

          name: "Transparency",

          description:
            "Accountability, access to information and open governance practices.",

          value: 8,

          image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72",

          objectives: [
            "Improve access to information",
            "Increase accountability",
            "Build public trust"
          ]
        },

        {
          id: "participation",

          name: "Participation",

          description:
            "Citizen engagement and collaborative decision-making processes.",

          value: 10,

          image:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",

          objectives: [
            "Encourage civic participation",
            "Create inclusive decisions",
            "Strengthen community dialogue"
          ]
        }
      ]
    },

    {
      id: "infrastructure",

      name: "Infrastructure",

      description:
        "Topics related to physical infrastructure, cities, mobility and connectivity.",

      image:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",

      objectives: [
        "Develop sustainable infrastructure",
        "Improve connectivity",
        "Support resilient cities"
      ],

      children: [
        {
          id: "transport",

          name: "Transport",

          description:
            "Mobility systems, public transportation and transportation infrastructure.",

          value: 15,

          image:
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",

          objectives: [
            "Improve mobility",
            "Reduce transportation emissions",
            "Develop sustainable transport"
          ]
        },

        {
          id: "energy",

          name: "Energy",

          description:
            "Energy production, distribution and transition toward sustainable systems.",

          value: 17,

          image:
            "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",

          objectives: [
            "Increase renewable energy",
            "Improve energy efficiency",
            "Support energy transition"
          ]
        },

        {
          id: "housing",

          name: "Housing",

          description:
            "Housing availability, affordability and sustainable urban development.",

          value: 11,

          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa",

          objectives: [
            "Improve housing accessibility",
            "Develop sustainable buildings",
            "Reduce housing inequalities"
          ]
        },

        {
          id: "urban-development",

          name: "Urban Development",

          description:
            "Cities, urban planning and sustainable development strategies.",

          value: 13,

          image:
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",

          objectives: [
            "Create sustainable cities",
            "Improve urban quality of life",
            "Optimize city planning"
          ]
        },

        {
          id: "connectivity",

          name: "Connectivity",

          description:
            "Digital and physical connections between people, regions and services.",

          value: 9,

          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",

          objectives: [
            "Expand digital access",
            "Connect remote areas",
            "Improve communication networks"
          ]
        }
      ]
    }
  ]
}