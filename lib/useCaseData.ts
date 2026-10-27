export interface UseCaseFAQ {
  question: string;
  answer: string;
}

export interface UseCaseCapability {
  title: string;
  description: string;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface PipelineStep {
  step: string;
  title: string;
  description: string;
  tag: string;
}

export interface KeyMetric {
  value: string;
  label: string;
}

export interface UseCaseData {
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  challenges: string;
  solutions: string;
  keyMetrics: KeyMetric[];
  technicalSpecs: TechnicalSpec[];
  pipelineSteps: PipelineStep[];
  capabilities: UseCaseCapability[];
  whyChooseUs: string;
  faqs: UseCaseFAQ[];
  visualizerType?: 'NeuralGlobe' | 'InteractiveLidar' | 'TopographyMatrix' | 'SemanticPolygon' | 'InteractiveDataStream' | 'PrecisionWaveTracker' | 'InteractiveCanvas';
}

export const useCases: UseCaseData[] = [
  {
    slug: 'dicom-medical-annotation',
    title: 'DICOM Medical Annotation',
    heroTitle: 'Pixel-Perfect DICOM Annotation for Healthcare AI',
    heroSubtitle: 'Native DICOM handling and precise semantic segmentation for clinical AI models. We provide HIPAA-compliant ground truth data verified by certified medical specialists.',
    overview: 'Training medical AI requires pixel-level precision that standard image formats cannot provide. Dserve AI specializes in native DICOM annotation, allowing your medical imaging models to learn from the full bit-depth and metadata of clinical scans.',
    challenges: 'Converting DICOM files to PNG or JPEG for annotation strips away critical metadata, Hounsfield units, and slice sequencing required for volumetric analysis. Furthermore, sourcing qualified medical professionals to annotate these files securely is incredibly difficult for AI teams.',
    solutions: 'Dserve AI provides a fully managed, HIPAA-compliant pipeline. We use native DICOM tooling that supports Multi-Planar Reconstruction (MPR) and deploy teams of certified radiologists and medical coders to provide flawless semantic segmentation directly on your clinical data.',
    keyMetrics: [
      { value: '99.8%', label: 'Clinical Accuracy SLA' },
      { value: '100%', label: 'Native DICOM Voxel Preservation' },
      { value: 'Zero', label: 'PHI Leakage Clean Rooms' },
      { value: '<48h', label: 'Pilot Turnaround Speed' }
    ],
    technicalSpecs: [
      { label: 'Supported Modalities', value: 'MRI, CT, X-Ray, Ultrasound, PET, Mammography' },
      { label: 'File Formats', value: 'Native DICOM (.dcm), NIfTI (.nii, .nii.gz), Analyze 7.5' },
      { label: 'Reconstruction Views', value: 'Axial, Sagittal, Coronal Multi-Planar Reconstruction (MPR)' },
      { label: 'Compliance Standards', value: 'HIPAA, HITECH, GDPR, SOC 2 Type II Certified Facilities' },
      { label: 'Annotator Credentials', value: 'Board-Certified Radiologists, Certified Tumor Registrars (CTR)' }
    ],
    pipelineSteps: [
      {
        step: '01',
        title: 'Zero-Trust Intake & PHI Scrubbing',
        description: 'Automated de-identification removes all patient health identifiers while strictly preserving voxel bit-depth and imaging tags.',
        tag: 'Security'
      },
      {
        step: '02',
        title: 'Clinical Specialist Annotation',
        description: 'Certified radiologists and pathology specialists perform multi-planar polygon drawing, volume labeling, and lesion segmentation.',
        tag: 'Precision'
      },
      {
        step: '03',
        title: 'Senior Physician QA Consensus',
        description: 'Discrepancies between annotators are routed to senior medical arbitrators to guarantee medical ground-truth consensus.',
        tag: 'Verification'
      },
      {
        step: '04',
        title: 'Export in Target ML Format',
        description: 'Direct output delivery in JSON, COCO, XML, or native segmentation masks configured for immediate PyTorch/TensorFlow ingestion.',
        tag: 'Delivery'
      }
    ],
    capabilities: [
      { title: 'Native DICOM Support', description: 'We support Multi-Planar Reconstruction (MPR) and native rendering, preserving 100% of clinical metadata and Hounsfield unit density.' },
      { title: 'Tumor & Lesion Segmentation', description: 'Pixel-perfect polygon drawing and semantic segmentation of microscopic pathological anomalies across hundreds of slices.' },
      { title: 'Multi-Modality Volumetric Expertise', description: 'Expert volumetric 3D annotation across multi-contrast MRI, high-resolution CT, and ultrasound sequences.' },
      { title: 'HIPAA/GDPR Air-Gapped Compliance', description: 'All data is processed within isolated, zero-trust clean rooms with disabled external drives and strict network egress rules.' },
      { title: 'Medical Professional Workforce', description: 'We deploy certified healthcare specialists, not generic crowd workers, to interpret complex anatomy and disease progression.' }
    ],
    whyChooseUs: 'Our specialized medical annotators work in secure, air-gapped environments. We don\'t downsample your DICOMs; we annotate natively to ensure zero clinical data loss.',
    faqs: [
      { question: 'What is DICOM annotation?', answer: 'DICOM annotation involves labeling medical images in their native Digital Imaging and Communications in Medicine format, preserving critical metadata, multi-planar slices, and high bit-depth for AI training.' },
      { question: 'Are your DICOM annotation services HIPAA compliant?', answer: 'Yes, we operate strictly within SOC2 and HIPAA compliant clean-room environments, ensuring all Protected Health Information (PHI) is secured or de-identified with full audit logging.' },
      { question: 'Can you work with 3D volumetric scans like CT and MRI?', answer: 'Absolutely. We support 3D volumetric annotation and Multi-Planar Reconstruction (MPR) across Axial, Sagittal, and Coronal views simultaneously.' }
    ],
    visualizerType: 'NeuralGlobe'
  },
  {
    slug: 'lidar-3d-bounding-box',
    title: 'LiDAR 3D Bounding Box',
    heroTitle: 'High-Precision 3D LiDAR & Sensor Fusion Annotation',
    heroSubtitle: 'Accelerate autonomous vehicle and robotics perception with flawless 3D sensor fusion data. We track dynamic actors across millions of dense point-cloud frames.',
    overview: 'Autonomous navigation depends on understanding a 3D world. Dserve AI provides highly accurate 3D bounding box (cuboid) annotations on LiDAR point clouds to train self-driving cars, drones, and industrial robots.',
    challenges: 'Annotating 3D point clouds is immensely complex. Objects are often occluded, sparse, or distorted. Maintaining perfectly consistent object tracking IDs (yaw, pitch, roll) across thousands of continuous temporal frames is nearly impossible for untrained annotators.',
    solutions: 'We deploy specialized 3D annotation teams who understand the physics of movement. Using state-of-the-art sensor fusion tools, we align 2D camera feeds with 3D LiDAR point clouds to ensure every cuboid is tight, perfectly oriented, and consistent across time.',
    keyMetrics: [
      { value: '99.9%', label: 'Tracking ID Consistency' },
      { value: '0.05m', label: 'Bounding Box Tightness Tolerance' },
      { value: '10M+', label: '3D Frames Annotated' },
      { value: '100%', label: 'Temporal Sequence Calibration' }
    ],
    technicalSpecs: [
      { label: 'Supported Sensors', value: 'LiDAR (64/128 beam), Radar, RGB Cameras, IMU/GPS Telemetry' },
      { label: 'Point Cloud Formats', value: 'PCD, LAS, LAZ, BIN, PLY, ROSBag' },
      { label: 'Kinematic Classes', value: 'Vehicles, Pedestrians, Cyclists, Road Debris, Dynamic Obstacles' },
      { label: 'Orientation Parameters', value: 'Full 9-DOF: Centroid (x,y,z), Dimensions (l,w,h), Rotation (yaw,pitch,roll)' },
      { label: 'Quality Control', value: 'Automated geometric bounding box collision and velocity vector validation' }
    ],
    pipelineSteps: [
      {
        step: '01',
        title: 'Sensor Calibration & Time-Sync',
        description: 'Extrinsic and intrinsic matrix alignment ensures LiDAR sweeps match RGB camera frames at sub-millisecond precision.',
        tag: 'Calibration'
      },
      {
        step: '02',
        title: 'Multi-Axis 3D Cuboid Fitting',
        description: 'Trained specialists fit tight 9-DOF 3D bounding boxes around sparse points, maintaining exact ground-plane snap.',
        tag: 'Annotation'
      },
      {
        step: '03',
        title: 'Temporal ID Interpolation',
        description: 'Persistent actor tracking across occlusions, turns, and weather conditions ensures zero ID switches in video sequences.',
        tag: 'Tracking'
      },
      {
        step: '04',
        title: 'Kinematic & Vector QA Audit',
        description: 'Algorithmic checks verify physical feasibility (acceleration, heading angle) followed by senior sensor lead sign-off.',
        tag: 'Validation'
      }
    ],
    capabilities: [
      { title: 'Precise 3D Cuboids with Yaw Snap', description: 'Flawless bounding box drawing with strict multi-axis orientation checks and ground-plane alignment.' },
      { title: 'Multi-Sensor Spatial Fusion', description: 'Simultaneous synchronized annotation of LiDAR point clouds and 360-degree surrounding 4K camera arrays.' },
      { title: 'Zero-Switch Temporal Tracking', description: 'Maintaining persistent object IDs across thousands of frames with AI-assisted trajectory interpolation.' },
      { title: '3D Point Cloud Semantic Segmentation', description: 'Point-level classification of drivable road surface, sidewalks, vegetation, and static urban infrastructure.' },
      { title: 'Adverse Weather Edge-Case Curation', description: 'Specialized handling for occluded actors and noisy backscatter caused by heavy rain, fog, or night driving.' }
    ],
    whyChooseUs: 'Our annotators are trained on state-of-the-art 3D perception tools. We ensure perfect temporal consistency and zero ID-switching for dynamic actors across long video sequences.',
    faqs: [
      { question: 'How do you ensure accuracy in LiDAR bounding boxes?', answer: 'We employ multi-axis QA checks with algorithmic kinematic validation. Every 3D cuboid is verified for tight fit, heading (yaw), and correct categorization by a secondary sensor lead.' },
      { question: 'Can you handle multi-modal sensor fusion?', answer: 'Yes, our platforms and teams routinely synchronize and annotate data from LiDAR, radar, and multiple surrounding camera feeds simultaneously.' }
    ],
    visualizerType: 'InteractiveLidar'
  },
  {
    slug: 'llm-rlhf-alignment',
    title: 'LLM RLHF Alignment',
    heroTitle: 'Domain-Expert RLHF Data for Frontier AI Alignment',
    heroSubtitle: 'Align frontier models with elite human preference data. We provide subject-matter expert ranking, complex SFT dialogue creation, and adversarial red-teaming.',
    overview: 'A foundation model is only as safe as its alignment. Reinforcement Learning from Human Feedback (RLHF) requires highly educated annotators to rank outputs, correct hallucinations, and ensure model helpfulness.',
    challenges: 'You cannot train a frontier AI model using cheap crowd-labor. Evaluating complex code, legal documents, or nuanced creative writing requires high-level human reasoning and domain expertise that standard BPOs cannot provide.',
    solutions: 'We curate bespoke teams of domain experts—including software engineers, lawyers, and healthcare professionals. They write high-quality Supervised Fine-Tuning (SFT) pairs, perform aggressive adversarial red-teaming, and rank LLM outputs to align your model perfectly with human intent.',
    keyMetrics: [
      { value: '100%', label: 'Subject-Matter Specialists (PhDs/MDs/JDs)' },
      { value: 'HHH', label: 'Helpful, Harmless, Honest Framework' },
      { value: '40+', label: 'Languages & Dialects Supported' },
      { value: 'Zero', label: 'Synthetically Polluted Labels' }
    ],
    technicalSpecs: [
      { label: 'Evaluation Domains', value: 'Software Engineering (Python, C++, Rust), Legal, Medical, STEM, Finance' },
      { label: 'Alignment Methodologies', value: 'DPO (Direct Preference Optimization), RLHF, KTO, PPO, Constitutional AI' },
      { label: 'SFT Pair Complexity', value: 'Multi-turn reasoning, tool/function calling, chain-of-thought scratchpads' },
      { label: 'Safety Red-Teaming', value: 'Jailbreak vulnerability auditing, PII leakage, toxicity, prompt injection' },
      { label: 'Workforce Profile', value: 'Native speakers with accredited university degrees and technical domain tests' }
    ],
    pipelineSteps: [
      {
        step: '01',
        title: 'Taxonomy & Rubric Calibration',
        description: 'Our lead alignment architects define clear grading rubrics with your ML research team for pairwise ranking.',
        tag: 'Calibration'
      },
      {
        step: '02',
        title: 'Expert Pairwise Evaluation',
        description: 'Vetted domain specialists evaluate dual model completions, ranking outputs with deep written rationale.',
        tag: 'Evaluation'
      },
      {
        step: '03',
        title: 'Adversarial Red-Teaming Sprints',
        description: 'Security and policy engineers craft creative attack vectors to expose safety hallucinations and model edge-cases.',
        tag: 'Red-Teaming'
      },
      {
        step: '04',
        title: 'DPO / RLHF Dataset Verification',
        description: 'Rigorous inter-annotator agreement (IAA) scoring guarantees high statistical signal-to-noise ratio in preference pairs.',
        tag: 'Delivery'
      }
    ],
    capabilities: [
      { title: 'HHH Pairwise Preference Ranking', description: 'Rigorous evaluation and ranking of model completions based on Helpfulness, Harmlessness, and Honesty.' },
      { title: 'High-Fidelity SFT Dialogue Drafting', description: 'Drafting multi-turn reasoning prompts with complex tool-calling and step-by-step chain-of-thought demonstrations.' },
      { title: 'Adversarial Red-Teaming Sprints', description: 'Aggressively stress-testing models with zero-day prompt injections, jailbreaks, and policy evasion vectors.' },
      { title: 'Technical Code & Math Verification', description: 'Senior software engineers and mathematicians testing, executing, and annotating complex algorithmic outputs.' },
      { title: 'Nuanced Multilingual Cultural Alignment', description: 'Capturing regional idioms, cultural norms, and local regulatory considerations across 40+ languages.' }
    ],
    whyChooseUs: 'We don\'t use standard crowd-workers. We source domain experts—including software engineers, lawyers, and healthcare professionals—to provide the high-caliber intellectual feedback your frontier models require.',
    faqs: [
      { question: 'What is RLHF in LLM training?', answer: 'RLHF (Reinforcement Learning from Human Feedback) is a process where human specialists rank AI responses, teaching the model to output safer, more helpful, and culturally aligned answers.' },
      { question: 'Do you provide expert annotators for specialized LLMs?', answer: 'Yes, we source highly qualified professionals with advanced degrees to align models for specialized tasks like legal contract analysis, medical diagnosis, or code generation.' }
    ],
    visualizerType: 'PrecisionWaveTracker'
  }
];
