import type { Theme } from "../types"

export const themes: Theme = {
  name: "MAPA",
  description: "Interactive overview of the main areas of the dataset.",
  children: [
    {
      name: "Environment",
      description: "Topics related to the natural environment and sustainability.",
      children: [
        {
          name: "Climate",
          description: "Climate change, adaptation and resilience.",
          value: 18,
        },
        {
          name: "Biodiversity",
          description: "Protection and preservation of ecosystems and species.",
          value: 14,
        },
        {
          name: "Natural Resources",
          description: "Management and sustainable use of natural resources.",
          value: 10,
        },
        {
          name: "Pollution",
          description: "Air, water and soil pollution.",
          value: 8,
        },
      ],
    },

    {
      name: "Health",
      description: "Topics related to health, prevention and well-being.",
      children: [
        {
          name: "Public Health",
          description: "Health policies and population-level prevention.",
          value: 16,
        },
        {
          name: "Healthcare",
          description: "Healthcare systems, services and accessibility.",
          value: 13,
        },
        {
          name: "Prevention",
          description: "Actions designed to prevent diseases and health risks.",
          value: 9,
        },
      ],
    },

    {
      name: "Education",
      description: "Topics related to learning, teaching and educational systems.",
      children: [
        {
          name: "Primary Education",
          description: "Early and primary education systems.",
          value: 12,
        },
        {
          name: "Higher Education",
          description: "Universities and advanced academic studies.",
          value: 15,
        },
        {
          name: "Vocational Training",
          description: "Professional and technical education.",
          value: 8,
        },
        {
          name: "Lifelong Learning",
          description: "Continuous learning throughout professional and personal life.",
          value: 6,
        },
        {
          name: "Digital Learning",
          description: "Technology-supported education and online learning.",
          value: 10,
        },
      ],
    },

    {
      name: "Economy",
      description: "Topics related to economic activity and development.",
      children: [
        {
          name: "Employment",
          description: "Jobs, labour markets and employment policies.",
          value: 17,
        },
        {
          name: "Innovation",
          description: "Innovation, research and emerging economic activities.",
          value: 11,
        },
        {
          name: "Trade",
          description: "Domestic and international trade.",
          value: 9,
        },
        {
          name: "Finance",
          description: "Financial systems, investment and economic stability.",
          value: 13,
        },
      ],
    },

    {
      name: "Technology",
      description: "Topics related to digital technologies and technological development.",
      children: [
        {
          name: "Artificial Intelligence",
          description: "AI technologies, applications and governance.",
          value: 20,
        },
        {
          name: "Cybersecurity",
          description: "Protection of systems, networks and digital information.",
          value: 15,
        },
        {
          name: "Data",
          description: "Data management, analysis and governance.",
          value: 18,
        },
        {
          name: "Digital Infrastructure",
          description: "Networks, platforms and technological infrastructure.",
          value: 12,
        },
        {
          name: "Emerging Technologies",
          description: "New and developing technological fields.",
          value: 7,
        },
        {
          name: "Automation",
          description: "Automation of processes and industrial activities.",
          value: 10,
        },
      ],
    },

    {
      name: "Society",
      description: "Topics related to communities, social structures and public life.",
      children: [
        {
          name: "Social Inclusion",
          description: "Inclusion, equality and participation in society.",
          value: 14,
        },
        {
          name: "Demographics",
          description: "Population trends and demographic changes.",
          value: 9,
        },
        {
          name: "Culture",
          description: "Cultural practices, heritage and creative expression.",
          value: 11,
        },
      ],
    },

    {
      name: "Governance",
      description: "Topics related to institutions, policies and decision-making.",
      children: [
        {
          name: "Public Policy",
          description: "Development and implementation of public policies.",
          value: 16,
        },
        {
          name: "Regulation",
          description: "Rules, standards and regulatory frameworks.",
          value: 12,
        },
        {
          name: "Transparency",
          description: "Transparency, accountability and access to information.",
          value: 8,
        },
        {
          name: "Participation",
          description: "Citizen participation and collaborative decision-making.",
          value: 10,
        },
      ],
    },

    {
      name: "Infrastructure",
      description: "Topics related to physical and digital infrastructure.",
      children: [
        {
          name: "Transport",
          description: "Mobility, transportation systems and infrastructure.",
          value: 15,
        },
        {
          name: "Energy",
          description: "Energy production, distribution and transition.",
          value: 17,
        },
        {
          name: "Housing",
          description: "Housing availability, affordability and development.",
          value: 11,
        },
        {
          name: "Urban Development",
          description: "Cities, urban planning and sustainable development.",
          value: 13,
        },
        {
          name: "Connectivity",
          description: "Digital and physical connectivity between regions.",
          value: 9,
        },
      ],
    },
  ],
}