import { describe, it, expect } from 'vitest'
import { poseArticle } from '@/components/blog/article-pose'

describe('poseArticle', () => {
  it('avis et guides : lecture', () => {
    expect(poseArticle('guide-achat', 'test-bosch-indego-s-plus-500-avis')).toBe('lecture')
    expect(poseArticle('reglementation', 'horaires-tonte-robot')).toBe('lecture')
  })
  it('classements : podium', () => {
    expect(poseArticle('guide-achat', 'meilleur-robot-tondeuse-2026')).toBe('podium')
    expect(poseArticle('comparatif', 'comparatif-robots-tondeuses-sans-fil')).toBe('podium')
  })
  it('X vs Y : boxe', () => {
    expect(poseArticle('comparatif', 'dreame-a1-pro-vs-mammotion-luba-3-awd-comparatif')).toBe('boxe')
  })
  it('entretien et dépannage : outils ; gazon : jardinier', () => {
    expect(poseArticle('depannage', 'comment-hiverner-son-robot-tondeuse')).toBe('outils')
    expect(poseArticle('gazon', 'quand-scarifier-sa-pelouse')).toBe('jardinier')
  })
})
