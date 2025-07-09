import { Test } from '../types';

export const sampleTests: Test[] = [
  {
    id: 'jee-physics-mechanics-1',
    title: 'JEE Physics - Mechanics Fundamentals',
    subject: 'JEE',
    chapter: 'Mechanics',
    duration: 60,
    totalMarks: 100,
    negativeMarking: true,
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'jee-p-1',
        text: 'A particle moves in a straight line with constant acceleration. If it covers 40 m in the 4th second and 44 m in the 6th second, find its initial velocity.',
        options: [
          '20 m/s',
          '22 m/s',
          '24 m/s',
          '26 m/s'
        ],
        correctAnswer: 2,
        explanation: 'Using the equation for distance in nth second: Sn = u + (a/2)(2n-1). From given data, we can find u = 24 m/s.',
        subject: 'JEE',
        chapter: 'Mechanics'
      },
      {
        id: 'jee-p-2',
        text: 'A block of mass 2 kg is placed on a rough horizontal surface. The coefficient of friction is 0.4. What is the maximum force that can be applied horizontally without the block slipping?',
        options: [
          '6.8 N',
          '7.84 N',
          '8.2 N',
          '9.1 N'
        ],
        correctAnswer: 1,
        explanation: 'Maximum friction force = μmg = 0.4 × 2 × 9.8 = 7.84 N',
        subject: 'JEE',
        chapter: 'Mechanics'
      },
      {
        id: 'jee-p-3',
        text: 'Two masses m₁ = 3 kg and m₂ = 2 kg are connected by a string passing over a pulley. Find the acceleration of the system.',
        options: [
          '1.96 m/s²',
          '2.45 m/s²',
          '3.92 m/s²',
          '4.9 m/s²'
        ],
        correctAnswer: 0,
        explanation: 'For Atwood machine: a = (m₁ - m₂)g/(m₁ + m₂) = (3-2)×9.8/(3+2) = 1.96 m/s²',
        subject: 'JEE',
        chapter: 'Mechanics'
      },
      {
        id: 'jee-p-4',
        text: 'A projectile is launched at an angle of 45° with initial velocity 20 m/s. What is the maximum height reached?',
        options: [
          '8.2 m',
          '10.2 m',
          '12.4 m',
          '15.3 m'
        ],
        correctAnswer: 1,
        explanation: 'Maximum height H = (u²sin²θ)/(2g) = (20²×sin²45°)/(2×9.8) = 10.2 m',
        subject: 'JEE',
        chapter: 'Mechanics'
      },
      {
        id: 'jee-p-5',
        text: 'A wheel of radius 0.5 m rolls without slipping with a velocity of 10 m/s. What is its angular velocity?',
        options: [
          '15 rad/s',
          '20 rad/s',
          '25 rad/s',
          '30 rad/s'
        ],
        correctAnswer: 1,
        explanation: 'For rolling without slipping: v = ωr, so ω = v/r = 10/0.5 = 20 rad/s',
        subject: 'JEE',
        chapter: 'Mechanics'
      }
    ]
  },
  {
    id: 'neet-biology-genetics-1',
    title: 'NEET Biology - Genetics and Heredity',
    subject: 'NEET',
    chapter: 'Genetics',
    duration: 45,
    totalMarks: 100,
    negativeMarking: true,
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'neet-b-1',
        text: 'In a dihybrid cross between two heterozygous individuals (AaBb × AaBb), what is the phenotypic ratio in F2 generation?',
        options: [
          '3:1',
          '1:2:1',
          '9:3:3:1',
          '1:1:1:1'
        ],
        correctAnswer: 2,
        explanation: 'In a dihybrid cross between two heterozygotes, the phenotypic ratio is 9:3:3:1 according to Mendel\'s law of independent assortment.',
        subject: 'NEET',
        chapter: 'Genetics'
      },
      {
        id: 'neet-b-2',
        text: 'Which of the following is an example of codominance?',
        options: [
          'ABO blood group system',
          'Height in humans',
          'Skin color in humans',
          'Flower color in snapdragon'
        ],
        correctAnswer: 0,
        explanation: 'ABO blood group system shows codominance where both A and B alleles are expressed simultaneously in AB blood type.',
        subject: 'NEET',
        chapter: 'Genetics'
      },
      {
        id: 'neet-b-3',
        text: 'Turner syndrome is characterized by which chromosomal composition?',
        options: [
          'XXY',
          '45, X',
          '47, XXX',
          '47, XYY'
        ],
        correctAnswer: 1,
        explanation: 'Turner syndrome is characterized by monosomy X (45, X), resulting in female phenotype with various developmental abnormalities.',
        subject: 'NEET',
        chapter: 'Genetics'
      },
      {
        id: 'neet-b-4',
        text: 'The process of crossing over occurs during which phase of meiosis?',
        options: [
          'Prophase I',
          'Metaphase I',
          'Anaphase I',
          'Prophase II'
        ],
        correctAnswer: 0,
        explanation: 'Crossing over occurs during prophase I of meiosis, specifically during the pachytene stage when homologous chromosomes pair up.',
        subject: 'NEET',
        chapter: 'Genetics'
      },
      {
        id: 'neet-b-5',
        text: 'What is the probability of getting a male child with color blindness if the mother is a carrier and father has normal vision?',
        options: [
          '0%',
          '25%',
          '50%',
          '100%'
        ],
        correctAnswer: 1,
        explanation: 'Color blindness is X-linked recessive. If mother is carrier (XᶜX) and father is normal (XY), probability of color blind male child is 25%.',
        subject: 'NEET',
        chapter: 'Genetics'
      }
    ]
  },
  {
    id: 'upsc-history-ancient-1',
    title: 'UPSC History - Ancient Indian History',
    subject: 'UPSC',
    chapter: 'Ancient History',
    duration: 90,
    totalMarks: 100,
    negativeMarking: true,
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'upsc-h-1',
        text: 'The Indus Valley Civilization was discovered in which year?',
        options: [
          '1920',
          '1921',
          '1922',
          '1924'
        ],
        correctAnswer: 1,
        explanation: 'The Indus Valley Civilization was discovered in 1921 by Dayaram Sahni at Harappa and R.D. Banerji at Mohenjodaro.',
        subject: 'UPSC',
        chapter: 'Ancient History'
      },
      {
        id: 'upsc-h-2',
        text: 'Which Mauryan emperor is known for his policy of Dhamma?',
        options: [
          'Chandragupta Maurya',
          'Bindusara',
          'Ashoka',
          'Dasharatha'
        ],
        correctAnswer: 2,
        explanation: 'Emperor Ashoka is known for his policy of Dhamma, which emphasized moral and ethical conduct, non-violence, and religious tolerance.',
        subject: 'UPSC',
        chapter: 'Ancient History'
      },
      {
        id: 'upsc-h-3',
        text: 'The famous Iron Pillar is located in which place?',
        options: [
          'Varanasi',
          'Delhi',
          'Patna',
          'Ujjain'
        ],
        correctAnswer: 1,
        explanation: 'The famous Iron Pillar is located in Delhi, in the Qutub complex. It dates back to the 4th century CE and is known for its rust-resistant properties.',
        subject: 'UPSC',
        chapter: 'Ancient History'
      },
      {
        id: 'upsc-h-4',
        text: 'Which dynasty is associated with the construction of the Kailasa temple at Ellora?',
        options: [
          'Chalukya',
          'Rashtrakuta',
          'Pallava',
          'Chola'
        ],
        correctAnswer: 1,
        explanation: 'The Kailasa temple at Ellora was constructed during the Rashtrakuta dynasty, specifically under Krishna I in the 8th century CE.',
        subject: 'UPSC',
        chapter: 'Ancient History'
      },
      {
        id: 'upsc-h-5',
        text: 'The concept of "Arthashastra" is associated with which ancient scholar?',
        options: [
          'Panini',
          'Kautilya',
          'Bharata',
          'Vatsyayana'
        ],
        correctAnswer: 1,
        explanation: 'Arthashastra, the ancient treatise on statecraft and economics, is attributed to Kautilya (also known as Chanakya), advisor to Chandragupta Maurya.',
        subject: 'UPSC',
        chapter: 'Ancient History'
      }
    ]
  },
  {
    id: 'jee-chemistry-organic-1',
    title: 'JEE Chemistry - Organic Chemistry Basics',
    subject: 'JEE',
    chapter: 'Organic Chemistry',
    duration: 75,
    totalMarks: 100,
    negativeMarking: true,
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'jee-c-1',
        text: 'Which of the following compounds shows geometrical isomerism?',
        options: [
          'CH₃-CH₂-CH₃',
          'CH₃-CH=CH-CH₃',
          'CH₃-CH₂-CH₂-CH₃',
          'CH₃-CH(CH₃)-CH₃'
        ],
        correctAnswer: 1,
        explanation: 'CH₃-CH=CH-CH₃ (but-2-ene) shows geometrical isomerism due to restricted rotation around the C=C double bond.',
        subject: 'JEE',
        chapter: 'Organic Chemistry'
      },
      {
        id: 'jee-c-2',
        text: 'The IUPAC name of CH₃-CH(OH)-CH₂-CH₃ is:',
        options: [
          'Butan-1-ol',
          'Butan-2-ol',
          'Propan-2-ol',
          '2-Methylpropan-1-ol'
        ],
        correctAnswer: 1,
        explanation: 'The compound CH₃-CH(OH)-CH₂-CH₃ is butan-2-ol, with the OH group on the second carbon of a 4-carbon chain.',
        subject: 'JEE',
        chapter: 'Organic Chemistry'
      },
      {
        id: 'jee-c-3',
        text: 'Which reagent is used for the conversion of alkene to alkane?',
        options: [
          'H₂/Ni',
          'Br₂/CCl₄',
          'KMnO₄',
          'HBr'
        ],
        correctAnswer: 0,
        explanation: 'H₂/Ni (hydrogen gas with nickel catalyst) is used for hydrogenation, converting alkenes to alkanes.',
        subject: 'JEE',
        chapter: 'Organic Chemistry'
      },
      {
        id: 'jee-c-4',
        text: 'The hybridization of carbon in methane (CH₄) is:',
        options: [
          'sp',
          'sp²',
          'sp³',
          'sp³d'
        ],
        correctAnswer: 2,
        explanation: 'In methane (CH₄), carbon undergoes sp³ hybridization, forming four equivalent C-H bonds in tetrahedral geometry.',
        subject: 'JEE',
        chapter: 'Organic Chemistry'
      },
      {
        id: 'jee-c-5',
        text: 'Which of the following is the most stable carbocation?',
        options: [
          'Primary (1°)',
          'Secondary (2°)',
          'Tertiary (3°)',
          'All are equally stable'
        ],
        correctAnswer: 2,
        explanation: 'Tertiary (3°) carbocations are most stable due to hyperconjugation and inductive effects from three alkyl groups.',
        subject: 'JEE',
        chapter: 'Organic Chemistry'
      }
    ]
  },
  {
    id: 'neet-chemistry-coordination-1',
    title: 'NEET Chemistry - Coordination Compounds',
    subject: 'NEET',
    chapter: 'Coordination Chemistry',
    duration: 60,
    totalMarks: 100,
    negativeMarking: true,
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'neet-c-1',
        text: 'The coordination number of central metal ion in [Co(NH₃)₆]³⁺ is:',
        options: [
          '4',
          '5',
          '6',
          '8'
        ],
        correctAnswer: 2,
        explanation: 'In [Co(NH₃)₆]³⁺, cobalt is surrounded by 6 ammonia ligands, so the coordination number is 6.',
        subject: 'NEET',
        chapter: 'Coordination Chemistry'
      },
      {
        id: 'neet-c-2',
        text: 'Which of the following is a bidentate ligand?',
        options: [
          'NH₃',
          'H₂O',
          'en (ethylenediamine)',
          'Cl⁻'
        ],
        correctAnswer: 2,
        explanation: 'Ethylenediamine (en) is a bidentate ligand as it can donate two pairs of electrons through its two nitrogen atoms.',
        subject: 'NEET',
        chapter: 'Coordination Chemistry'
      },
      {
        id: 'neet-c-3',
        text: 'The oxidation state of chromium in K₂Cr₂O₇ is:',
        options: [
          '+3',
          '+4',
          '+5',
          '+6'
        ],
        correctAnswer: 3,
        explanation: 'In K₂Cr₂O₇, the oxidation state of chromium is +6. (2×1 + 2×x + 7×(-2) = 0, solving gives x = +6)',
        subject: 'NEET',
        chapter: 'Coordination Chemistry'
      },
      {
        id: 'neet-c-4',
        text: 'Which theory explains the bonding in coordination compounds?',
        options: [
          'Valence Bond Theory only',
          'Crystal Field Theory only',
          'Both VBT and CFT',
          'Molecular Orbital Theory only'
        ],
        correctAnswer: 2,
        explanation: 'Both Valence Bond Theory (VBT) and Crystal Field Theory (CFT) are used to explain bonding in coordination compounds.',
        subject: 'NEET',
        chapter: 'Coordination Chemistry'
      },
      {
        id: 'neet-c-5',
        text: 'The geometry of [Ni(CO)₄] is:',
        options: [
          'Square planar',
          'Tetrahedral',
          'Octahedral',
          'Linear'
        ],
        correctAnswer: 1,
        explanation: '[Ni(CO)₄] has tetrahedral geometry with sp³ hybridization of nickel.',
        subject: 'NEET',
        chapter: 'Coordination Chemistry'
      }
    ]
  },
  {
    id: 'upsc-geography-physical-1',
    title: 'UPSC Geography - Physical Geography',
    subject: 'UPSC',
    chapter: 'Physical Geography',
    duration: 120,
    totalMarks: 100,
    negativeMarking: true,
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'upsc-g-1',
        text: 'Which layer of the atmosphere contains the ozone layer?',
        options: [
          'Troposphere',
          'Stratosphere',
          'Mesosphere',
          'Thermosphere'
        ],
        correctAnswer: 1,
        explanation: 'The ozone layer is located in the stratosphere, approximately 15-35 km above Earth\'s surface.',
        subject: 'UPSC',
        chapter: 'Physical Geography'
      },
      {
        id: 'upsc-g-2',
        text: 'The Tropic of Cancer passes through which of the following Indian states?',
        options: [
          'Rajasthan, Gujarat, Madhya Pradesh',
          'Rajasthan, Gujarat, Maharashtra',
          'Gujarat, Madhya Pradesh, Chhattisgarh',
          'Rajasthan, Gujarat, Madhya Pradesh, Chhattisgarh'
        ],
        correctAnswer: 3,
        explanation: 'The Tropic of Cancer (23.5°N) passes through Rajasthan, Gujarat, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.',
        subject: 'UPSC',
        chapter: 'Physical Geography'
      },
      {
        id: 'upsc-g-3',
        text: 'Which type of rainfall is associated with the Western Ghats?',
        options: [
          'Convectional rainfall',
          'Orographic rainfall',
          'Cyclonic rainfall',
          'Frontal rainfall'
        ],
        correctAnswer: 1,
        explanation: 'The Western Ghats receive orographic rainfall when moisture-laden winds from the Arabian Sea are forced to rise over the mountains.',
        subject: 'UPSC',
        chapter: 'Physical Geography'
      },
      {
        id: 'upsc-g-4',
        text: 'The deepest point in the Indian Ocean is:',
        options: [
          'Java Trench',
          'Mariana Trench',
          'Puerto Rico Trench',
          'Diamantina Trench'
        ],
        correctAnswer: 0,
        explanation: 'The Java Trench (Sunda Trench) is the deepest point in the Indian Ocean, reaching depths of over 7,000 meters.',
        subject: 'UPSC',
        chapter: 'Physical Geography'
      },
      {
        id: 'upsc-g-5',
        text: 'Which soil type is most suitable for cotton cultivation?',
        options: [
          'Alluvial soil',
          'Red soil',
          'Black soil',
          'Laterite soil'
        ],
        correctAnswer: 2,
        explanation: 'Black soil (regur soil) is most suitable for cotton cultivation due to its high water retention capacity and rich mineral content.',
        subject: 'UPSC',
        chapter: 'Physical Geography'
      }
    ]
  }
];