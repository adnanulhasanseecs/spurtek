/**
 * Strapi CMS client and API integration
 * This will be used to fetch content from Strapi CMS
 */

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntity {
  id: number;
  attributes: Record<string, unknown>;
}

/**
 * Fetch data from Strapi API
 */
async function fetchStrapi<T>(endpoint: string): Promise<T> {
  const url = `${STRAPI_API_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Transform Strapi entity to plain object
 */
function transformStrapiEntity<T>(entity: StrapiEntity): T {
  return {
    id: entity.id,
    ...entity.attributes,
  } as T;
}

/**
 * Product functions
 */
export async function getProducts() {
  const response = await fetchStrapi<StrapiResponse<StrapiEntity[]>>('/products?populate=*');
  return response.data.map(transformStrapiEntity);
}

export async function getProductBySlug(slug: string) {
  const response = await fetchStrapi<StrapiResponse<StrapiEntity[]>>(
    `/products?filters[slug][$eq]=${slug}&populate=*`
  );
  const product = response.data[0];
  return product ? transformStrapiEntity(product) : null;
}

/**
 * Case Study functions
 */
export async function getCaseStudies() {
  const response = await fetchStrapi<StrapiResponse<StrapiEntity[]>>('/case-studies?populate=*');
  return response.data.map(transformStrapiEntity);
}

export async function getCaseStudyBySlug(slug: string) {
  const response = await fetchStrapi<StrapiResponse<StrapiEntity[]>>(
    `/case-studies?filters[slug][$eq]=${slug}&populate=*`
  );
  const study = response.data[0];
  return study ? transformStrapiEntity(study) : null;
}

/**
 * Resource functions
 */
export async function getResources() {
  const response = await fetchStrapi<StrapiResponse<StrapiEntity[]>>('/resources?populate=*');
  return response.data.map(transformStrapiEntity);
}

export async function getResourceBySlug(slug: string) {
  const response = await fetchStrapi<StrapiResponse<StrapiEntity[]>>(
    `/resources?filters[slug][$eq]=${slug}&populate=*`
  );
  const resource = response.data[0];
  return resource ? transformStrapiEntity(resource) : null;
}

/**
 * Industry functions
 */
export async function getIndustries() {
  const response = await fetchStrapi<StrapiResponse<StrapiEntity[]>>('/industries?populate=*');
  return response.data.map(transformStrapiEntity);
}

export async function getIndustryBySlug(slug: string) {
  const response = await fetchStrapi<StrapiResponse<StrapiEntity[]>>(
    `/industries?filters[slug][$eq]=${slug}&populate=*`
  );
  const industry = response.data[0];
  return industry ? transformStrapiEntity(industry) : null;
}

