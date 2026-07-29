export interface IndustryFAQ {
  question: string;
  answer: string;
}

export interface IndustryUseCase {
  title: string;
  description: string;
}

export interface IndustryData {
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  challenges: string;
  solutions: string;
  useCases: IndustryUseCase[];
  services: string[];
  whyChooseUs: string;
  keywords: string;
  faqs: IndustryFAQ[];
  visualizerType?: 'NeuralGlobe' | 'InteractiveLidar' | 'TopographyMatrix' | 'SemanticPolygon' | 'InteractiveDataStream' | 'PrecisionWaveTracker' | 'InteractiveCanvas';
}

export const industries: IndustryData[] = [
  {
    slug: 'medical-imaging-ai',
    title: 'Medical Imaging AI',
    heroTitle: 'Precision Data for Medical Imaging AI',
    heroSubtitle: 'Accelerate your diagnostic models with pixel-perfect, HIPAA-compliant radiology and DICOM annotations. We provide the ground truth required to turn ambitious healthcare AI into clinical reality.',
    overview: 'Dserve AI partners with leading healthcare technology companies to build the foundational data required for next-generation medical imaging models. From early-disease detection to automated segmentation, our medically trained annotators provide the ground truth data that bridges the gap between AI ambition and clinical execution.',
    challenges: 'Training medical AI models requires an unprecedented level of precision. A single false negative in training data can severely impact clinical outcomes. Furthermore, sourcing massive volumes of diverse, pathological data while maintaining strict HIPAA and GDPR compliance is a major bottleneck for healthcare AI teams.',
    solutions: 'We provide a secure, end-to-end pipeline for medical image annotation. Our specialized teams perform highly nuanced segmentation, classification, and bounding box annotations directly on DICOM files. By combining human-in-the-loop medical expertise with strict QA protocols, we deliver 99%+ accuracy at scale.',
    useCases: [
      { title: 'Tumor Segmentation', description: 'Pixel-level annotation of MRI and CT scans to train models for early oncology detection.' },
      { title: 'Radiology Classification', description: 'Categorizing X-ray scans into diagnostic classifications based on bone density and fractures.' },
      { title: 'Surgical Video Analysis', description: 'Tracking surgical instruments in real-time endoscopic video feeds to assist robotic surgery.' }
    ],
    services: [
      'Medical image collection & sourcing',
      'Native DICOM annotation & tool support',
      'Radiology & pathology annotation',
      'Semantic segmentation for tumors/lesions',
      'Image classification',
      'PHI De-identification & anonymization',
      'Rigorous multi-stage QA'
    ],
    whyChooseUs: 'Our data pipelines are strictly HIPAA & GDPR compliant. We don\'t use generic annotators; our teams are trained specifically on medical terminologies and anatomical structures, ensuring your models learn from true clinical expertise.',
    keywords: 'Medical imaging data collection, Medical image annotation, DICOM annotation services, Radiology AI data, Healthcare AI data, Medical segmentation',
    faqs: [
      { question: 'Do you support native DICOM files?', answer: 'Yes, our annotation platforms and teams are fully equipped to handle native DICOM files, preserving the high bit-depth and metadata required for medical AI.' },
      { question: 'How do you ensure HIPAA compliance?', answer: 'All data is processed in secure, SOC2/HIPAA compliant environments. Annotators operate on isolated networks with strict access controls, and we offer robust PHI de-identification services.' },
      { question: 'What is your accuracy rate for medical annotations?', answer: 'We maintain a 99%+ accuracy rate through a multi-tiered QA process, often involving secondary review by senior medical annotators.' },
      { question: 'Can you source pathology data?', answer: 'Yes, we have established partnerships with clinical data providers to source anonymized, highly specific pathology data for model training.' }
    ],
    visualizerType: 'NeuralGlobe'
  },
  {
    slug: 'clinical-nlp',
    title: 'Clinical NLP',
    heroTitle: 'Structuring Medical Language for AI',
    heroSubtitle: 'Transform unstructured medical text, EHRs, and clinical notes into machine-readable intelligence. Empower your healthcare NLP models to understand complex medical terminology and context.',
    overview: 'Unstructured clinical text holds the key to predictive healthcare, but it is notoriously difficult for standard NLP models to parse. Dserve AI provides highly specialized clinical text annotation, transforming raw medical documents, EHRs, and physician notes into structured, machine-readable data.',
    challenges: 'Medical language is filled with abbreviations, typos, and highly contextual jargon. Off-the-shelf NLP models fail to capture the nuance of physician notes, leading to misdiagnoses or billing errors. Extracting this intelligence safely without violating patient privacy requires immense domain expertise.',
    solutions: 'Our team of medical linguists and certified coders meticulously annotate clinical text. We perform complex entity extraction (NER), sentiment analysis, and relationship mapping on EHRs, clinical trials, and telemedicine transcripts to train highly accurate clinical LLMs.',
    useCases: [
      { title: 'EHR Entity Extraction', description: 'Identifying dosages, medications, and conditions in free-text electronic health records.' },
      { title: 'Telemedicine Transcription', description: 'Annotating doctor-patient audio transcripts for sentiment and intent.' },
      { title: 'Clinical Trial Matching', description: 'Structuring complex trial criteria to match patients based on historical medical data.' }
    ],
    services: [
      'Clinical text annotation (NER)',
      'Medical transcription & QA',
      'Entity relationship mapping',
      'PHI de-identification from text',
      'Telemedicine audio-to-text annotation',
      'Clinical sentiment analysis'
    ],
    whyChooseUs: 'We combine automated PHI scrubbing with human-in-the-loop verification to ensure 100% compliance. Our annotators understand the difference between complex medical acronyms that trip up generic AI.',
    keywords: 'Clinical NLP, Medical text annotation, Clinical data annotation, Healthcare NLP data, EHR annotation, PHI de-identification text',
    faqs: [
      { question: 'Who performs the clinical annotations?', answer: 'Our clinical NLP teams consist of individuals with backgrounds in nursing, medical coding, and life sciences.' },
      { question: 'Can you handle multilingual clinical data?', answer: 'Yes, we support over 30 languages, specializing in regional medical terminology and localized abbreviations.' },
      { question: 'How do you handle unstructured physician notes?', answer: 'We use a combination of strict ontology mapping (like SNOMED CT and ICD-10) and contextual relationship tagging to structure free-form notes.' }
    ],
    visualizerType: 'InteractiveDataStream'
  },
  {
    slug: 'drug-discovery',
    title: 'Drug Discovery',
    heroTitle: 'Accelerating AI in Pharmaceuticals',
    heroSubtitle: 'Fuel your predictive biomedical models with structured molecular data and literature. We curate the complex data required to reduce drug development timelines by years.',
    overview: 'The future of pharmaceuticals relies on AI to drastically reduce the time and cost of drug discovery. Dserve AI empowers biotech and pharma companies by curating, structuring, and annotating massive biomedical data, scientific literature, and molecular imagery.',
    challenges: 'Pharmaceutical R&D generates petabytes of unstructured data, from complex molecular graphs to dense scientific papers. Training AI to predict molecular bindings or identify novel targets requires highly structured, ontologically precise data that is difficult to curate at scale.',
    solutions: 'We act as an extension of your research team. Our annotators meticulously structure biomedical literature, annotate molecular structures, and curate complex research data so your data scientists can focus on building breakthrough predictive models.',
    useCases: [
      { title: 'Molecular Graph Annotation', description: 'Labeling atomic structures and binding sites for predictive protein-folding models.' },
      { title: 'Literature Curation', description: 'Extracting gene-disease relationships from thousands of academic biomedical papers.' },
      { title: 'Clinical Trial Analysis', description: 'Structuring trial results and adverse event reports for predictive safety modeling.' }
    ],
    services: [
      'Biomedical data creation & structuring',
      'Scientific literature annotation (NER)',
      'Molecular & cellular image annotation',
      'Gene-disease relationship mapping',
      'Clinical trial data extraction'
    ],
    whyChooseUs: 'Our specialized life sciences team understands biological ontologies and complex scientific literature, ensuring your training data is scientifically sound and rigorously structured.',
    keywords: 'Drug discovery AI, Biomedical annotation, Scientific data annotation, Pharma AI data, Drug development data',
    faqs: [
      { question: 'Do you have life sciences experts on staff?', answer: 'Yes, for drug discovery projects, we deploy annotators with backgrounds in biology, chemistry, and pharmacology.' },
      { question: 'What ontologies do you support?', answer: 'We work with standard ontologies like MeSH, SNOMED, and custom proprietary ontologies developed by our clients.' },
      { question: 'Can you process complex PDF research papers?', answer: 'Yes, our OCR and NLP pipelines are specifically tuned to extract tabular data and text from dense scientific PDFs.' },
      { question: 'Do you support chemical structure drawing?', answer: 'Yes, our teams are proficient in using chemical drawing tools to annotate 2D and 3D molecular structures.' }
    ],
    visualizerType: 'PrecisionWaveTracker'
  },
  {
    slug: 'healthcare-administration',
    title: 'Healthcare Administration',
    heroTitle: 'Automating the Business of Healthcare',
    heroSubtitle: 'High-quality data to train AI for revenue cycle management, claims processing, and medical coding. Reduce overhead and eliminate billing errors with intelligent automation.',
    overview: 'Administrative inefficiencies cost the healthcare industry billions annually. Dserve AI provides the structured training data needed to automate medical coding, claims adjudication, and hospital administration workflows.',
    challenges: 'Claims data is notoriously messy, involving handwritten forms, outdated fax documents, and highly complex ICD-10 coding rules. Training OCR and NLP models to parse this unstructured administrative data without error is a massive hurdle.',
    solutions: 'We process millions of medical forms, invoices, and claims documents. Our teams perform high-precision OCR transcription, document classification, and medical code mapping (ICD/CPT) to train your revenue cycle AI.',
    useCases: [
      { title: 'Claims Adjudication AI', description: 'Extracting patient and billing data from CMS-1500 forms to automate insurance claims.' },
      { title: 'Automated Medical Coding', description: 'Mapping unstructured physician notes to exact ICD-10 and CPT billing codes.' },
      { title: 'Prior Authorization NLP', description: 'Parsing insurance policies and patient histories to automate approval predictions.' }
    ],
    services: [
      'Revenue cycle data creation',
      'Medical coding (ICD-10, CPT) annotation',
      'Claims & invoice OCR transcription',
      'Insurance document classification',
      'Administrative NLP & entity extraction'
    ],
    whyChooseUs: 'Our teams include certified medical coders and administrative experts who understand the financial intricacies of healthcare, ensuring your automation models maximize revenue and reduce claim denials.',
    keywords: 'Revenue cycle AI, Medical coding annotation, Claims data annotation, Healthcare administration AI, Insurance AI data, OCR healthcare',
    faqs: [
      { question: 'Do you employ certified medical coders?', answer: 'Yes, for revenue cycle projects, we utilize AAPC and AHIMA certified coders to ensure absolute accuracy.' },
      { question: 'Can you handle handwritten medical forms?', answer: 'Absolutely. We specialize in transcribing and structuring difficult-to-read handwritten physician notes and intake forms.' },
      { question: 'Is your processing environment secure?', answer: 'All administrative data processing is conducted within our SOC2 and HIPAA compliant secure facilities.' }
    ],
    visualizerType: 'TopographyMatrix'
  },
  {
    slug: 'remote-patient-monitoring',
    title: 'Remote Patient Monitoring',
    heroTitle: 'AI Data for the IoMT Ecosystem',
    heroSubtitle: 'Annotate time-series sensor data and wearable biometrics to power predictive health AI. Move healthcare beyond the clinic and into the home.',
    overview: 'The Internet of Medical Things (IoMT) is shifting patient care from hospitals to the home. Dserve AI helps companies train predictive algorithms on continuous, real-time physiological data collected from wearables and remote sensors.',
    challenges: 'Sensor data is noisy, continuous, and highly complex. Time-series data from ECGs, sleep monitors, and glucose sensors require precise temporal annotation to train algorithms to detect anomalies before they become critical.',
    solutions: 'We specialize in time-series annotation. Our teams label anomalies, categorize sleep stages, and map physiological events across continuous streams of wearable data, providing the exact timestamps required to train predictive health AI.',
    useCases: [
      { title: 'Arrhythmia Detection', description: 'Annotating continuous ECG and PPG sensor streams to identify irregular heartbeats.' },
      { title: 'Sleep Stage Classification', description: 'Labeling accelerometer and heart rate data to determine REM and deep sleep cycles.' },
      { title: 'Fall Detection Algorithms', description: 'Tagging sudden kinetic shifts in accelerometer data for elderly monitoring systems.' }
    ],
    services: [
      'Time-series sensor data annotation',
      'ECG & PPG signal labeling',
      'Wearable accelerometer/gyroscope annotation',
      'Sleep & activity state classification',
      'Anomaly & event detection tagging'
    ],
    whyChooseUs: 'We have proprietary tooling specifically designed for visualizing and annotating continuous time-series data, allowing our teams to tag micro-events with millisecond precision.',
    keywords: 'Remote patient monitoring AI, Wearable data collection, Sensor annotation, Healthcare IoT data, RPM AI, Time-series annotation',
    faqs: [
      { question: 'How do you handle massive streams of continuous data?', answer: 'We use specialized time-series annotation tools that allow our annotators to zoom in on micro-events and label precise temporal segments.' },
      { question: 'Can you synchronize data from multiple sensors?', answer: 'Yes, we frequently annotate multi-modal data, synchronizing video feeds with wearable sensor output to provide comprehensive context.' },
      { question: 'What types of biometric data do you process?', answer: 'We handle everything from ECG and EEG waveforms to simple accelerometer, temperature, and glucose continuous streams.' }
    ],
    visualizerType: 'SemanticPolygon'
  },
  {
    slug: 'public-health',
    title: 'Public Health & Epidemiology',
    heroTitle: 'Data Intelligence for Global Health',
    heroSubtitle: 'Large-scale healthcare data for public health research and epidemiological modeling. Track outbreaks, analyze demographics, and predict regional health trends.',
    overview: 'Understanding population health trends requires massive, diverse data. Dserve AI partners with public health organizations and researchers to collect, structure, and de-identify population-level data to fuel predictive epidemiological AI.',
    challenges: 'Public health data is highly fragmented across different regional systems, languages, and formats. Normalizing this data while removing sensitive demographic identifiers is critical for unbiased, compliant epidemiological modeling.',
    solutions: 'We provide large-scale data collection and curation services. We structure regional health reports, transcribe epidemiological surveys, and map global health trends to standardized ontologies for macro-level AI analysis.',
    useCases: [
      { title: 'Outbreak Prediction', description: 'Structuring localized news and clinical reports to track the early spread of infectious diseases.' },
      { title: 'Demographic Health Analysis', description: 'Curating broad, anonymized survey data to understand regional dietary and health trends.' },
      { title: 'Vaccine Efficacy Modeling', description: 'Extracting and normalizing adverse event reports across diverse global healthcare systems.' }
    ],
    services: [
      'Population health data curation',
      'Epidemiological report structuring',
      'Multi-lingual health survey annotation',
      'Global demographic data collection',
      'Macro-level PHI de-identification'
    ],
    whyChooseUs: 'Our global crowd allows us to collect highly diverse, geographically distributed data, ensuring your public health models are free from regional or demographic bias.',
    keywords: 'Public health AI, Healthcare data, Population health data, Epidemiology data, Public health annotation, Health data collection',
    faqs: [
      { question: 'How do you ensure demographic diversity in data collection?', answer: 'We leverage a globally distributed network of contributors and strictly monitor demographic quotas to ensure the data we collect is representative and unbiased.' },
      { question: 'Can you map regional data to global standards?', answer: 'Yes, we map localized health reporting to global standards like WHO classifications to ensure interoperability.' },
      { question: 'How is data anonymized at this scale?', answer: 'We deploy automated NLP scrubbing pipelines followed by human review to ensure large datasets are entirely stripped of PII/PHI.' }
    ],
    visualizerType: 'NeuralGlobe'
  },
  {
    slug: 'financial-services',
    title: 'Financial Services & FinTech',
    heroTitle: 'Intelligent FinTech Data Pipelines',
    heroSubtitle: 'High-security financial data annotation to power fraud detection, automated KYC, and algorithmic trading models. Build robust, compliant financial AI.',
    overview: 'The financial sector is rapidly adopting AI to detect fraud, automate customer onboarding, and predict market shifts. Dserve AI provides the highly secure, accurate data processing required to train mission-critical FinTech models.',
    challenges: 'Financial data is highly sensitive and complex. Training models to accurately read blurry receipts, detect forged IDs, or parse dense financial reports requires pristine training data handled in a zero-trust security environment.',
    solutions: 'Our financial experts annotate transaction histories, perform complex OCR on invoices, and label KYC documents (IDs, passports). We provide the structured intelligence needed to automate risk assessment and compliance.',
    useCases: [
      { title: 'Automated KYC/AML', description: 'Bounding box and text extraction on international passports and IDs to train identity verification AI.' },
      { title: 'Fraud Detection', description: 'Categorizing transaction anomalies and labeling historical fraud instances in massive financial datasets.' },
      { title: 'Algorithmic Trading NLP', description: 'Sentiment analysis on real-time financial news and earnings call transcripts.' }
    ],
    services: [
      'Financial document OCR & transcription',
      'KYC document data processing',
      'Receipt & invoice data extraction',
      'Transaction categorization & anomaly tagging',
      'Financial sentiment analysis (NLP)'
    ],
    whyChooseUs: 'Security is our priority. We operate clean-room environments with strict access controls, device management, and background-checked annotators to ensure your proprietary financial data is never compromised.',
    keywords: 'FinTech data annotation, Financial AI data, Invoice annotation, OCR annotation, KYC data labeling, Fraud detection AI',
    faqs: [
      { question: 'How secure is your annotation environment?', answer: 'We offer isolated, air-gapped clean rooms with strict physical and digital security protocols, including disabling USB ports and internet access for annotators.' },
      { question: 'Can you handle multilingual invoices?', answer: 'Yes, our global teams can extract structured financial data from receipts and invoices in over 40 languages.' },
      { question: 'Do you provide financial sentiment analysis?', answer: 'Absolutely. We deploy annotators with financial backgrounds to label the nuanced sentiment of earnings reports and market news.' },
      { question: 'Are your annotators background checked?', answer: 'Yes, all annotators working on financial and KYC projects undergo strict identity verification and background checks.' }
    ],
    visualizerType: 'InteractiveCanvas'
  },
  {
    slug: 'ecommerce-retail',
    title: 'E-Commerce & Retail',
    heroTitle: 'Visual Intelligence for Retail AI',
    heroSubtitle: 'High-volume product image annotation and retail data to power visual search, automated checkout, and inventory AI. Transform the shopper experience.',
    overview: 'From visual search to automated checkout, AI is transforming retail. Dserve AI provides massive, high-quality data to train computer vision and recommendation models for the world\'s leading e-commerce and retail brands.',
    challenges: 'Retail AI requires massive volume. Training a visual search engine requires millions of precisely labeled clothing items, while cashier-less checkout models need complex multi-camera tracking of shoppers and inventory.',
    solutions: 'We deploy large-scale crowds to annotate product catalogs, perform semantic segmentation on fashion imagery, and track items across CCTV feeds. We provide the scale required to train robust retail computer vision models.',
    useCases: [
      { title: 'Visual Search & Discovery', description: 'Polygonal segmentation of clothing items to allow users to search for products using their camera.' },
      { title: 'Cashierless Checkout', description: 'Tracking customer hands and products in real-time across multiple overhead camera feeds.' },
      { title: 'Automated Inventory Management', description: 'Bounding box annotation of retail shelves to train AI to detect out-of-stock or misplaced items.' }
    ],
    services: [
      'Product categorization & tagging',
      'Fashion & apparel semantic segmentation',
      'Shelf monitoring & inventory bounding boxes',
      'Cashierless checkout video tracking',
      'Customer support NLP data'
    ],
    whyChooseUs: 'We can scale our annotation workforce to thousands of contributors in days, allowing us to process massive retail catalogs and seasonal inventory updates with lightning speed.',
    keywords: 'Retail data annotation, Product image annotation, Shelf image data, Retail AI, E-commerce AI data, SKU recognition',
    faqs: [
      { question: 'How quickly can you scale for a large catalog update?', answer: 'We can ramp up a trained workforce of hundreds of annotators within 48 hours to handle sudden influxes of retail data.' },
      { question: 'Can you annotate fine details like clothing textures and patterns?', answer: 'Yes, our teams perform high-granularity semantic segmentation, tagging specific attributes like sleeve length, fabric type, and patterns.' },
      { question: 'Do you handle 3D point cloud data for retail mapping?', answer: 'Yes, we annotate LiDAR and 3D data used by robots for automated store mapping and inventory scanning.' },
      { question: 'Can you provide localized relevance ranking for search?', answer: 'Yes, our global crowd evaluates e-commerce search results to ensure local cultural relevance for global brands.' }
    ],
    visualizerType: 'SemanticPolygon'
  },
  {
    slug: 'autonomous-systems',
    title: 'Autonomous Systems & Robotics',
    heroTitle: 'Ground Truth for Embodied AI',
    heroSubtitle: 'LiDAR, sensor fusion, and video tracking annotation for autonomous vehicles, drones, and industrial robotics. Build systems that navigate the real world safely.',
    overview: 'Autonomous vehicles and robotics require AI that deeply understands spatial reality. Dserve AI provides the complex, multi-modal annotation required to train embodied AI systems to safely navigate and interact with the physical world.',
    challenges: 'Embodied AI relies on sensor fusion—combining 2D video with 3D LiDAR point clouds. Annotating this heavy, multi-dimensional data requires specialized tooling and incredible precision to prevent catastrophic real-world failures.',
    solutions: 'We specialize in 3D sensor annotation. Our teams perform 3D cuboid bounding, semantic segmentation on LiDAR point clouds, and object tracking across synchronized multi-camera setups for self-driving cars, drones, and factory robots.',
    useCases: [
      { title: 'Autonomous Driving', description: '3D cuboid annotation of vehicles and pedestrians in dense LiDAR point clouds for self-driving cars.' },
      { title: 'AgTech Robotics', description: 'Semantic segmentation of crops and weeds in drone imagery to guide automated pesticide sprayers.' },
      { title: 'Warehouse Automation', description: 'Tracking forklifts and human workers in CCTV to train collision-avoidance algorithms.' }
    ],
    services: [
      'LiDAR & 3D point cloud annotation',
      'Sensor fusion (2D to 3D mapping)',
      'Multi-camera synchronized data',
      'Video object tracking & interpolation',
      'Robotic arm grasping point annotation'
    ],
    whyChooseUs: 'Our annotators are highly trained on state-of-the-art 3D annotation tools. We understand the physics of movement, ensuring object interpolation and tracking are perfectly aligned across thousands of frames.',
    keywords: 'Robotics data collection, Egocentric video data, Autonomous vehicle annotation, Multi-modal AI data, Embodied AI data, LiDAR annotation',
    faqs: [
      { question: 'What tools do you use for LiDAR annotation?', answer: 'We integrate with leading 3D annotation platforms and can adapt to your proprietary internal tooling via secure VPN.' },
      { question: 'Can you handle multi-sensor fusion data?', answer: 'Yes, our teams routinely annotate synchronized datasets consisting of LiDAR, radar, and up to 8 surrounding camera feeds simultaneously.' },
      { question: 'How do you maintain tracking consistency across long videos?', answer: 'We utilize AI-assisted interpolation combined with strict manual keyframe reviews to ensure object IDs remain consistent.' },
      { question: 'Do you collect egocentric video data?', answer: 'Yes, we can deploy global crowds to capture first-person (egocentric) video of specific tasks for robotics training.' },
      { question: 'What is your QA process for 3D bounding boxes?', answer: 'Every 3D cuboid is checked for yaw, pitch, roll, and tight fit across all three axes by a secondary QA specialist.' }
    ],
    visualizerType: 'InteractiveLidar'
  },
  {
    slug: 'media-entertainment',
    title: 'Media & Entertainment',
    heroTitle: 'AI Data for the Content Era',
    heroSubtitle: 'High-quality audio, video, and text annotation to train AI for content moderation, transcription, and personalized media recommendation engines.',
    overview: 'As digital content explodes, AI is essential for moderation, transcription, and recommendation. Dserve AI provides the massive, culturally aware data required to train AI that understands video, audio, and user-generated content.',
    challenges: 'Media is highly subjective and culturally nuanced. Training a moderation algorithm to understand sarcasm, or a recommendation engine to categorize hyper-niche genres, requires human annotators with deep local cultural context.',
    solutions: 'We deploy localized annotation teams worldwide. We provide precise audio transcription, video scene categorization, and nuanced content moderation, ensuring your media AI understands context, not just raw pixels or audio.',
    useCases: [
      { title: 'Trust & Safety Moderation', description: 'Labeling UGC video and text for hate speech, violence, and policy violations.' },
      { title: 'Media Recommendation', description: 'Tagging movies and audio tracks with hyper-specific genre, mood, and thematic metadata.' },
      { title: 'Automated Transcription', description: 'Timestamped audio transcription of diverse dialects and accents to train speech-to-text AI.' }
    ],
    services: [
      'Audio transcription & diarization',
      'Video action & scene categorization',
      'Content moderation & Trust/Safety',
      'Subtitle generation data',
      'Sentiment & emotion analysis'
    ],
    whyChooseUs: 'Our globally distributed workforce ensures that your content is annotated by native speakers who understand the local cultural context, slang, and specific regional nuances.',
    keywords: 'Video annotation, Audio annotation, Content moderation data, Media AI, Video AI data, Audio transcription',
    faqs: [
      { question: 'Do you provide speaker diarization?', answer: 'Yes, we provide timestamped transcription that accurately identifies and separates multiple overlapping speakers.' },
      { question: 'How do you handle sensitive content moderation?', answer: 'We implement strict wellness protocols for annotators viewing sensitive Trust & Safety content, including limited shift times and psychological support resources.' },
      { question: 'Can you transcribe heavy regional accents?', answer: 'Absolutely. We specifically source native speakers from targeted regions to accurately transcribe distinct dialects and colloquialisms.' }
    ],
    visualizerType: 'InteractiveDataStream'
  },
  {
    slug: 'llms-conversational-ai',
    title: 'LLMs & Conversational AI',
    heroTitle: 'Human Intelligence for Generative AI',
    heroSubtitle: 'Elite RLHF, prompt engineering, and instruction tuning data to align your Large Language Models for safety, accuracy, and helpfulness.',
    overview: 'Large Language Models require intense human alignment to be safe and useful. Dserve AI provides the sophisticated human-in-the-loop feedback necessary to train, fine-tune, and evaluate the next generation of conversational AI.',
    challenges: 'You cannot train a frontier model with standard gig-workers. RLHF and instruction tuning require highly educated, domain-expert annotators who can write complex code, understand legal documents, or craft creative prose.',
    solutions: 'We provide elite, domain-specific prompt engineers and RLHF annotators. Our teams generate complex synthetic data, rank model outputs for safety and helpfulness, and create nuanced conversational data to align your Generative AI.',
    useCases: [
      { title: 'RLHF (Reinforcement Learning from Human Feedback)', description: 'Ranking and evaluating LLM responses to align model behavior with human preferences.' },
      { title: 'Instruction Tuning', description: 'Writing high-quality prompt/response pairs (SFT) to teach models specific formatting and logic tasks.' },
      { title: 'Red Teaming', description: 'Adversarial prompt engineering to discover vulnerabilities and bias in foundation models.' }
    ],
    services: [
      'RLHF output ranking & evaluation',
      'Supervised Fine-Tuning (SFT) data generation',
      'Adversarial red-teaming',
      'Multilingual instruction tuning data',
      'Code generation & evaluation'
    ],
    whyChooseUs: 'We source domain experts—from software engineers to lawyers and creative writers—ensuring that the human feedback guiding your LLM is of the absolute highest intellectual caliber.',
    keywords: 'LLM training data, RLHF, Prompt annotation, AI training data, Conversational AI data, Generative AI data',
    faqs: [
      { question: 'What level of expertise do your RLHF annotators have?', answer: 'Depending on the project, we source annotators with advanced degrees (Master\'s/PhDs), senior software engineers, and certified professionals (CPA, JD).' },
      { question: 'Do you support multilingual LLM alignment?', answer: 'Yes, we provide instruction tuning and RLHF in over 40 languages using native, educated speakers.' },
      { question: 'Can you write code for coding LLMs?', answer: 'Yes, we have specialized teams of software engineers who write and evaluate prompt/response pairs in Python, C++, Java, and more.' },
      { question: 'How do you prevent bias in RLHF?', answer: 'We ensure our annotation panels are demographically diverse and employ strict, iterative calibration sessions to align annotator guidelines.' },
      { question: 'Do you perform safety red-teaming?', answer: 'Yes, our adversarial teams actively try to jailbreak models to identify and patch safety and policy vulnerabilities.' }
    ],
    visualizerType: 'PrecisionWaveTracker'
  },
  {
    slug: 'enterprise-ai',
    title: 'Enterprise AI & Automation',
    heroTitle: 'Powering the AI-Driven Enterprise',
    heroSubtitle: 'Intelligent document processing and workflow data to power internal enterprise automation. Unlock the unstructured data trapped inside your business.',
    overview: 'Enterprises sit on mountains of unstructured data—contracts, emails, and PDFs. Dserve AI provides the structured intelligence required to build custom enterprise AI that automates back-office workflows and unlocks corporate knowledge.',
    challenges: 'Enterprise AI must be highly customized to internal business logic. Off-the-shelf OCR models fail on proprietary corporate formats, and internal data is too sensitive to send to public cloud APIs.',
    solutions: 'We build custom data pipelines for Intelligent Document Processing (IDP). We annotate complex contracts, parse technical manuals, and structure HR workflows to train AI that understands your specific enterprise domain.',
    useCases: [
      { title: 'Contract Analysis', description: 'Extracting clauses, liabilities, and dates from dense legal contracts for automated review.' },
      { title: 'Technical Manual Parsing', description: 'Structuring engineering diagrams and repair manuals for internal RAG chatbots.' },
      { title: 'HR Workflow Automation', description: 'Parsing resumes and internal employee feedback forms for automated talent routing.' }
    ],
    services: [
      'Intelligent Document Processing (IDP)',
      'Contract & legal text annotation',
      'Technical diagram & manual structuring',
      'Workflow automation data',
      'Enterprise RAG knowledge base curation'
    ],
    whyChooseUs: 'We operate as a secure extension of your enterprise. With SOC2 compliance and the ability to work within your secure VPNs, your proprietary corporate data never leaves your control.',
    keywords: 'Enterprise AI, Business process automation, Intelligent document processing, OCR annotation, Enterprise data annotation, IDP data',
    faqs: [
      { question: 'Can you work inside our enterprise VPN?', answer: 'Yes, we frequently deploy our annotators directly into client-secured virtual environments to ensure data never leaves your network.' },
      { question: 'Do you handle complex, multi-page PDFs?', answer: 'Absolutely. We specialize in complex IDP, extracting nested tables and cross-referencing information across 100+ page enterprise documents.' },
      { question: 'Can you annotate legal contracts?', answer: 'Yes, we utilize paralegals and legal experts to accurately tag clauses, indemnifications, and obligations in corporate contracts.' }
    ],
    visualizerType: 'TopographyMatrix'
  }
];
