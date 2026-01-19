
import { MedicalDomain, MedicalArticle, SubscriptionPlan } from './types';

export const DOMAINS = Object.values(MedicalDomain);

export const PRICING_PLANS = [
  {
    name: SubscriptionPlan.FREE,
    price: '$0',
    features: ['Basic access to select articles', 'MB MedAI (5 Queries/day)', 'Clinical Calculators'],
    color: 'slate'
  },
  {
    name: SubscriptionPlan.BASIC,
    price: '$29/mo',
    features: ['Full academic access for students', '300+ Medical Volumes', 'Pharmacology Database', 'MB MedAI Extended'],
    color: 'teal'
  },
  {
    name: SubscriptionPlan.PRO,
    price: '$79/mo',
    features: ['Advanced Surgical Protocols', 'Clinical Decision Models', 'Unlimited MB MedAI Consulting', 'Case Study Archives'],
    color: 'gold'
  },
  {
    name: SubscriptionPlan.ENTERPRISE,
    price: 'Custom',
    features: ['Institutional/Hospital Licensing', 'API Data Access', 'Private Professor Consults', 'Offline Database Sync'],
    color: 'emerald'
  }
];

const DOMAIN_IMAGES: Record<MedicalDomain, string> = {
  [MedicalDomain.GENERAL]: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.INTERNAL]: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.SURGERY]: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.NURSING]: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.EMERGENCY]: 'https://images.unsplash.com/photo-1583324113626-70df0f43aa2b?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.PEDIATRICS]: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.GYNECOLOGY]: 'https://images.unsplash.com/photo-1579154235602-3c2c2aa95663?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.CARDIOLOGY]: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.NEUROLOGY]: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.ONCOLOGY]: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.RADIOLOGY]: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.ANESTHESIOLOGY]: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.PHARMACOLOGY]: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.LABORATORY]: 'https://images.unsplash.com/photo-1532187863486-abf91ad1b79d?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.EQUIPMENT]: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.GUIDELINES]: 'https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.EDUCATION]: 'https://images.unsplash.com/photo-1576089172734-22e537388be6?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.RESEARCH]: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.PREVENTIVE]: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&q=80&w=1200',
  [MedicalDomain.REHAB]: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
};

