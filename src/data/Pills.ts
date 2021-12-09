export type PillName =
  'Alvedon'
  | 'Fenoximetylpenicillin Orifarm'
  | 'Ibuprofen'

export interface PillSpecification {
  name: PillName
  iconURL: string
  maxAmountPerDay: number
}

export const Pills = [
  {
    name: 'Alvedon',
    maxAmountPerDay: 8,
    iconURL: 'https://www.drugsand.me/_next/image?url=https%3A%2F%2Fdnm-storage.s3.amazonaws.com%2Flsd_b573d2ae3d.png&w=3840&q=75',
  },
  {
    name: 'Fenoximetylpenicillin Orifarm',
    maxAmountPerDay: 6,
    iconURL: 'https://www.drugsand.me/_next/image?url=https%3A%2F%2Fdnm-storage.s3.amazonaws.com%2Falcohol_23b0427d0a.png&w=3840&q=75',
  },
  {
    name: 'Ibuprofen',
    maxAmountPerDay: 3,
    iconURL: 'https://www.drugsand.me/_next/image?url=https%3A%2F%2Fdnm-storage.s3.amazonaws.com%2Fmdma_3f5e5015d1.png&w=3840&q=75',
  },
] as const
