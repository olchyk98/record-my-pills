import alvedonImageURL from './images/pills/alvedon.png'
import fenoximetylpenicillinImageURL from './images/pills/fenoximetylpenicillin.png'
import ibuprofenImageURL from './images/pills/ibuprofen.png'

export type PillName =
  'Alvedon'
  | 'Fenoximetylpenicillin Orifarm'
  | 'Ibuprofen'

export interface PillSpecification {
  name: PillName
  iconURL: string
}

export const Pills = [
  {
    name: 'Alvedon',
    iconURL: alvedonImageURL,
  },
  {
    name: 'Fenoximetylpenicillin Orifarm',
    iconURL: fenoximetylpenicillinImageURL,
  },
  {
    name: 'Ibuprofen',
    iconURL: ibuprofenImageURL,
  },
] as const