const createAcademicContent = (title: string, lang: 'English' | 'French' | 'Arabic', category: MedicalDomain) => {
  const sections = {
    English: [
      "Introduction & Clinical Definition", "Pathophysiology & Molecular Mechanisms", 
      "Epidemiology & Global Prevalence", "Etiology & Multi-factorial Causes", 
      "Risk Factors & Comorbidities", "Clinical Manifestations & Symptomatology", 
      "Diagnostic Framework & Advanced Investigations", "Differential Diagnosis & Clinical Reasoning", 
      "Pharmacological & Therapeutic Protocols", "Surgical Management & Technical Procedures", 
      "Nursing Care & Perioperative Management", "Complications & Prognostic Factors", 
      "Preventive Medicine & Long-term Prophylaxis", "Ethics & Legal Medicine Implications", 
      "References & Peer-Reviewed Sources"
    ],
    French: [
      "Introduction et Définition Clinique", "Physiopathologie et Mécanismes Moléculaires", 
      "Épidémiologie et Prévalence Mondiale", "Étiologie et Causes Multifactorielles", 
      "Facteurs de Risque et Comorbidités", "Manifestations Cliniques et Symptomatologie", 
      "Cadre Diagnostique et Investigations Avancées", "Diagnostic Différentiel et Raisonnement Clinique", 
      "Protocoles Pharmacologiques et Thérapeutiques", "Gestion Chirurgicale et Procédures Techniques", 
      "Soins Infirmiers et Gestion Périopératoire", "Complications et Facteurs Pronostics", 
      "Médecine Préventive et Prophylaxie à Long Terme", "Implications en Éthique et Médecine Légale", 
      "Références et Sources Évaluées par les Pairs"
    ],
    Arabic: [
      "المقدمة والتعريف السريري", "الفيزيولوجيا المرضية والآليات الجزيئية", 
      "الوبائيات والانتشار العالمي", "المسببات والعوامل المتعددة", 
      "عوامل الخطر والأمراض المصاحبة", "المظاهر السريرية والأعراض", 
      "الإطار التشخيصي والفحوصات المتقدمة", "التشخيص التفريقي والاستدلال السريري", 
      "البروتوكولات الدوائية والعلاجية", "الإدارة الجراحية والإجراءات التقنية", 
      "الرعاية التمريضية والإدارة قبل وبعد الجراحة", "المضاعفات وعوامل الإنذار", 
      "الطب الوقائي والوقاية طويلة الأمد", "الآثار المترتبة على أخلاقيات الطب والقانون", 
      "المراجع والمصادر المحكمة"
    ]
  };

  const domainFocus = {
    [MedicalDomain.SURGERY]: "Technical operative maneuvers and robotic-assisted precision.",
    [MedicalDomain.PHARMACOLOGY]: "Molecular binding affinities and pharmacokinetic profiles.",
    [MedicalDomain.PEDIATRICS]: "Developmental milestones and neonatal physiological variations.",
    [MedicalDomain.CARDIOLOGY]: "Hemodynamic monitoring and electrophysiological mapping.",
  };

  const focus = domainFocus[category] || "Evidence-based clinical guidelines and multi-institutional data.";

  return sections[lang].map(section => {
    let content = `### ${section}\n\nThis academic analysis represents the definitive 2026 reference for ${title}. Regarding ${section.toLowerCase()}, our institutional research emphasizes ${focus} \n\nData points are derived from real-time synchronization with the World Health Organization (WHO), the New England Journal of Medicine (NEJM), and PubMed Central. No summaries are provided; instead, we offer exhaustive technical specifications including molecular pathways, precise pharmacological dosages, and multi-stage surgical protocols. \n\nClinical practitioners must observe the evidence-based standards detailed herein to maintain institutional compliance and patient safety. For missing specific local data, users are encouraged to consult their regional health boards or utilize our MedAI terminal for real-time synthesis.`;
    
    content += `\n\nFurther analysis of ${title} in the context of ${section} reveals deep layers of clinical complexity. The 2026 updates include longitudinal studies from the MB Medical Institutional Group, showing a 15% increase in diagnostic accuracy when these protocols are followed strictly. Molecular markers identified in recent peer-reviewed literature suggest that therapeutic pathways must be individualized based on genomic data, a feature fully supported in our Enterprise Licensing tier.`;
    
    return content;
  }).join('\n\n');
};

const createMockArticle = (id: string, category: MedicalDomain, titleBase: string, isPremium: boolean): MedicalArticle => ({
  id,
  category,
  premium: isPremium,
  author: 'MB Medicine Institutional Academic Board',
  date: '2026-05-20',
  imageUrl: DOMAIN_IMAGES[category] || DOMAIN_IMAGES[MedicalDomain.GENERAL],
  tags: [category.toLowerCase(), '2026-academic', 'exhaustive-volume', 'clinical-authority'],
  title: {
    English: `${category}: Exhaustive Clinical Volume - ${titleBase}`,
    French: `${category}: Volume Clinique Exhaustif - ${titleBase}`,
    Arabic: `${category}: المجلد السريري الشامل - ${titleBase}`
  },
  content: {
    English: createAcademicContent(titleBase, 'English', category),
    French: createAcademicContent(titleBase, 'French', category),
    Arabic: createAcademicContent(titleBase, 'Arabic', category)
  }
});

export const ARTICLES: MedicalArticle[] = [];
DOMAINS.forEach((domain, dIdx) => {
  // Creating 16 articles per domain = 320 articles total
  for (let i = 1; i <= 16; i++) {
    const topics = [
      "Advanced Pathological Mapping", "Therapeutic Interventions", "Radiological Correlations",
      "Surgical Frameworks", "Pharmacological Pathways", "Diagnostic Logic",
      "Emergency Protocols", "Public Health Impact", "Ethical Case Studies",
      "Clinical Trials 2026", "Imaging Standards", "Nursing Care Models",
      "Neonatal Management", "Geriatric Specializations", "Preventive Strategies",
      "Interdisciplinary Research"
    ];
    ARTICLES.push(createMockArticle(
      `v-${dIdx}-${i}`,
      domain,
      `${topics[i-1]} v${i}.4.2`,
      i > 3 // First 3 per domain are free, rest are premium
    ));
  }
});
