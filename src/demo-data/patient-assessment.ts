export const categories = [
    {
      id: '1',
      name: 'Neurological',
      icon: '/patient-assessment/image1.png',
      image: '/patient-assessment/image1.png',
      description: 'Description for Neurological',
      syndromes: {
        asessment: ['EEG', 'Consciousness'],
        normal: ['EEG brain impulses within expected range', 'Alert, oriented'],
        abnormal: ['Abnormal spikes or suppressed brain activity', 'Confused, lethargic']
      },
      note: 'EEG and consciousness assessments are critical for early detection of neurological abnormalities.'
    },
    {
      id: '2',
      name: 'Cardiovascular',
      icon: '/patient-assessment/image2.png',
      image: '/patient-assessment/patient-assessment.png',
      description: 'Description for Cardiovascular',
      syndromes: {
        asessment: ['EKG', 'Perfusion/Output'],
        normal: ['Regular sinus rhythm', '17.5% - adequate output range'],
        abnormal: ['Arrhythmia, irregular rhythm, ischemic changes', '45.8% - elevated risk or reduced efficiency']
      },
      note: 'Monitor EKG and perfusion closely for cardiac abnormalities and output changes.'
    },
    {
      id: '3',
      name: 'Respiratory',
      icon: '/patient-assessment/image3.png',
      image: '/patient-assessment/image3.png',
      description: 'Description for Respiratory',
      syndromes: {
        asessment: ['Breath Sounds', 'O2 Saturation'],
        normal: ['Clear, vesicular', '96-100%'],
        abnormal: ['Crackles, wheezes', '<92%']
      },
      note: 'Respiratory assessment includes breath sounds and oxygen saturation monitoring.'
    },
    {
      id: '4',
      name: 'Renal',
      icon: '/patient-assessment/image4.png',
      image: '/patient-assessment/image4.png',
      description: 'Description for Renal',
      syndromes: {
        asessment: ['Urine Output', 'Creatinine'],
        normal: ['>0.5ml/kg/hr', '0.6-1.2 mg/dL'],
        abnormal: ['<0.5ml/kg/hr', '>1.2 mg/dL']
      },
      note: 'Renal function is assessed by urine output and creatinine levels.'
    },
    {
      id: '5',
      name: 'Gastrointestinal',
      icon: '/patient-assessment/image5.png',
      image: '/patient-assessment/image5.png',
      description: 'Description for Gastrointestinal',
      syndromes: {
        asessment: ['Bowel Sounds', 'Abdominal Distension'],
        normal: ['Present, normal', 'None'],
        abnormal: ['Absent, hyperactive', 'Present']
      },
      note: 'GI assessment includes bowel sounds and abdominal distension.'
    },
  ]

export  interface Category {
    id: string;
    name: string;
    icon: string;
    image: string;
    description: string;
    syndromes: {
      asessment: string[],
      normal: string[],
      abnormal: string[]
    }
    note: string
  }