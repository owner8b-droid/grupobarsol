// JSON-LD tipado con schema-dts (docs/02-estrategia.md §6). Nunca AggregateRating ni Review propios.
import type { BreadcrumbList, CollectionPage, GeneralContractor, Product, Service, WebSite, WithContext } from 'schema-dts';
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

// Flota (docs/02-estrategia.md §6): Product con los datos técnicos en additionalProperty y sin Offer (no hay
// precios). Los datos que todavía son marcadores («[Por confirmar]») no salen en el JSON-LD.
const confirmado = (valor: string) => !valor.trim().startsWith('[');

export function producto(p: {
  nombre: string;
  url: string;
  imagen?: string;
  marca?: string;
  modelo?: string;
  specs: { label: string; valor: string }[];
}): WithContext<Product> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nombre,
    url: p.url,
    ...(p.imagen ? { image: p.imagen } : {}),
    ...(p.marca ? { brand: { '@type': 'Brand', name: p.marca } } : {}),
    ...(p.modelo ? { model: p.modelo } : {}),
    additionalProperty: p.specs.filter((s) => confirmado(s.valor)).map((s) => ({ '@type': 'PropertyValue', name: s.label, value: s.valor })),
  };
}

export function listaDeUnidades(nombre: string, url: string, unidades: { nombre: string; url: string }[]): WithContext<CollectionPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: nombre,
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: unidades.map((u, i) => ({ '@type': 'ListItem', position: i + 1, name: u.nombre, url: u.url })),
    },
  };
}
