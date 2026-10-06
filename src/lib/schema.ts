// JSON-LD tipado con schema-dts (docs/02-estrategia.md §6). Nunca AggregateRating ni Review propios.
import type { BreadcrumbList, GeneralContractor, Service, WebSite, WithContext } from 'schema-dts';
import { site } from '../data/site';

export function idNegocio(siteUrl: URL): string {
  return new URL('#negocio', siteUrl).href;
}

export function negocio(siteUrl: URL, logoUrl: string): WithContext<GeneralContractor> {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': idNegocio(siteUrl),
    name: site.nombre,
    description: `${site.descriptor} en Cartago, Costa Rica.`,
    url: siteUrl.href,
    logo: logoUrl,
    image: logoUrl,
    telephone: site.telefono,
    email: site.correo,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.direccion.calle,
      addressLocality: site.direccion.ciudad,
      addressRegion: site.direccion.provincia,
      addressCountry: site.direccion.pais,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...site.horario.dias],
      opens: site.horario.abre,
      closes: site.horario.cierra,
    },
    sameAs: [site.redes.facebook, site.redes.instagram, site.redes.maps],
  };
}

export function sitioWeb(siteUrl: URL): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.nombre,
    url: siteUrl.href,
    inLanguage: 'es-CR',
    publisher: { '@id': idNegocio(siteUrl) },
  };
}

export function migas(items: { nombre: string; url: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nombre,
      item: item.url,
    })),
  };
}

export function servicio(siteUrl: URL, nombre: string, descripcion: string, url: string): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: nombre,
    serviceType: nombre,
    description: descripcion,
    url,
    provider: { '@id': idNegocio(siteUrl) },
    areaServed: { '@type': 'City', name: 'Cartago' },
  };
}
