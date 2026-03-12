import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoConfig {
  title?: string;
  description?: string;
  robots?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteName = 'WHY? IA';

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  updateTags(config: SeoConfig, path: string): void {
    const title = config.title || this.siteName;
    const description =
      config.description ||
      'Desarrollo de software y soluciones de inteligencia artificial para empresas.';
    const robots = config.robots || 'index,follow';
    const canonicalUrl = this.buildCanonicalUrl(path);

    this.titleService.setTitle(title);

    this.updateMetaTag('name', 'description', description);
    this.updateMetaTag('name', 'robots', robots);

    this.updateMetaTag('property', 'og:title', title);
    this.updateMetaTag('property', 'og:description', description);
    this.updateMetaTag('property', 'og:type', 'website');
    this.updateMetaTag('property', 'og:site_name', this.siteName);
    this.updateMetaTag('property', 'og:locale', 'es_ES');
    this.updateMetaTag('property', 'og:url', canonicalUrl);

    this.updateMetaTag('name', 'twitter:card', 'summary_large_image');
    this.updateMetaTag('name', 'twitter:title', title);
    this.updateMetaTag('name', 'twitter:description', description);

    this.updateCanonical(canonicalUrl);
  }

  private buildCanonicalUrl(path: string): string {
    const url = new URL(path || '/', this.document.location.origin);

    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.slice(0, -1);
    }

    return url.toString();
  }

  private updateMetaTag(attribute: 'name' | 'property', key: string, content: string): void {
    this.metaService.updateTag({ [attribute]: key, content });
  }

  private updateCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
